interface Props {
  basicHeader?: string | null;
  viewMoreDataHeader?: string | null;
}

export default function TPISubtitle({
  viewMoreDataHeader,
  basicHeader,
}: Props) {
  if (viewMoreDataHeader) {
    return <>{viewMoreDataHeader}</>;
  }

  if (basicHeader) {
    return <>{basicHeader}</>;
  }

  return null;
}
