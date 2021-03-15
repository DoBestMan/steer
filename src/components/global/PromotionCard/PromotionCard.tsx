import { ReactType, useCallback, useState } from 'react';
import { NodeType } from 'react-markdown';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Image from '~/components/global/Image/Image';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import Markdown from '../Markdown/MarkdownDynamic';
import styles from './PromotionCard.styles';
import {
  PromotionLinksProps,
  SiteCTAOpenCatalog,
  SiteCTAReferFriend,
  SiteLinkWithLabel,
} from './PromotionLinks';

export interface PromotionCardProps {
  body: string;
  eyebrow: string | null;
  eyebrowIcon: SiteIcon | null;
  figures?: Array<
    | SiteIcon
    | SiteImage
    | {
        type: 'string';
        value: string;
      }
  > | null;
  handlePromotionClick?: (
    params: Record<string, string>,
    label: string,
  ) => void;
  handleReferAFriendClick?: () => void;
  links: Array<PromotionLinksProps>;
  moreBody?: string | null;
  promoImage?: SiteImage | null;

  title: string;
}
// Allow only the simplest markdown to prevent unexpected markups
const markdownAllowedTypes: NodeType[] = [
  'root',
  'text',
  'break',
  'paragraph',
  'strong',
  'emphasis',
  'link',
];

function PromotionCard({
  body,
  eyebrow,
  eyebrowIcon,
  figures,
  links,
  moreBody,
  promoImage,
  title,
  handleReferAFriendClick,
  handlePromotionClick,
}: PromotionCardProps) {
  const decorators = figures?.map((figure, idx) => {
    if (
      figure?.type === ICON_IMAGE_TYPE.ICON ||
      figure?.type === ICON_IMAGE_TYPE.IMAGE
    ) {
      return (
        <IconOrImage key={idx} widths={[200, 300, 500, 800]} {...figure} />
      );
    }

    if (figure && 'value' in figure) {
      return figure.value;
    }

    return;
  });

  const [showMoreBody, setShowMoreBody] = useState(false);
  const expandBodyCTALabel = ui('common.headerLandingPage.expandBodyCTALabel');
  const collapseBodyCTALabel = ui(
    'common.headerLandingPage.collapseBodyCTALabel',
  );
  const toggleFullBody = useCallback(() => {
    setShowMoreBody(!showMoreBody);
  }, [showMoreBody, setShowMoreBody]);
  const ComponentMap: Record<string, ReactType> = {
    SiteCTAOpenCatalog,
    SiteLinkWithLabel,
    SiteCTAReferFriend,
  };
  const dealsLinks = links?.map((link: PromotionLinksProps, idx) => {
    const Component = link.type ? ComponentMap[link.type] : null;
    if (!Component) {
      return null;
    }

    return (
      <Component
        {...link}
        eyebrow={eyebrow}
        handlePromotionClick={handlePromotionClick}
        key={idx}
        handleReferAFriendClick={handleReferAFriendClick}
      />
    );
  });
  const shouldAddFullHeight =
    showMoreBody && moreBody && moreBody.length >= 180;
  const heightAuto = shouldAddFullHeight ? { height: '100%' } : {};

  return (
    <div data-component="promotion-card">
      {promoImage && (
        <div css={styles.promoImage} data-component="promotion-card-image">
          <Image {...promoImage} widths={[400, 600, 800]} responsive />
        </div>
      )}
      <div
        css={[
          typography.jumboHeadline,
          styles.root,
          promoImage && styles.removeTopRadius,
        ]}
        style={heightAuto}
        data-component="promotion-card-body"
      >
        {figures && (
          <div css={[typography.jumboHeadline, styles.decorator]}>
            {decorators}
          </div>
        )}
        {eyebrow && eyebrowIcon && (
          <div css={[typography.secondaryHeadline, styles.eyebrow]}>
            <span>{eyebrow}</span>
            <Icon name={eyebrowIcon.svgId} css={styles.eyebrowIcon} />
          </div>
        )}
        <h3 css={[typography.secondaryHeadline, styles.title]}>{title}</h3>
        {body && (
          <div css={styles.description}>
            <div css={[typography.bodyCopy]}>
              <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
                {body}
              </Markdown>
            </div>
            {moreBody && (
              <div
                css={[typography.bodyCopy, styles.moreBody]}
                aria-hidden={!showMoreBody}
                id="promotion-card-body"
              >
                <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
                  {moreBody}
                </Markdown>
              </div>
            )}
            {moreBody && (
              <button
                aria-expanded={showMoreBody}
                aria-labelledby="promotion-card-body"
                aria-controls="promotion-card-body"
                onClick={toggleFullBody}
                css={[styles.showFullBody, styles.buttonHover]}
              >
                {showMoreBody ? collapseBodyCTALabel : expandBodyCTALabel}
                <Icon
                  name={showMoreBody ? ICONS.CHEVRON_UP : ICONS.CHEVRON_DOWN}
                  css={styles.showFullBodyIcon}
                />
              </button>
            )}
          </div>
        )}
        <div>{dealsLinks}</div>
      </div>
    </div>
  );
}

export default PromotionCard;
