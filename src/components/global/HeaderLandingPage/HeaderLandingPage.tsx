import { ReactType, useCallback, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { SiteImage } from '~/data/models/SiteImage';
import { HEADER_SIZE, MARKDOWN_PRIMITIVES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { sizeStyles, themeStyles } from './HeaderLandingPage.styles';

export interface HeaderLandingPageProps {
  body?: string | null;
  collapseBodyCTALabel?: string;
  expandBodyCTALabel?: string;
  image?: SiteImage;
  subTitle?: string;
  subTitleAs?: ReactType;
  theme?: THEME;
  title: string;
  titleAs?: ReactType;
  titleSize?: HEADER_SIZE;
}

export default function HeaderLandingPage({
  body,
  collapseBodyCTALabel = ui('common.headerLandingPage.collapseBodyCTALabel'),
  expandBodyCTALabel = ui('common.headerLandingPage.expandBodyCTALabel'),
  image,
  subTitle,
  subTitleAs = 'div',
  title,
  titleAs = 'h1',
  titleSize = HEADER_SIZE.JUMBO,
  theme = THEME.LIGHT,
}: HeaderLandingPageProps) {
  const TitleContainer = titleAs;
  const SubTitleContainer = subTitleAs;
  const [showFullBody, setShowFullBody] = useState(false);

  const toggleFullBody = useCallback(() => {
    setShowFullBody(!showFullBody);
  }, [showFullBody, setShowFullBody]);

  const splitBody = body && body.split(/\n\n/g);
  const briefBody = splitBody && splitBody[0];
  const moreBody =
    splitBody && splitBody.length > 1 && splitBody.slice(1).join('\n\n');
  const showMoreButton = briefBody && splitBody && splitBody.length > 1;
  return (
    <header css={[styles.container, themeStyles[theme].container]}>
      {image && (
        <div css={styles.imageContainer}>
          <Image {...image} widths={[400, 600, 800, 1200, 1600]} responsive />
        </div>
      )}
      <TitleContainer
        css={[sizeStyles[titleSize].title, themeStyles[theme].title]}
      >
        {title}
      </TitleContainer>

      {subTitle && (
        <SubTitleContainer css={[styles.subTitle, themeStyles[theme].subTitle]}>
          <Markdown allowedTypes={MARKDOWN_PRIMITIVES} unwrapDisallowed>
            {subTitle}
          </Markdown>
        </SubTitleContainer>
      )}
      {briefBody && (
        <div css={styles.Body}>
          <Markdown allowedTypes={MARKDOWN_PRIMITIVES} unwrapDisallowed>
            {briefBody}
          </Markdown>
        </div>
      )}
      {moreBody && (
        <div
          css={styles.moreBody}
          aria-hidden={!showFullBody}
          id="header-detail-page-body"
        >
          <Markdown allowedTypes={MARKDOWN_PRIMITIVES} unwrapDisallowed>
            {moreBody}
          </Markdown>
        </div>
      )}
      {showMoreButton && (
        <button
          aria-expanded={showFullBody}
          aria-labelledby="header-detail-page-body"
          aria-controls="header-detail-page-body"
          onClick={toggleFullBody}
          css={[styles.showFullBody, themeStyles[theme].buttonHover]}
        >
          {showFullBody ? collapseBodyCTALabel : expandBodyCTALabel}
          <Icon
            name={showFullBody ? ICONS.CHEVRON_UP : ICONS.CHEVRON_DOWN}
            css={styles.showFullBodyIcon}
          />
        </button>
      )}
    </header>
  );
}
