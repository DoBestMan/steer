import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { THEME } from '~/lib/constants';

export const contactPageUpperData: PageData = {
  breadcrumbs: [
    {
      label: 'Home',
      link: {
        href: '/',
        isExternal: false,
      },
      type: 'SiteLinkWithLabel',
    },
    {
      label: 'Contact us',
      link: {
        href: '/contact',
        isExternal: false,
      },
      type: 'SiteLinkWithLabel',
    },
  ],
  header: {
    body:
      'We’re here to answer any questions you may have and to keep your tire buying experience simple. Check our FAQ section for answers to our most common questions. If you can’t find an answer to your question then fill out the contact form below and we’ll answer you as soon as possible.',
    title: 'Contact us',
    type: 'SiteModuleHeaderLanding',
    subTitle: '',
  },
  metadata: {
    meta: {
      canonical: '/contact',
      description:
        'At SimpleTire, we are committed to providing you with the best customer services and support to ensure a positive shopping experience. Please contact us with any questions or concerns you may have regarding your tire purchase.',
      shareImage: undefined,
      title: 'Contact us',
    },
    slug: 'customer-support',
  },
  modules: [
    {
      type: 'SiteModuleMarkdown',
      body: '<h2>Support FAQs</h2>',
    },
    {
      items: [
        {
          label: 'When will my order ship?',
          content:
            'It takes 24 hours to process and ship your order. We’ll send you an email as soon as your tires have shipped and give you the tracking numbers so you can track them all the way to your front door (or to your favorite installer).',
        },
        {
          label: 'How do I make a return or exchange?',
          content:
            'The fastest and easiest way to submit a return request is through our [Return Request Form](/return-request). Let us know if you need a refund or replacement and we’ll contact you by email. We’ll want the tires back so we’ll send prepaid return labels in an email for you to print and tape to each of the tires. After that it’s just a quick drop off at the nearest FedEx or UPS location (depending on the labels received) and your refund or replacements will be on the way! If you need help making the request, give our Support team a call at <a href="tel:+1888-410-0604">(888) 410-0604</a>.',
        },
        {
          label: 'What happens if the tire is damaged or defective?',
          content:
            'That depends. If, for some reason, the tire is damaged on arrival then all you need to do is fill out the [Return Request Form](/return-request), let us know what happened, and we’ll send a replacement. If the tire is damaged after it’s mounted then we’ll ask for pictures and what the cause was. Defects and the damage they can cause to the tire are covered under the manufacturer’s warranty while any damage caused by a road hazard usually isn’t.',
        },
        {
          label: 'What happens if I have no ideas where to get the tires?',
          content: 'Contact the support team',
        },
      ],
      itemsToShow: 3,
      itemsToShowLabel: 'See all FAQs',
      singleItemExpandable: false,
      theme: THEME.LIGHT,
      type: 'SiteModuleAccordion',
    },
  ],
};

export const contactPageDownData: PageData = {
  header: {} as SiteHeaderModule,
  modules: [
    {
      type: 'SiteModuleSeparator',
    },
    {
      type: 'SiteModuleMarkdown',
      body: `<h4>HOURS OF OPERATION</h4><p><br/>Support is available during the following hours:<br/><br/>Mon - Fri: 8am - 7pm ET<br/>Sat: 9am - 2pm ET<br/>Sun: Closed<br/></p>
        <h4>HOLIDAY HOURS OF OPERATION</h4><p><br/>Support is available during the following hours:<br/><br/>12/21 - 12/24: 9AM - 6PM EST<br/>12/25: Closed<br/>12/28 - 12/31: 9AM - 6PM EST<br/>1/1: Closed<br/><br/>
        For fastest service, please complete the form above. If you would like to speak with a customer support representative during normal operating hours, please call <a href="tel:+18884100604">(888) 410 0604</a></p>
        <h4>HEADQUARTERS</h4><p>8 Neshaminy Interplex Drive, Suite 300 Trevose, PA 19053-6974</p>`,
    },
  ],
};

export const customerSupportFormData = {
  type: 'CustomerSupportForm',
  items: [
    {
      label: 'Pricing',
      value: 'Pricing',
    },
    {
      label: 'Tire size',
      value: 'Tire size',
    },
    {
      label: 'Tire damage',
      value: 'Tire damage',
    },
    {
      label: 'Order delivery',
      value: 'Order delivery',
    },
    {
      label: 'Tire installation',
      value: 'Tire installation',
    },
    {
      label: 'Returns / Replacements',
      value: 'Returns / Replacements',
    },
    {
      label: 'Road hazard claim',
      value: 'Road hazard claim',
    },
    {
      label: 'Website feedback',
      value: 'Website feedback',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ],
};
