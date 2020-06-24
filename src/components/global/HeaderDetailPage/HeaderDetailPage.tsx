import { ReactType, useCallback, useState } from 'react';
import { NodeType } from 'react-markdown';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './HeaderDetailPage.styles';

export type HeaderColor = 'black' | 'white';

interface Props {
  description?: string;
  header: string;
  headerAs?: ReactType;
  headerColor?: HeaderColor;
  hideFullDescriptionLinkLabel?: string;
  showFullDescriptionLinkLabel?: string;
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
  headerColor = 'black',
  subHeader,
  description,
  showFullDescriptionLinkLabel = ui(
    'common.headerDetailPage.showFullDescriptionLinkLabel',
  ),
  hideFullDescriptionLinkLabel = ui(
    'common.headerDetailPage.hideFullDescriptionLinkLabel',
  ),
  subHeaderAs = 'div',
}: Props) {
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
  const showMoreButtton =
    briefDescription && splitDescription && splitDescription.length > 1;
  return (
    <header>
      <HeaderContainer css={[styles.header, { color: headerColor }]}>
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
      {showMoreButtton && (
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
