import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { LINK_MAP, LINKS } from '~/lib/constants/externalLinks';
import { getCurrentYear } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';

export const footerLinksData = {
  company: {
    links: [
      { action: ROUTE_MAP[ROUTES.ABOUT], text: ui('links.about') },
      {
        action: ROUTE_MAP[ROUTES.LEARN],
        text: ui('links.learnAboutTires'),
      },
      {
        action: LINK_MAP[LINKS.APPLY],
        isExternal: true,
        text: ui('links.apply'),
      },
      {
        action: ROUTE_MAP[ROUTES.CUSTOMER_SUPPORT],
        text: ui('links.customerSupport'),
      },
      {
        action: ROUTE_MAP[ROUTES.PRIVACY],
        text: ui('links.privacy'),
      },
      {
        action: ROUTE_MAP[ROUTES.TERMS],
        text: ui('links.terms'),
      },
      {
        action: ROUTE_MAP[ROUTES.SITEMAP],
        text: ui('links.sitemap'),
      },
    ],
  },

  copyright: {
    text: `© ${getCurrentYear()} SimpleTire. All Rights Reserved.`,
  },

  social: {
    links: [
      {
        action: LINK_MAP[LINKS.FACEBOOK],
        icon: ICONS.FACEBOOK,
        isExternal: true,
        text: ui('links.facebook'),
      },
      {
        action: LINK_MAP[LINKS.TWITTER],
        icon: ICONS.TWITTER,
        isExternal: true,
        text: ui('links.twitter'),
      },
      {
        action: LINK_MAP[LINKS.INSTAGRAM],
        icon: ICONS.INSTAGRAM,
        isExternal: true,
        text: ui('links.instagram'),
      },
      {
        action: LINK_MAP[LINKS.YOUTUBE],
        icon: ICONS.YOUTUBE,
        isExternal: true,
        text: ui('links.youtube'),
      },
      {
        action: LINK_MAP[LINKS.LINKEDIN],
        icon: ICONS.LINKEDIN,
        isExternal: true,
        text: ui('links.linkedin'),
      },
    ],
  },

  tires: {
    links: [
      {
        action: ROUTE_MAP[ROUTES.TIRE_REVIEWS],
        text: ui('links.tireReviews'),
      },
      {
        action: ROUTE_MAP[ROUTES.TIRE_BUYING_GUIDE],
        text: ui('links.tireBuyingGuide'),
      },
      {
        action: ROUTE_MAP[ROUTES.ORDER_TRACKING],
        text: ui('links.orderTracking'),
      },
      { action: ROUTE_MAP[ROUTES.FAQS], text: ui('links.faqs') },
      {
        action: ROUTE_MAP[ROUTES.RETURNS],
        text: ui('links.returns'),
      },
      {
        action: ROUTE_MAP[ROUTES.FINANCING],
        text: ui('links.financing'),
      },
      {
        action: LINK_MAP[LINKS.REGISTER_TIRES],
        isExternal: true,
        text: ui('links.registerTires'),
      },
    ],
  },
};
