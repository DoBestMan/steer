import { ReactType, useCallback, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { HEADER_SIZE, THEME } from '~/lib/constants';
import { MARKDOWN_PRIMITIVES } from '~/lib/constants/markdown';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { sizeStyles, themeStyles } from './HeaderDetailPage.styles';

export interface HeaderDetailPageProps {
  description?: string | null;
  header: string;
  headerAs?: ReactType;
  hideFullDescriptionLinkLabel?: string;
  showFullDescriptionLinkLabel?: string;
  size?: HEADER_SIZE;
  subHeader?: string;
  subHeaderAs?: ReactType;
  theme?: THEME;
}

export default function HeaderDetailPage({
  headerAs = 'h1',
  header,
  subHeader,
  description,
  showFullDescriptionLinkLabel = ui(
    'common.headerDetailPage.showFullDescriptionLinkLabel',
  ),
  hideFullDescriptionLinkLabel = ui(
    'common.headerDetailPage.hideFullDescriptionLinkLabel',
  ),
  subHeaderAs = 'div',
  size = HEADER_SIZE.JUMBO,
  theme = THEME.LIGHT,
}: HeaderDetailPageProps) {
  const HeaderContainer = headerAs;
  const SubHeaderContainer = subHeaderAs;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleFullDescription = useCallback(() => {
    setShowFullDescription(!showFullDescription);
  }, [showFullDescription, setShowFullDescription]);

  const splitDescription = description && description.split(/\n\n/g);
  const briefDescription = splitDescription && splitDescription[0];
  const moreDescription =
    splitDescription &&
    splitDescription.length > 1 &&
    splitDescription.slice(1).join('\n\n');
  const showMoreButton =
    briefDescription && splitDescription && splitDescription.length > 1;
  return (
    <header css={[styles.container, themeStyles[theme].container]}>
      <HeaderContainer
        css={[sizeStyles[size].header, themeStyles[theme].header]}
      >
        {header}
      </HeaderContainer>

      {subHeader && (
        <SubHeaderContainer
          css={[styles.subHeader, themeStyles[theme].subHeader]}
        >
          <Markdown allowedTypes={MARKDOWN_PRIMITIVES} unwrapDisallowed>
            {subHeader}
          </Markdown>
        </SubHeaderContainer>
      )}
      {briefDescription && (
        <div css={styles.description}>
          <Markdown allowedTypes={MARKDOWN_PRIMITIVES} unwrapDisallowed>
            {briefDescription}
          </Markdown>
        </div>
      )}
      {moreDescription && (
        <div
          css={styles.moreDescription}
          aria-hidden={!showFullDescription}
          id="header-detail-more-description"
        >
          <Markdown allowedTypes={MARKDOWN_PRIMITIVES} unwrapDisallowed>
            {moreDescription}
          </Markdown>
        </div>
      )}
      {showMoreButton && (
        <button
          aria-expanded={showFullDescription}
          aria-labelledby="header-detail-more-description"
          aria-controls="header-detail-more-description"
          onClick={toggleFullDescription}
          css={[styles.showFullDescription, themeStyles[theme].buttonHover]}
        >
          {showFullDescription
            ? hideFullDescriptionLinkLabel
            : showFullDescriptionLinkLabel}
          <Icon
            name={showFullDescription ? ICONS.CHEVRON_UP : ICONS.CHEVRON_DOWN}
            css={styles.showFullDescriptionIcon}
          />
        </button>
      )}
    </header>
  );
}
