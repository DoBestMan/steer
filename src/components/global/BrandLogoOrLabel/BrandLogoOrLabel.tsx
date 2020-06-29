import Image from '~/components/global/Image/Image';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteImageExtended } from '~/data/models/SiteImageExtended';
import { typography } from '~/styles/typography.styles';

// Provide extra props for <Image>
interface Props extends SiteImageExtended {
  brand: SiteCatalogBrand;
}

function BrandLogoOrLabel(props: Props) {
  const { brand, widths, ...rest } = props;

  return (
    <>
      {brand.image ? (
        <Image
          {...brand.image}
          as={'span'}
          widths={widths}
          aria-label={brand.label}
          {...rest}
        />
      ) : (
        <span css={typography.secondaryHeadline}>{brand.label}</span>
      )}
    </>
  );
}

export default BrandLogoOrLabel;
