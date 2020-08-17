import Image from '~/components/global/Image/Image';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteImageExtended } from '~/data/models/SiteImageExtended';
import { CSSStylesProp } from '~/lib/constants';

import { styles } from './BrandLogoOrLabel.styles';

// Provide extra props for <Image>
interface Props extends SiteImageExtended {
  brand: SiteCatalogBrand;
  customLabelStyles?: CSSStylesProp;
  isCentered?: boolean;
}

function BrandLogoOrLabel(props: Props) {
  const {
    brand,
    customContainerStyles,
    customLabelStyles,
    isCentered = false,
    widths,
    ...rest
  } = props;

  return (
    <>
      {brand.image ? (
        <Image
          {...brand.image}
          as={'span'}
          widths={widths}
          aria-label={brand.label}
          css={isCentered && styles.centered}
          customContainerStyles={customContainerStyles || styles.brandImage}
          {...rest}
        />
      ) : (
        <span css={customLabelStyles || styles.label}>{brand.label}</span>
      )}
    </>
  );
}

export default BrandLogoOrLabel;
