import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { Props as ArticleListProps } from './ArticleList/ArticleList';

const articles: ArticleListProps = {
  articleList: [
    {
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
      title: 'header',
    },
    {
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
    },
    {
      description:
        'Article description or subheader wrapping up to 3 lines on mobile',
      byline: '2 min',
      link: {
        href: '/',
        isExternal: false,
      },
      title: 'string',
    },
    {
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
    },
  ],
  moreLink: {
    label: 'See all related articles',
    link: {
      href: '/',
      isExternal: false,
    },
  },
};

export default articles;
