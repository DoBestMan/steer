import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';

import { ArticleProps } from '../Article/Article';
import styles from './ArticleFeatured.styles';

export interface Props extends ArticleProps {
  hasBorder?: boolean;
}

export default function ArticleFeatured({
  description = '',
  byline,
  title,
  image,
  hasBorder,
  link,
}: Props) {
  return (
    <article css={[styles.article, hasBorder && styles.hasBorder]}>
      <div css={styles.imageContainer}>
        {image && (
          <Image {...image} responsive widths={[400, 600, 800, 1200, 1600]} />
        )}
      </div>
      <div css={styles.textWrapper}>
        <p css={styles.header}>
          <BaseLink css={styles.headerText} href={link.href}>
            {title}
          </BaseLink>
        </p>
        <p css={styles.description}>{description}</p>
        <p css={styles.byline}>{byline}</p>
      </div>
    </article>
  );
}
