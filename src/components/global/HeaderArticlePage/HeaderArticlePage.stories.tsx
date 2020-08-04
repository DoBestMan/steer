import { boolean, text } from '@storybook/addon-knobs';

import HeaderArticle from './HeaderArticlePage';
import headerArticle from './HeaderArticlePage.mock';

export default {
  component: HeaderArticle,
  title: 'Global/Header Article',
};

export function TypicalHeaderArticle() {
  return <HeaderArticle {...headerArticle} />;
}

export function HeaderArticleWithKnobs() {
  const showImage = boolean('Show Image', true);
  const showByline = boolean('Show Byline', true);
  const showEyebrow = boolean('Show Eyebrow', true);
  const showSubTitle = boolean('Show Subtitle', true);

  return (
    <HeaderArticle
      byline={showByline ? text('Byline', '2 mins') : undefined}
      eyebrow={showEyebrow ? text('Eyebrow', 'Eyebrow') : undefined}
      image={showImage ? headerArticle.image : undefined}
      subTitle={showSubTitle ? text('Subtitle', 'Subtitle') : undefined}
      title={text('Title', 'Article Title')}
    />
  );
}
