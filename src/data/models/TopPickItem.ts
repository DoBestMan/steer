interface TableItem {
  label: string;
  value: string;
}

interface AdditionalInfo {
  content: string;
  table: {
    items: TableItem[];
    title: string;
  };
  title: string;
}

export interface TopPickItem {
  ctaLabel: string;
  header: {
    pill: null;
    subtitle: string;
    titleLine1: string;
    titleLine2: string;
  };
  product: {
    name: string;
    type: string;
  };
  siteCatalogSummaryTopPickItemAdditionalInfo: AdditionalInfo;
}
