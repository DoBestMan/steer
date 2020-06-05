export interface ListResultMetadata {
  noExactMatch?: boolean;
  pagination?: {
    offset?: number;
    resultsPerPage?: number;
    total: number;
  };
}
