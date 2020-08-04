import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { SiteReviews } from '~/data/models/SiteReviews';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { HEADER_SIZE } from '~/lib/constants';
/* eslint-enable sort-keys */
export const testPageMockData: PageData = {
  metadata: {
    meta: {
      canonical: '/test',
      description: 'Test description for meta data  ',
      robots: 'text',
      shareImage: {
        altText: 'Image alternative text example',
        height: 480,
        src:
          'https://images.simpletire.com/image/upload/v1593622050/steer/seo/brand_page_header_image.svg',
        type: 'SiteImage' as ICON_IMAGE_TYPE.IMAGE,
        width: 640,
      },
      title: 'Test Meta',
    },
    slug: 'opent-template',
  },
  breadcrumbs: [
    {
      label: 'Link 1',
      link: {
        href: '/about',
        isExternal: false,
      },
      type: 'SiteLinkWithLabel',
    },
    {
      label: 'Link 2',
      link: {
        href: 'https://www.google.com/',
        isExternal: false,
      },
      type: 'SiteLinkWithLabel',
    },
    {
      label: 'more link',
      link: {
        href: '/more',
        isExternal: false,
      },
      type: 'SiteLinkWithLabel',
    },
  ],
  header: {
    body:
      'Optional overview, which can be used in place of a subheader. Recommended to be truncated after the first sentence, or 4 lines, for long paragraphs.',

    image: {
      altText: 'Image alternative text example',
      height: 480,
      src:
        'https://images.simpletire.com/image/upload/v1593622050/steer/seo/brand_page_header_image.svg',
      type: 'SiteImage' as ICON_IMAGE_TYPE.IMAGE,
      width: 640,
    },

    subTitle: 'Optional subheader example',
    title: 'Landing Page Header',
    titleSize: 'jumbo' as HEADER_SIZE.JUMBO,
    type: 'SiteModuleHeaderLanding',
  },
  modules: [
    {
      body:
        '<h3>HOURS OF OPERATION</h3><p>Support is available during the following hours: 8am - 7pm ET Mon - Fri 9am - 2pm ET Sat For fastest service, please complete the form above. If you would like to speak with a customer support representative during normal operating hours, please call <b>888-410-0604</b></p>',
      type: 'SiteModuleMarkdown',
    },
    {
      byline: 'Text Quote Author',
      quote: 'Test Quote Copy',
      type: 'SiteModuleQuote',
    },
    {
      type: 'SiteModuleTireSearchBillboard',
    },
    {
      type: 'SiteModuleTextList',
      links: [
        {
          label: 'Link 1',
          link: {
            href: '/about',
            isExternal: false,
          },
        },
        {
          label: 'Link 2',
          link: {
            href: 'https://www.google.com/',
            isExternal: false,
          },
        },
      ],
      moreLink: {
        label: 'more link',
        link: {
          href: '/more',
          isExternal: false,
        },
      },
    },
    {
      type: 'SiteModuleSeparator',
    },
    {
      type: 'SiteModuleLinkList',
      title: 'You may also be interested in',
      links: [
        {
          label: 'Link 1',
          link: {
            href: '/about',
            isExternal: false,
          },
        },
        {
          label: 'Link 2',
          link: {
            href: 'https://www.google.com/',
            isExternal: false,
          },
        },
      ],
    },
    {
      type: 'SiteModuleGraphicGrid',
      items: [
        {
          icon: {
            type: 'SiteIcon' as ICON_IMAGE_TYPE.ICON,
            svgId: 'free-shipping',
          },
          title: 'Free shipping',
          copy: 'Fast, free shipping on every tire we sell',
          link: {
            type: 'a',
            label: 'Learn more',
            link: {
              href: '#',
              isExternal: false,
            },
          },
        },
        {
          icon: {
            type: 'SiteIcon' as ICON_IMAGE_TYPE.ICON,
            svgId: 'tire',
          },
          title: 'Free no-hassle returns',
          copy: 'Unmounted tires can be returned within 30 days',
          link: {
            type: 'a',
            label: 'Learn more',
            link: {
              href: '#',
              isExternal: false,
            },
          },
        },
      ],
    },
    {
      type: 'SiteModuleArticleListWithFeatured',
      articleFeatured: {
        byline: '2 min read',
        description:
          'Article abstract or subheader wrapping up to 3 lines on mobile',
        image: {
          altText: 'Image alternative text example',
          height: 480,
          src: 'https://via.placeholder.com/45',
          type: 'SiteImage' as ICON_IMAGE_TYPE.IMAGE,
          width: 640,
        },
        link: {
          href: '/featured-article-slug',
          isExternal: false,
        },

        title: 'Article Name',
      },
    },
    {
      altText: 'Image alternative text example',
      height: 480,
      src:
        'https://images.simpletire.com/image/upload/v1594992889/steer/seo/Road-Hazard2_2x.jpg',

      type: 'SiteImage',
      width: 640,
    },
    {
      items: [
        {
          label: 'Accordion header',
          content:
            'Expanded accordion content dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          label: 'Accordion header 1',
          content: 'Expanded accordion content 1.',
        },
        {
          label: 'Accordion header 2',
          content: 'Expanded accordion content 2.',
        },
      ],
      itemsToShow: 1,
      itemsToShowLabel: 'See all 2 items',
      singleItemExpandable: true,
      type: 'SiteModuleAccordion',
    },
    {
      type: 'SiteModuleSeparator',
    },
    {
      links: [
        {
          label: 'Link 1',
          link: {
            href: '/about',
            isExternal: false,
          },
        },
        {
          label: 'Link 2',
          link: {
            href: 'https://www.google.com/',
            isExternal: false,
          },
        },
      ],
      title: 'You may also be interested in',
      type: 'SiteModuleLinkList',
    },
    {
      type: 'SiteModuleTireSearchBillboard',
    },
    {
      type: 'SiteModuleFeedback',
    },
    {
      type: 'SiteModuleReview',
      siteReviews: {
        body: 'SimpleTire is the best place to buy tires!',
        link: {
          href: 'https://www.shopperapproved.com/reviews/simpletire.com/',
          isExternal: true,
        },
        linkLabel: 'See reviews from all SimpleTire customers',
        ratingLabel: 'Rated by 155,000+ verified customers',
        ratingLabelIcon: {
          svgId: 'free-shipping',
          type: 'SiteIcon',
        } as SiteIcon,
        ratingStars: 4.8,
        siteReviewList: [
          {
            authorImage: {
              altText: 'Andrew',
              height: 60,
              src:
                'https://images.simpletire.com/image/upload/v1593702687/steer/home/men2.png',
              type: 'SiteImage',
              width: 60,
            } as SiteImage,
            authorName: 'Andrew',
            body:
              'We did a price comparison. We saved about $121 with SimpleTire.',
            id: '3',
            title: 'Great deal',
          },
          {
            authorImage: {
              altText: 'James',
              height: 60,
              src:
                'https://images.simpletire.com/image/upload/v1593702612/steer/home/men1.png',
              type: 'SiteImage',
              width: 60,
            } as SiteImage,
            authorName: 'James',
            body:
              'Great service and less expensive than going to the dealership.',
            id: '2',
            title: 'Easy installation',
          },
          {
            authorImage: {
              altText: 'Melissa',
              height: 60,
              src:
                'https://images.simpletire.com/image/upload/v1593702738/steer/home/women1.png',
              type: 'SiteImage',
              width: 60,
            } as SiteImage,
            authorName: 'Melissa',
            body:
              "I bought several tires on different orders and I'm totally satisfied.",
            id: '1',
            title: 'Huge inventory',
          },
        ],
        title: 'Why replace with us',
      } as SiteReviews,
    },
  ],
};
