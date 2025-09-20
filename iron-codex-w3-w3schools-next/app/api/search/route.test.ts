import { describe, expect, it } from 'vitest';
import { GET } from './route';
import type { SearchResponse } from '@/types/search';

describe('GET /api/search', () => {
  it('returns results matching keyword', async () => {
    const request = new Request('http://localhost/api/search?q=jwt');
    const response = await GET(request);
    const data = (await response.json()) as SearchResponse;

    expect(data.results.length).toBeGreaterThan(0);
    const match = data.results.find((result) => result.url === '/topics/api-security');
    expect(match).toBeDefined();
  });
});
