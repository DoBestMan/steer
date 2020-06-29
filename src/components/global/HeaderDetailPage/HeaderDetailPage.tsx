import { ReactType, useCallback, useState } from 'react';
import { NodeType } from 'react-markdown';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { HEADER_COLOR, HEADER_SIZE } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { sizeStyles } from './HeaderDetailPage.styles';

export interface HeaderDetailPageProps {
  description?: string;
  header: string;
  headerAs?: ReactType;
  headerColor?: HEADER_COLOR;
  hideFullDescriptionLinkLabel?: string;
  showFullDescriptionLinkLabel?: string;
  size?: HEADER_SIZE;
  subHeader?: string;
  subHeaderAs?: ReactType;
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

export default function HeaderDetailPage({
  headerAs = 'h1',
  header,
  headerColor = HEADER_COLOR.BLACK,
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
    <header>
      <HeaderContainer css={[sizeStyles[size].header, { color: headerColor }]}>
        {header}
      </HeaderContainer>

      {subHeader && (
        <SubHeaderContainer css={styles.subHeader}>
          <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
            {subHeader}
          </Markdown>
        </SubHeaderContainer>
      )}
      {briefDescription && (
        <div css={styles.description}>
          <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
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
          <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
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
          css={styles.showFullDescription}
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
