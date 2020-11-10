import PromoTag from '~/components/global/PromoTag/PromoTag';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { typography } from '~/styles/typography.styles';

import { styles } from '../TopPicks.styles';
import Subtitle from './TPISubtitle/TPISubtitle';
import TitleLine1 from './TPITitleLine1/TPITitleLine1';
import TitleLine2 from './TPITitleLine2/TPITitleLine2';

interface Props {
  currentIndex: number;
  isCurrent: boolean;
  openModal?: () => void;
  pick?: SiteCatalogSummaryTopPickItem | null;
  viewMoreData?: SiteCatalogSummaryTopPicksMore | null;
}

function Title({
  currentIndex,
  pick = null,
  viewMoreData = null,
  isCurrent = false,
  openModal = () => {},
}: Props) {
  const currentHeader = pick ? pick.header : null;
  const currentOeModal = pick
    ? pick.siteCatalogSummaryTopPickItemAdditionalInfo
    : null;

  const hasSubtitle = viewMoreData || currentHeader?.subtitle;
  const showMoreData = viewMoreData !== null;
  const show = isCurrent;

  const idForAriaLabbeledBy = `toppick-title-${currentIndex}`;

  return (
    <span
      css={[styles.titleContainerInner, show && styles.titleContainerInnerShow]}
      aria-hidden={!show}
    >
      <span
        css={[styles.title, show && styles.titleShow]}
        id={idForAriaLabbeledBy}
      >
        <span css={styles.titleLine1}>
          <TitleLine1
            viewMoreDataTitle={
              showMoreData && viewMoreData ? viewMoreData.header.title : null
            }
            header={currentHeader}
          />
        </span>
        {currentHeader?.titleLine2 && (
          <span css={styles.titleBottom}>
            <TitleLine2
              oeModal={currentOeModal}
              header={currentHeader}
              openModal={openModal}
            />
          </span>
        )}
      </span>

      {/* Description (optional) */}
      {hasSubtitle && (
        <span
          css={[
            styles.description,
            typography.topPicksSubcopy,
            show && styles.descriptionShow,
          ]}
        >
          <Subtitle
            viewMoreDataHeader={
              showMoreData && viewMoreData ? viewMoreData.header.subtitle : null
            }
            basicHeader={currentHeader?.subtitle}
          />
        </span>
      )}

      {/* Pill (optional) */}
      {currentHeader?.pill && (
        <span css={[styles.description, show && styles.descriptionShow]}>
          <PromoTag
            label={currentHeader.pill}
            style={SitePromotionStyleEnum.SitePromotionItemOrangePill}
            isUppercase
          />
        </span>
      )}
    </span>
  );
}

export default Title;
