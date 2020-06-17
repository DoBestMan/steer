import Image from '~/components/global/Image/Image';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteImageExtended } from '~/data/models/SiteImageExtended';
import { typography } from '~/styles/typography.styles';

// Provide extra props for <Image>
interface Props extends SiteImageExtended {
  brand: SiteCatalogBrand;
}

function BrandLogoOrLabel(props: Props) {
  const { brand, widths } = props;

  return (
    <>
      {brand.image ? (
        <Image {...brand.image} as={'span'} widths={widths} />
      ) : (
        <span css={typography.secondaryHeadline}>{brand.label}</span>
      )}
    </>
  );
}

export default BrandLogoOrLabel;
