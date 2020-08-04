import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { ArticleProps } from '../Article/Article';

const articleFeatured: ArticleProps = {
  byline: '2 min',
  description:
    'Article description or subheader wrapping up to 3 lines on mobile',
  image: {
    src:
      'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
    altText: '',
    type: ICON_IMAGE_TYPE.IMAGE,
  },
  link: {
    href: '/',
    isExternal: false,
  },
  title: 'string',
};

export default articleFeatured;
