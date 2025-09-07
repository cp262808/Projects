"use client";
import { useEffect, useState } from "react";

type Item = { title: string; url: string; keywords?: string[]; };
type ResponseT = { results: Item[] };

export default function SearchPage(){
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const handle = setTimeout(async ()=>{
      if (!q) { setResults([]); return; }
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: ResponseT = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }, 250);
    return ()=>clearTimeout(handle);
  }, [q]);

  return (
    <main id="main" className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Type to search topics, guides, and controls..." className="w-full max-w-2xl px-4 py-3 border rounded-md" />
      <div className="mt-6 space-y-3">
        {loading && <div className="text-gray-500">Searching…</div>}
        {!loading && results.length === 0 && q && <div className="text-gray-500">No results for “{q}”.</div>}
        {results.map((r)=> (
          <a key={r.url} href={r.url} className="block p-4 border rounded-lg hover:shadow-sm">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-gray-600">{r.url}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
