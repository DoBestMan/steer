export interface SiteCatalogSummaryTopPickItemAdditionalInfo {
  content: string;
  table: {
    items: Array<{ label: string; value: string }>;
    title: string;
  };
  title: string;
}
