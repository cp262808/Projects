import data from '@/content/search.json';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  if (!q) return Response.json({ results: [] });

  function match(item: any){
    const inTitle = item.title?.toLowerCase().includes(q);
    const inKeywords = Array.isArray(item.keywords) && item.keywords.some((k: string)=>k.toLowerCase().includes(q));
    return inTitle || inKeywords;
  }

  const results = (data as any[]).filter(match).slice(0, 20);
  return Response.json({ results });
}
