import data from '@/content/search.json';
import type { SearchResponse, SearchResult } from '@/types/search';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  if (!q) return Response.json({ results: [] });

  function match(item: SearchResult){
    const inTitle = item.title?.toLowerCase().includes(q);
    const inKeywords = Array.isArray(item.keywords) && item.keywords.some((k: string)=>k.toLowerCase().includes(q));
    return inTitle || inKeywords;
  }

  const results = (data as SearchResult[]).filter(match).slice(0, 20);
  const response: SearchResponse = { results };
  return Response.json(response);
}
