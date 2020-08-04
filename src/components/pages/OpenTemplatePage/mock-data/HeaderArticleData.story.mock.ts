import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { SiteReviews } from '~/data/models/SiteReviews';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const headerArticleData: PageData = {
  breadcrumbs: [
    {
      type: 'SiteLinkWithLabel',
      label: 'Home',
      link: {
        href: '/',
        isExternal: false,
      },
    },
    {
      type: 'SiteLinkWithLabel',
      label: 'Open Template Page',
      link: {
        href: '/open-template',
        isExternal: false,
      },
    },
  ],
  header: {
    body: '',
    byline: 'Date of author',
    eyebrow: 'topic or section',
    image: {
      altText: 'Header image for Seo pages',
      height: 899,
      src:
        'https://images.simpletire.com/image/upload/v1593622050/steer/seo/brand_page_header_image.svg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 1600,
    },
    subTitle:
      'Subheader if necessary wrapping as many lines as needed on mobile',
    title: 'Article Title',
    type: 'SiteModuleHeaderArticle',
  },
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
  modules: [
    {
      type: 'SiteModuleQuote',
      quote: 'Maybe we want to highlight a quote or key point on this page',
      byline: 'Optional source name',
    },
    {
      type: 'SiteModuleTextList',
      links: [
        {
          type: '',
          label: 'The first topic in the list',
          link: {
            href: '#',
            isExternal: false,
          },
        },
        {
          type: '',
          label: 'Another topic',
          link: {
            href: '#',
            isExternal: false,
          },
        },
        {
          type: '',
          label: 'Excepteur sint occaecet cupidatat',
          link: {
            href: '#',
            isExternal: false,
          },
        },
        {
          type: '',
          label: 'Lorem ipsum dolor semet',
          link: {
            href: '#',
            isExternal: false,
          },
        },
      ],
      moreLink: {
        label: 'One more link',
        link: {
          href: '/',
          isExternal: false,
        },
      },
    },
    {
      articleFeatured: {
        byline: '2 min read',
        description:
          'Article abstract or subheader wrapping up to 3 lines on mobile',
        image: {
          altText: '',
          src:
            'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
          type: ICON_IMAGE_TYPE.IMAGE,
        },
        link: {
          href: '',
          isExternal: false,
        },
        title: 'Featured article name',
      },
      articleList: [
        {
          byline: '2 min read',
          description:
            'Article abstract or subheader wrappin up to 3 lines on mobile',
          image: {
            altText: '',
            src:
              'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          link: {
            href: '',
            isExternal: false,
          },
          title: 'Article Name',
        },
        {
          byline: '2 min read',
          description:
            'Article abstract or subheader wrappin up to 3 lines on mobile',
          image: {
            altText: '',
            src:
              'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          link: {
            href: '',
            isExternal: false,
          },
          title: 'Article Name',
        },
        {
          byline: '2 min read',
          description:
            'Article abstract or subheader wrappin up to 3 lines on mobile',
          image: {
            altText: '',
            src:
              'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          link: {
            href: '',
            isExternal: false,
          },
          title: 'Article Name',
        },
      ],
      moreLink: {
        label: 'see all related articles',
        link: {
          href: '/',
          isExternal: false,
        },
      },
      type: 'SiteModuleArticleListWithFeatured',
    },
    {
      items: [
        {
          content:
            'For some lists, like FAQs, we recommend an expansion style.',
          label:
            "For this list style, the first item in the list doesn't need a hairline above it.",
        },
        {
          content:
            'For some lists, like FAQs, we recommend an expansion style.',
          label:
            'Headers should be limited to 38 characters, wrapping up to two lines on mobile. This is what the body text looks like when a list item has been expanded. There is no limit to the amount of text that can be contained in the body paragraph(s). According to best practices for accordion syle UI, only one list item should be expanded at a time. When a section has been expanded, the downward-facing chevron fades out and is replaced by an upward-facing chevron to collapse this section.',
        },
        {
          content: 'Lorem ipsum dolor semet?',
          label:
            'Lorem ipsum dolor semet. Lorem ipsum dolor semet Lorem ipsum dolor semet, lorem ipsum dolor semet.',
        },
      ],
      itemsToShow: 2,
      itemsToShowLabel: 'Label here',
      singleItemExpandable: true,
      type: 'SiteModuleAccordion',
    },
    {
      altText: '',
      src:
        'https://images.simpletire.com/image/upload/w_400,f_auto,q_100/v1593547175/article_image.svg',
      type: 'SiteImage',
    },
    {
      type: 'SiteModuleMarkdown',
      body:
        "<h2>Lorem ipsum dolor</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
    },
    {
      poster: {
        altText: '',
        height: 0,
        src:
          'https://images.simpletire.com/image/upload/f_auto,q_100/v1593547175/article_image.svg',
        type: ICON_IMAGE_TYPE.IMAGE,
        width: 0,
      },
      type: 'SiteYouTubeVideo',
      video: {
        youtubeId: 'iQdV2fDR9RY',
      },
    },
    {
      type: 'SiteModuleFeedback',
    },
    {
      links: [
        {
          label: 'A related article',
          link: {
            href: '/',
            isExternal: false,
          },
        },
        {
          type: '',
          label: 'More related reading',
          link: {
            href: '/',
            isExternal: false,
          },
        },
        {
          type: '',
          label: 'More related reading',
          link: {
            href: '/',
            isExternal: false,
          },
        },
        {
          type: '',
          label: 'More related reading',
          link: {
            href: '/',
            isExternal: false,
          },
        },
      ],
      title: 'You may also be interested in',
      type: 'SiteModuleLinkList',
    },
    {
      articleList: [
        {
          byline: '2 min read',
          description:
            'Article abstract or subheader wrappin up to 3 lines on mobile',
          image: {
            altText: '',
            src:
              'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          link: {
            href: '/',
            isExternal: false,
          },
          title: 'Article Name',
        },
        {
          byline: '2 min read',
          description:
            'Article abstract or subheader wrappin up to 3 lines on mobile',
          image: {
            altText: '',
            src:
              'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          link: {
            href: '/',
            isExternal: false,
          },
          title: 'Article Name',
        },
        {
          byline: '2 min read',
          description:
            'Article abstract or subheader wrappin up to 3 lines on mobile',
          image: {
            altText: '',
            src:
              'https://images.simpletire.com/image/upload/v1593547175/article_image.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
          },
          link: {
            href: '/',
            isExternal: false,
          },
          title: 'Article Name',
        },
      ],
      moreLink: {
        label: 'see all related articles',
        link: {
          href: '/',
          isExternal: false,
        },
      },
      type: 'SiteModuleArticleListWithFeatured',
    },
    {
      type: 'SiteModuleGraphicGrid',
      items: [
        {
          copy: 'Fast, free shipping on every tire we sell',
          icon: {
            type: ICON_IMAGE_TYPE.ICON,
            svgId: 'free-shipping',
          },
          link: {
            type: 'a',
            label: 'Learn more',
            link: {
              href: '#',
              isExternal: false,
            },
          },
          title: 'Free shipping',
        },
        {
          copy: "If the price is cut within 30 days, you're reimbursed",
          icon: {
            type: ICON_IMAGE_TYPE.ICON,
            svgId: 'best-price',
          },
          link: {
            type: 'a',
            label: 'Learn more',
            link: {
              href: '#',
              isExternal: false,
            },
          },
          title: 'Price guarantee',
        },
        {
          copy: 'Unmounted tires can be returned within 30 days',
          icon: {
            type: ICON_IMAGE_TYPE.ICON,
            svgId: 'free-returns',
          },
          link: {
            type: 'a',
            label: 'Learn more',
            link: {
              href: '#',
              isExternal: false,
            },
          },
          title: 'Free no-hassle returns',
        },
        {
          copy: 'Buy from local distributors, install in local stores',
          icon: {
            type: ICON_IMAGE_TYPE.ICON,
            svgId: 'local-business',
          },
          link: {
            type: 'a',
            label: 'Learn more',
            link: {
              href: '#',
              isExternal: false,
            },
          },
          title: 'Support local business',
        },
      ],
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
