import { TopPickItemsHeader } from '../TopPicksItems.types';

interface Props {
  header?: TopPickItemsHeader;
  viewMoreDataTitle?: string | null;
}

export default function TPITitleLine1({ viewMoreDataTitle, header }: Props) {
  if (viewMoreDataTitle) {
    return <>{viewMoreDataTitle}</>;
  }

  if (header) {
    return <>{`${header.titleLine1}${header.titleLine2 ? ': ' : ''}`}</>;
  }

  return null;
}
