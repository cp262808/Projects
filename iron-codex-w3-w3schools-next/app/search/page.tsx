'use client';
import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import type { SearchResponse, SearchResult } from "@/types/search";

const typeColors = {
  "Topic": "bg-blue-900 text-blue-200",
  "Guide": "bg-green-900 text-green-200",
  "Tool": "bg-purple-900 text-purple-200"
};

const fetchSearchResults = async (url: string): Promise<SearchResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load search results");
  }

  return response.json();
};

type ResultMetaProps = {
  result: SearchResult;
};

function ResultMeta({ result }: ResultMetaProps) {
  if (result.category) {
    return (
      <div className="text-sm text-slate-400">
        {result.category}
      </div>
    );
  }

  if (result.keywords && result.keywords.length > 0) {
    return (
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-emerald-300">
        {result.keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-emerald-500/10 px-2 py-1"
          >
            {keyword}
          </span>
        ))}
      </div>
    );
  }

  return null;
}

type ResultsListProps = {
  query: string;
  results: SearchResult[];
};

function ResultsList({ query, results }: ResultsListProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </h2>
        <div className="text-sm text-slate-400">
          Showing results for <span>&ldquo;{query}&rdquo;</span>
        </div>
      </div>

      <div className="space-y-6">
        {results.map((result) => (
          <Link
            key={`${result.url}-${result.title}`}
            href={result.url}
            className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                    {result.title}
                  </h3>
                  {result.type && typeColors[result.type as keyof typeof typeColors] && (
                    <span className={`px-2 py-1 text-xs rounded ${typeColors[result.type as keyof typeof typeColors]}`}>
                      {result.type}
                    </span>
                  )}
                </div>

                {result.excerpt ? (
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    {result.excerpt}
                  </p>
                ) : null}

                <ResultMeta result={result} />
              </div>

              <div className="text-emerald-400 group-hover:translate-x-2 transition-transform">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

type SearchStatusProps = {
  title: string;
  message: string;
};

function SearchStatus({ title, message }: SearchStatusProps) {
  return (
    <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-slate-300 text-lg">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}

function SearchFallback() {
  return (
    <>
      <SearchStatus title="Search" message="Loading search results..." />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <div className="h-6 w-2/5 rounded bg-slate-800" />
              <div className="mt-4 h-4 w-full rounded bg-slate-800" />
              <div className="mt-2 h-4 w-4/5 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

type SearchErrorProps = {
  error: Error;
  onRetry: () => void;
};

function SearchError({ error, onRetry }: SearchErrorProps) {
  return (
    <>
      <SearchStatus
        title="Search"
        message="We couldn&rsquo;t load search results. Please try again."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-6 py-5 text-sm text-red-200">
          <p className="font-semibold">Error loading search</p>
          <p className="mt-2 text-red-200/80">{error.message}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-red-900/70 bg-red-900/40 px-4 py-2 text-sm font-medium text-red-100 transition hover:border-red-800 hover:bg-red-900/60"
          >
            Try again
          </button>
        </div>
      </section>
    </>
  );
}

type SearchErrorBoundaryState = {
  error: Error | null;
};

class SearchErrorBoundary extends React.Component<React.PropsWithChildren, SearchErrorBoundaryState> {
  state: SearchErrorBoundaryState = { error: null };

  private handleRetry = () => {
    this.setState({ error: null });
  };

  static getDerivedStateFromError(error: Error): SearchErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <SearchError error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const shouldFetch = query.length > 0;

  const { data, error } = useSWR<SearchResponse>(
    shouldFetch ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetchSearchResults,
    {
      suspense: true,
      revalidateOnFocus: false,
    }
  );

  if (error) {
    throw error;
  }

  const results = shouldFetch ? (data?.results ?? []) : [];

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Search Results
            </h1>
            {query && (
              <p className="mt-3 text-slate-300 text-lg">
                Showing results for <span>&ldquo;{query}&rdquo;</span>
              </p>
            )}
            
            {/* Search Form */}
            <form action="/search" method="GET" role="search" className="mt-6 flex w-full max-w-xl gap-2">
              <input
                name="q"
                type="search"
                defaultValue={query}
                aria-label="Search Iron Codex"
                placeholder="Search topics, guides, tools..."
                className="h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
              <button className="h-11 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {!shouldFetch ? (
          // No query state
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Search Iron Codex</h2>
            <p className="text-slate-400 mb-8">
              Find topics, guides, and tools across our cybersecurity knowledge base.
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-medium mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["API Security", "Container Security", "Zero Trust", "Identity Management", "Cloud Security", "Vulnerability Scanning"].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-emerald-400 transition text-sm"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          // No results state
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No results found</h2>
            <p className="text-slate-400 mb-8">
              We couldn&rsquo;t find anything matching <span>&ldquo;{query}&rdquo;</span>. Try adjusting your search terms.
            </p>

            {/* Search suggestions */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-medium mb-4">Try searching for:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Security fundamentals", "Application security", "Network security", "Cloud security"].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-emerald-400 transition text-sm"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Results state
          <ResultsList query={query} results={results} />
        )}
      </section>
    </>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryKey = (searchParams.get('q') || '').trim();

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      <SearchErrorBoundary key={queryKey}>
        <Suspense fallback={<SearchFallback />}>
          <SearchContent />
        </Suspense>
      </SearchErrorBoundary>

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}