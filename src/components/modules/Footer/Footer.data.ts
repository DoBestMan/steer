import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { LINK_MAP, LINKS } from '~/lib/constants/externalLinks';
import { getCurrentYear } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';

export const data = {
  company: {
    links: [
      { action: ROUTE_MAP[ROUTES.ABOUT], text: ui('links.about') },
      {
        action: ROUTE_MAP[ROUTES.LEARN],
        text: ui('links.learnAboutTires'),
      },
      { action: LINK_MAP[LINKS.APPLY], text: ui('links.apply') },
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
        text: ui('links.facebook'),
      },
      {
        action: LINK_MAP[LINKS.TWITTER],
        icon: ICONS.TWITTER,
        text: ui('links.twitter'),
      },
      {
        action: LINK_MAP[LINKS.INSTAGRAM],
        icon: ICONS.INSTAGRAM,
        text: ui('links.instagram'),
      },
      {
        action: LINK_MAP[LINKS.YOUTUBE],
        icon: ICONS.YOUTUBE,
        text: ui('links.youtube'),
      },
      {
        action: LINK_MAP[LINKS.LINKEDIN],
        icon: ICONS.LINKEDIN,
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
        text: ui('links.registerTires'),
      },
    ],
  },
};
