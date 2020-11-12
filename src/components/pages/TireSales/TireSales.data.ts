import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import { PageData } from '~/data/models/SiteOpenTemplate';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const pageUpperData: PageData = {
  header: {
    body:
      'Tire specialists are ready to help you get the best prices on new tires for every vehicle and have a simple buying experience.',
    image: {
      altText: 'Header image for Seo pages',
      height: 899,
      src:
        'https://images.simpletire.com/image/upload/v1593622050/steer/seo/brand_page_header_image.svg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 1600,
    },
    subTitle: '',
    title: 'Tire specialists',
    type: 'SiteModuleHeaderLanding',
  },
  metadata: {
    meta: {
      canonical: '/tire-sales',
      description: '',
      shareImage: undefined,
      title: 'Tire Sales',
    },
    slug: 'tire-sales',
  },
  modules: [
    {
      type: 'SiteModuleMarkdown',
      body: '<h3>Call 888.410.0604 to Speak with a Tire Specialist</h3>',
    },
    {
      type: 'SiteModuleSeparator',
    },
  ],
};

export const pageDownData: PageData = {
  header: {} as SiteHeaderModule,
  modules: [
    {
      type: 'SiteModuleSeparator',
    },
    {
      type: 'SiteModuleMarkdown',
      body: `<h4>HOURS OF OPERATION</h4><p>Support is available during the following hours:<br/><br/>Mon - Fri: 8am - 7pm ET<br/>Sat: 9am - 2pm ET<br/>Sun: Closed<br/><br/>
        For fastest service, please complete the form above. If you would like to speak with a customer support representative during normal operating hours, please call <a href="tel:+18884100604">(888) 410 0604</a></p>
        <h4>HEADQUARTERS</h4><p>8 Neshaminy Interplex Drive, Suite 300 Trevose, PA 19053-6974</p>`,
    },
  ],
};

export const TireSalesForm = {
  type: 'TireSalesForm',
  items: [],
};
