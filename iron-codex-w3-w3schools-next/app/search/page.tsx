'use client';
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Mock search results - in a real app, this would come from your search API
const mockResults = [
  {
    title: "API Security Deep Dive",
    type: "Guide",
    url: "/guides/api-security",
    excerpt: "Comprehensive guide to securing APIs including authentication, authorization, rate limiting, and protection against OWASP API Top 10 vulnerabilities.",
    category: "Application Security"
  },
  {
    title: "Container Security",
    type: "Topic", 
    url: "/topics/containers",
    excerpt: "Docker, Kubernetes security, image scanning, runtime protection, and container hardening controls.",
    category: "Infrastructure"
  },
  {
    title: "Burp Suite",
    type: "Tool",
    url: "/tools/burp-suite", 
    excerpt: "Web vulnerability scanner and proxy tool for application security testing.",
    category: "Web Application Security"
  },
  {
    title: "Identity & Access Management",
    type: "Topic",
    url: "/topics/identity-access",
    excerpt: "Authentication, authorization, SSO, privileged access management, and identity governance.",
    category: "Fundamentals"
  },
  {
    title: "Zero Trust Architecture",
    type: "Guide",
    url: "/guides/zero-trust",
    excerpt: "Implementation guide for Zero Trust security model including network microsegmentation and identity verification.",
    category: "Architecture"
  },
  {
    title: "Trivy",
    type: "Tool", 
    url: "/tools/trivy",
    excerpt: "Vulnerability scanner for containers and filesystems with support for multiple languages and frameworks.",
    category: "Container Security"
  }
];

const typeColors = {
  "Topic": "bg-blue-900 text-blue-200",
  "Guide": "bg-green-900 text-green-200", 
  "Tool": "bg-purple-900 text-purple-200"
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Filter results based on query (simple mock implementation)
  const results = query 
    ? mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Search Results
            </h1>
            {query && (
              <p className="mt-3 text-slate-300 text-lg">
                Showing results for "{query}"
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
        {!query ? (
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
              We couldn't find anything matching "{query}". Try adjusting your search terms.
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
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </h2>
              <div className="text-sm text-slate-400">
                Showing results for "{query}"
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={result.url}
                  className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                          {result.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded ${typeColors[result.type as keyof typeof typeColors]}`}>
                          {result.type}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 mb-3 leading-relaxed">
                        {result.excerpt}
                      </p>
                      
                      <div className="text-sm text-slate-400">
                        {result.category}
                      </div>
                    </div>
                    
                    <div className="text-emerald-400 group-hover:translate-x-2 transition-transform">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}