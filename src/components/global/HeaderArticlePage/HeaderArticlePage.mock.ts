import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { Props } from './HeaderArticlePage';

const headerArticle: Props = {
  byline: 'Date or author',
  eyebrow: 'TOPIC OR SECTION',
  image: {
    src:
      'https://images.simpletire.com/image/upload/v1593805216/ArticleHeaderImage.jpg',
    altText: '',
    type: ICON_IMAGE_TYPE.IMAGE,
  },
  subTitle: 'Subheader if neccesary wrapping as many lines as needed on mobile',
  title: 'Aricle Title',
};

export default headerArticle;
