import Head from 'next/head';
import { useRouter } from 'next/router';

import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { COLORS, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { URLS } from '~/lib/constants/urls';
import { isClient } from '~/lib/helpers/browser';
import { fixHomepageRoute } from '~/lib/utils/routes';
import { ui } from '~/lib/utils/ui-dictionary';

export interface MetaProps {
  canonical?: string;
  description?: string;
  hasCanonical?: boolean;
  robots?: string;
  shareImage?: SiteImage;
  title?: string;
}

const DEFAULT_SHARE_IMAGE: SiteImage = {
  altText: '',
  src: `${URLS.HOST_PRODUCTION}/static/assets/share/simpletire.jpg`,
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
  hasCanonical = true,
  robots = 'index,follow',
  shareImage,
  title = ui('meta.title'),
}: MetaProps) {
  const router = useRouter();

  // Share Image
  let metaShareImage = '';
  if (shareImage?.src) {
    metaShareImage = shareImage.src;
  } else {
    metaShareImage = DEFAULT_SHARE_IMAGE.src;
  }

  // Canonical
  const urlPath = isClient()
    ? fixHomepageRoute(window.location.pathname)
    : fixHomepageRoute(router.asPath.split('?')[0]);
  const url = canonical ? canonical : `${URLS.HOST_PRODUCTION}${urlPath}`;

  // Title + description
  title = `${title} | SimpleTire`;
  title = title.replace(/&amp;/g, '&');
  description = description.replace(/&amp;/g, '&');
  const isWriteReview = router.pathname === ROUTE_MAP[ROUTES.WRITE_REVIEW];
  const isPLA = !!router.pathname.match(ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]);
  robots = isPLA
    ? 'noindex,nofollow'
    : isWriteReview
    ? 'noindex,follow'
    : 'index,follow';
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
      <meta name="robots" content={robots} />
      {hasCanonical && <link rel="canonical" href={url} key="canonical" />}
      <link
        rel="manifest"
        href="/static/assets/manifest.json"
        key="manifest"
      ></link>

      {/* List of favicons */}
      <link
        rel="shortcut icon"
        href="/static/assets/icons/favicon.ico"
        type="image/x-icon"
        key="shortcut icon"
      />

      <link
        rel="icon"
        sizes="192x192"
        href="/static/assets/icons/android-chrome-192x192.png"
        key="icon"
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
        key="apple-touch-icon-precomposed"
      ></link>

      {/* Preconnects */}
      <link
        rel="preconnect"
        href="https://www.google-analytics.com"
        key="preconnect-ga"
      ></link>

      {/* Socials */}
      <meta property="og:site_name" content="SimpleTire" key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:image" content={metaShareImage} key="og:image" />
      <meta property="og:image:width" content="1024" key="og:image:width" />
      <meta property="og:image:height" content="512" key="og:image:height" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@simpletire" />
      <meta name="twitter:creator" content="@simpletire" />
      <meta name="twitter:text:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={metaShareImage} />
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
