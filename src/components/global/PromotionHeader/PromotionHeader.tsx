import Icon from '~/components/global/Icon/Icon';
import { Icon as IconName } from '~/components/global/Icon/Icon.types';
import PromoTag from '~/components/global/PromoTag/PromoTag';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { typography } from '~/styles/typography.styles';

import styles from './PromotionHeader.styles';

export interface PromotionHeaderProps {
  iconName?: IconName;
  promoTagColor?: SitePromotionStyleEnum;
  promoTagLabel: string;
  subTitle?: string;
  title: string;
}

function PromotionHeader({
  iconName,
  promoTagColor,
  promoTagLabel,
  subTitle,
  title,
}: PromotionHeaderProps) {
  const promoColorMap: Record<string, SitePromotionStyleEnum> = {
    [SitePromotionStyleEnum.SitePromotionItemDefault]:
      SitePromotionStyleEnum.SitePromotionItemDefault,
    [SitePromotionStyleEnum.SitePromotionItemBlackPill]:
      SitePromotionStyleEnum.SitePromotionItemBlackPill,
    [SitePromotionStyleEnum.SitePromotionItemOrangePill]:
      SitePromotionStyleEnum.SitePromotionItemOrangePill,
  };
  const promoTagStyle = promoTagColor
    ? promoColorMap[promoTagColor]
    : promoColorMap[SitePromotionStyleEnum.SitePromotionItemBlackPill];

  return (
    <div css={styles.root}>
      <div css={styles.promoTagSection}>
        <PromoTag style={promoTagStyle} isUppercase label={promoTagLabel} />
      </div>
      <div css={styles.titleContainer}>
        <p css={[typography.primaryHeadline, styles.spacingRight10]}>{title}</p>
        {iconName && <Icon css={styles.iconStyles} name={iconName} />}
      </div>
      <p css={styles.subTitle}>{subTitle}</p>
    </div>
  );
}

export default PromotionHeader;
