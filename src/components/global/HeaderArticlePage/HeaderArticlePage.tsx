import { ReactType } from 'react';

import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';

import styles from './HeaderArticlePage.styles';

export interface Props {
  byline?: string;
  eyebrow?: string;
  headerAs?: ReactType;
  image?: SiteImage;
  subTitle?: string;
  title: string;
}

function HeaderArticle({
  byline,
  eyebrow,
  headerAs = 'h1',
  image,
  subTitle,
  title,
}: Props) {
  const Header = headerAs;
  return (
    <article css={styles.article}>
      <div css={styles.imageContainer}>
        {image && (
          <Image widths={[400, 600, 800, 1200, 1600]} responsive {...image} />
        )}
      </div>
      <div css={styles.textWrapper}>
        {eyebrow && <p css={styles.eyebrow}>{eyebrow}</p>}
        <Header css={styles.title}>{title}</Header>
        {subTitle && <p css={styles.subTitle}>{subTitle}</p>}
        {byline && <p css={styles.byline}>{byline}</p>}
      </div>
    </article>
  );
}

export default HeaderArticle;
