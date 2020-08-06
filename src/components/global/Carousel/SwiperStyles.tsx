import Head from 'next/head';

import { swiperjs } from '~/styles/document/swiper.styles';

const SWIPER_CSS_INLINE_ID = 'swiper-css-container';

export default function SwiperStyles() {
  return (
    <Head>
      <style
        key={SWIPER_CSS_INLINE_ID}
        id={SWIPER_CSS_INLINE_ID}
        dangerouslySetInnerHTML={{
          __html: swiperjs,
        }}
      />
    </Head>
  );
}
