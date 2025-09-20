export type SearchResult = {
  title: string;
  url: string;
  keywords?: string[];
  type?: string;
  excerpt?: string;
  category?: string;
};

export type SearchResponse = {
  results: SearchResult[];
};
