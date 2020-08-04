import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { SiteImage } from '~/data/models/SiteImage';
import { SiteLink } from '~/data/models/SiteLink';

import styles from './Article.styles';

export interface ArticleProps {
  byline?: string;
  description?: string;
  image?: SiteImage;
  link: SiteLink;
  title: string;
}

export default function Article({
  description = '',
  byline,
  image,
  link,
  title,
}: ArticleProps) {
  return (
    <article css={styles.article}>
      <div css={styles.textWrapper}>
        <p css={styles.header}>
          <BaseLink css={styles.headerText} href={link.href}>
            {title}
          </BaseLink>
        </p>
        <p css={styles.description}>{description}</p>
        <p css={styles.byline}>{byline}</p>
      </div>
      <div css={styles.imageContainer}>
        {image && (
          <Image
            {...image}
            customContainerStyles={styles.image}
            widths={[200, 400, 500]}
          />
        )}
      </div>
    </article>
  );
}
