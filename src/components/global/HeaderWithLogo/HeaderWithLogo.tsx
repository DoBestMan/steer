import { ReactType, useCallback, useState } from 'react';
import { NodeType } from 'react-markdown';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { SiteImage } from '~/data/models/SiteImage';
import { HEADER_SIZE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles, { sizeStyles, themeStyles } from './HeaderWithLogo.styles';

export interface HeaderWithLogoProps {
  body?: string | null;
  collapseBodyCTALabel?: string;
  expandBodyCTALabel?: string;
  image: SiteImage;
  imageLabel?: string;
  subTitle?: string;
  subTitleAs?: ReactType;
  theme?: THEME;
  title: string;
  titleAs?: ReactType;
  titleSize?: HEADER_SIZE;
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

export default function HeaderWithLogo({
  body,
  collapseBodyCTALabel = ui('common.headerLandingPage.collapseBodyCTALabel'),
  expandBodyCTALabel = ui('common.headerLandingPage.expandBodyCTALabel'),
  image,
  imageLabel = '',
  subTitle,
  subTitleAs = 'div',
  title,
  titleAs = 'h1',
  titleSize = HEADER_SIZE.JUMBO,
  theme = THEME.LIGHT,
}: HeaderWithLogoProps) {
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
  const brandLogoProps = {
    image,
    label: imageLabel,
  };

  return (
    <header css={[styles.container, themeStyles[theme].container]}>
      <TitleContainer
        css={[sizeStyles[titleSize].title, themeStyles[theme].title]}
      >
        <div css={styles.imageContainer}>
          <BrandLogoOrLabel brand={brandLogoProps} widths={[100, 200, 400]} />
        </div>
        {title}
      </TitleContainer>

      {subTitle && (
        <SubTitleContainer css={[styles.subTitle, themeStyles[theme].subTitle]}>
          <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
            {subTitle}
          </Markdown>
        </SubTitleContainer>
      )}
      {briefBody && (
        <div css={styles.Body}>
          <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
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
          <Markdown allowedTypes={markdownAllowedTypes} unwrapDisallowed>
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
