import Head from 'next/head';
import { useRouter } from 'next/router';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

export interface MetaProps {
  canonical?: string;
  description?: string;
  robot?: string;
  shareImage?: SiteImage;
  title?: string;
}

const DEFAULT_SHARE_IMAGE: SiteImage = {
  altText: '',
  src: '/static/assets/share/simpletire.jpg',
  type: ICON_IMAGE_TYPE.IMAGE,
};

const APPLE_TOUCH_ICON_SIZES = [
  '57',
  '60',
  '72',
  '76',
  '114',
  '120',
  '144',
  '152',
  '167',
  '180',
  '1024',
];

function Meta({
  canonical,
  description = ui('meta.description'),
  // TODO: For MVP, no pages are indexable
  robot = 'no index, no follow',
  shareImage = DEFAULT_SHARE_IMAGE,
  title = ui('meta.title'),
}: MetaProps) {
  const router = useRouter();

  const url = canonical ? canonical : router.asPath.split('?')[0];

  title = `${title} | SimpleTire`;

  title = title.replace(/&amp;/g, '&');
  description = description.replace(/&amp;/g, '&');

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,user-scalable=yes"
      />
      <meta name="description" content={description} />
      <meta name="robots" content={robot} />
      {canonical && <link rel="canonical" href={canonical} />}
      <link
        rel="manifest"
        href="/static/assets/manifest.json"
        data-reactid="40"
      ></link>

      {/* List of favicons */}
      <link
        rel="shortcut icon"
        href="/static/assets/icons/favicon.ico"
        type="image/x-icon"
      />

      <link
        rel="icon"
        sizes="192x192"
        href="/static/assets/icons/android-chrome-192x192.png"
      />

      {APPLE_TOUCH_ICON_SIZES.map((size) => (
        <link
          key={size}
          rel="apple-touch-icon"
          sizes={`${size}x${size}`}
          href={`/static/assets/icons/apple-icon-${size}x${size}.png`}
        ></link>
      ))}
      <link
        rel="apple-touch-icon-precomposed"
        href="/static/assets/icons/apple-touch-icon-precomposed.png"
      ></link>

      {/* Preconnects */}
      <link rel="preconnect" href="https://www.google-analytics.com"></link>

      {/* Socials */}
      <meta property="og:site_name" content="SimpleTire" />
      <meta property="og:title" content={title} key={'og:title'} />
      <meta
        property="og:description"
        content={description}
        key={'og:description'}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={shareImage.src} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="512" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@simpletire" />
      <meta name="twitter:creator" content="@simpletire" />
      <meta name="twitter:text:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={shareImage.src} />
      <meta name="twitter:image:width" content="1024" />
      <meta name="twitter:image:height" content="512" />

      {/* Other */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content={COLORS.LIGHT.OFF_WHITE} />
      <meta name="application-name" content="SimpleTire" />

      {/* MS */}
      <meta name="msapplication-TileColor" content={COLORS.LIGHT.OFF_WHITE} />
      <meta
        name="msapplication-TileImage"
        content="/static/assets/icons/mstile-144x144.png"
      />

      <meta
        name="msapplication-square70x70logo"
        content="/static/assets/icons/mstile-70x70.png"
      />
      <meta
        name="msapplication-square150x150logo"
        content="/static/assets/icons/mstile-150x150.png"
      />
      <meta
        name="msapplication-wide310x150logo"
        content="/static/assets/icons/mstile-310x150.png"
      />
      <meta
        name="msapplication-square310x310logo"
        content="/static/assets/icons/mstile-310x310.png"
      />
    </Head>
  );
}

export default Meta;
