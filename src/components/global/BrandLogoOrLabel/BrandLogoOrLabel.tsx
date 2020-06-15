import Image from '~/components/global/Image/Image';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { typography } from '~/styles/typography.styles';

import { styles } from './BrandLogoOrLabel.styles';

interface Props {
  brand: SiteCatalogBrand;
}

function BrandLogoOrLabel(props: Props) {
  const { brand } = props;

  return (
    <>
      {brand.image ? (
        <Image {...brand.image} as={'span'} />
      ) : (
        <span css={[styles.label, typography.secondaryHeadline]}>
          {brand.label}
        </span>
      )}
    </>
  );
}

export default BrandLogoOrLabel;
