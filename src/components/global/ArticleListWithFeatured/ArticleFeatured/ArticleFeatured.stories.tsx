import { boolean, text } from '@storybook/addon-knobs';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import ArticleFeatured from './ArticleFeatured';

export default {
  component: ArticleFeatured,
  title: 'Global/Article List With Featured/Article Featured',
};

const mockLogo = {
  src:
    'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
  altText: '',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

export function ArticleFeaturedWithKnobs() {
  const showImage = boolean('Show Image', true);

  return (
    <ArticleFeatured
      description={text(
        'Description',
        'Article Description is about the articlelist',
      )}
      title={text('Header', 'Article')}
      byline={text('Byline', '2 mins')}
      image={showImage ? mockLogo : undefined}
      link={{
        href: '/',
        isExternal: false,
      }}
    />
  );
}
