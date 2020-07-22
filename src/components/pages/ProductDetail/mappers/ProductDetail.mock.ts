/* eslint-disable sort-keys */

import { SearchContextProps } from '~/components/modules/Search/Search.context';
import { UserPersonalizationProps } from '~/context/UserPersonalization.context';
import { SiteCatalogProductGroupItemEnum } from '~/data/models/SiteCatalogProductGroupList';
import {
  SiteCatalogProductImageProductImageTypeEnum,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import { SiteCatalogProductItemEnum } from '~/data/models/SiteCatalogProductItem';
import { SiteImageNullableTypeEnum } from '~/data/models/SiteImageNullable';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductInstallationStatusEnum } from '~/data/models/SiteProductInstallation';
import { SiteProductLineSizeDetailProductStatusEnum } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { SiteYouTubeVideoTypeEnum } from '~/data/models/SiteYouTubeVideo';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

export const globalsMock = {
  customerServiceEnabled: true,
  customerServiceNumber: {
    display: '(888) 123 456',
    value: '888123456',
  },
  siteTheme: 'light',
} as any;

export const routerMock = {
  asPath: '/brands/continental-tires/dh2',
  pathname: '/brands/[brand]/[productLine]',
  query: {
    brand: 'continental-tires',
    productLine: 'dh2',
  },
} as any;

export const routerWithTireSizeMock = {
  asPath: '/brands/continental-tires/dh2',
  pathname: '/brands/[brand]/[productLine]',
  query: {
    brand: 'continental-tires',
    productLine: 'dh2',
    tireSize: '100-40r15',
  },
} as any;

export const userPersonalizationContextMock: UserPersonalizationProps = {
  locationString: 'Brooklyn, NY',
  userPersonalizationData: {
    gaClientId: 'GoogleAnalyticsClientId',
    userLocation: {
      cityName: 'Brooklyn',
      region: 5,
      stateAbbr: 'NY',
      zip: '11201',
    },
  },
  vehicle: {
    vehicleYear: '2019',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    vehicleTrim: 'LX Sedan & Coupe',
  },

  selectVehicle: () => {},
  unselectVehicle: () => {},
  updateLocation: () => {},
};

export const searchContextMock: SearchContextProps = {
  hasLockedSearchState: false,
  hasSearchResultsError: false,
  isLoadingResults: false,
  isSearchOpen: false,
  routeQueryParamOptions: undefined,
  pastSearches: { label: '', siteSearchResultList: [] },
  searchResults: { resultMetadata: {}, siteSearchResultGroupList: [] },
  searchState: '',
  shouldPreventLinkNavigation: false,

  addPastSearch: () => {},
  clearSearchResults: () => {},
  deletePastSearches: () => {},
  getPastSearches: () => {},
  lockSearchStateToBrand: () => {},
  lockSearchStateToTireSize: () => {},
  lockSearchStateToVehicle: () => {},
  searchQuery: () => {},
  setHasLockedSearchState: () => {},
  setIsSearchOpen: () => {},
  setRouteQueryParamOptions: () => {},
  setSearchState: () => {},
  setShouldPreventLinkNavigation: () => {},
  toggleIsSearchOpen: () => {},
};

export const siteProductMock: SiteProduct = {
  siteProductLine: {
    name: 'DH2',
    brand: {
      image: {
        altText: 'Achilles',
        height: 20,
        src:
          'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
        type: ICON_IMAGE_TYPE.IMAGE,
        width: 120,
      },
      label: 'Achilles',
    },
    assetList: [
      {
        image: {
          type: ICON_IMAGE_TYPE.IMAGE,
          src:
            'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
          altText: 'Tire sidewall',
          width: 800,
          height: 800,
        },
        productImageType: SiteCatalogProductImageProductImageTypeEnum.Sidewall,
        type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
      },
      {
        image: {
          type: ICON_IMAGE_TYPE.IMAGE,
          src:
            'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
          altText: 'Tire sidetread',
          width: 543,
          height: 800,
        },
        productImageType: SiteCatalogProductImageProductImageTypeEnum.Sidetread,
        type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
      },
      {
        image: {
          type: ICON_IMAGE_TYPE.IMAGE,
          src:
            'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-treadfull_xpitvf.png',
          altText: 'Tire treadfull',
          width: 272,
          height: 800,
        },
        productImageType: SiteCatalogProductImageProductImageTypeEnum.Treadfull,
        type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
      },
      {
        image: {
          type: ICON_IMAGE_TYPE.IMAGE,
          src:
            'https://images.simpletire.com/image/upload/v1591705546/line-images/1349/1349-treadonly_pa1oew.png',
          altText: 'Tire treadonly',
          width: 800,
          height: 800,
        },
        productImageType: SiteCatalogProductImageProductImageTypeEnum.Treadonly,
        type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
      },
      {
        poster: {
          altText: 'Video poster',
          height: 1080,
          src: 'https://picsum.photos/1920/1080',
          width: 1920,
          type: ICON_IMAGE_TYPE.IMAGE,
        },
        video: {
          youtubeId: 'iQdV2fDR9RY',
        },
        type: SiteYouTubeVideoTypeEnum.SiteYouTubeVideo,
      },
    ],
    startingPriceInCents: '5999',
    overview:
      "The ContiProContact is Continental's Grand Touring All-Season tire originally developed for European sport coupes and sedans sold in North America, and is now available for a wide range of imported and domestic cars.",
    faqList: [
      {
        label: 'How long does it last?',
        content:
          "Continental includes either a **60,000** or **80,000** mile tread _life warranty_ depending on the tire's speed rating. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor id eu nisl nunc mi ipsum. Id porta nibh venenatis cras sed.\n\nAdipiscing enim eu turpis egestas pretium aenean pharetra. Malesuada proin libero nunc consequat interdum varius.",
      },
      {
        label: 'Are they good in snow?',
        content:
          'The symmetrical tread design is made from an all-season tread compound that combines with optimized sipes around the tread that interlock for enhanced stability and dry handling and traction. Optimized shoulder lugs provide increased steering response and stability.',
      },
    ],
  },
  siteProductLineSizeDetail: {
    size: '215/50 R17',
    loadSpeedRating: '91H',
    price: {
      estimatedRetailPriceInCents: '15975',
      salePriceInCents: '13296',
    },
    priceLabel: '60% off',
    productStatus:
      SiteProductLineSizeDetailProductStatusEnum.ProductStatusAvailable,
    outOfStockTireSizeResultCount: null,
    roadHazard: {
      durationLabel: '3 years',
      pricePerTireInCents: '1302',
    },
  },
  siteProductLineRearSizeDetail: {
    size: '215/50 R19',
    loadSpeedRating: '91J',
    price: {
      estimatedRetailPriceInCents: '12099',
      salePriceInCents: '12099',
    },
    priceLabel: null,
    productStatus:
      SiteProductLineSizeDetailProductStatusEnum.ProductStatusAvailable,
    outOfStockTireSizeResultCount: null,
    roadHazard: {
      durationLabel: '3 years',
      pricePerTireInCents: '1900',
    },
  },
  siteProductInstallation: {
    status: SiteProductInstallationStatusEnum.SiteProductInstallationAvailable,
    installationMeta: {
      vehicleType: 'car--sedan',
      sceneryType: 'scenery--urban',
    },
  },
  siteProductPromotions: [
    {
      sitePromotion: {
        label: '100% Risk-Free',
        icon: {
          type: ICON_IMAGE_TYPE.ICON,
          svgId: 'fire',
        },
        style: SitePromotionStyleEnum.SitePromotionItemOrangePill,
      },
      siteDynamicModal: {
        title: 'Risk-Free Guarantee',
        subtitle: 'Only from SimpleTire',
        content:
          "Our goal is your complete satisfaction! We stand behind the products we sell and are dedicated to providing you with the best online tire shopping experience. You're guaranteed to find the right tires that fit your needs and vehicle.\n\nSafety and dependability are of the utmost importance when it comes to tires, which is why we only offer high-quality, new tires on our secure site. Each tire is housed in a climate-controlled facility and has never been mounted on a vehicle.\n\n* Every tire\n * Free shipping\n* Fast delivery",
        image: {
          src: 'https://dummyimage.com/1600x900/000/f00.jpg',
          width: 1600,
          height: 900,
          altText: 'Risk-Free Guarantee',
          type: SiteImageNullableTypeEnum.SiteImage,
        },
        link: {
          label: 'Learn more',
          link: {
            href: '/about-us',
            isExternal: false,
          },
        },
        showSupportSection: true,
        type: 'SiteDynamicModal',
      },
    },
  ],
  siteProductRecirculation: [
    {
      type: SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem,
      name: 'Special deals',
      id: 'curatedGroup1',
      description: 'Save up to 30% off with discounts and rebates.',
      icon: null,
      productList: [
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P1',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'Achilles',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'Achilles',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P2',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'AG-Dura',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'AG-Dura',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P3',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'Advanta',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195322/manf-logos/452b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'Advanta',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P4',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'Agstar',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195310/manf-logos/3b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'Agstar',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P5',
          loadSpeedRating: null,
          brand: {
            image: null,
            label: 'Continental',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P6',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'Achilles',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'Achilles',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P7',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'AG-Dura',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'AG-Dura',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
        {
          type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          name: 'P8',
          loadSpeedRating: null,
          brand: {
            image: {
              altText: 'Advanta',
              height: 20,
              src:
                'https://images.simpletire.com/image/upload/v1593195322/manf-logos/452b.svg',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 120,
            },
            label: 'Advanta',
          },
          priceList: [
            {
              label: null,
              price: {
                estimatedRetailPriceInCents: '12099',
                salePriceInCents: '12099',
              },
            },
          ],
          rating: null,
          link: {
            href: '/bridgestone-tires/dueler-a-t-revo-3?size=p215-75-r16',
            isExternal: false,
          },
          imageList: [
            {
              image: {
                type: ICON_IMAGE_TYPE.IMAGE,
                src:
                  'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
                altText: 'Tire sidewall',
                width: 800,
                height: 800,
              },
              productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
            },
          ],
          highlight: null,
          gridAttribute: null,
          topPicksAttribute: null,
          siteCatalogPromotionInfo: null,
          size: '215/50 R17',
          specList: [
            {
              label: 'Type',
              value: 'All Season',
              concise: 'All Season',
            },
            {
              label: 'Warranty',
              value: '60k mi',
              concise: '60k mi warranty',
            },
            {
              label: 'Speed',
              value: 'T',
              concise: 'Speed rating: T',
            },
            {
              label: 'Load',
              value: 'XL (PLY 4)',
              concise: 'Load: XL (PLY 4)',
            },
            {
              label: 'UTQG',
              value: '700 AB',
              concise: '700 AB UTQG',
            },
            {
              label: 'Sidewall',
              value: 'Blackwall',
              concise: 'Blackwall',
            },
          ],
          performanceRatingList: [
            {
              label: 'Dry',
              value: 5,
            },
            {
              label: 'Wet',
              value: 5,
            },
            {
              label: 'Snow',
              value: 3,
            },
            {
              label: 'Comfort',
              value: 3.7,
            },
            {
              label: 'Noise',
              value: 5,
            },
            {
              label: 'Treadwear',
              value: 4.5,
            },
          ],
          activeFilterValueList: [],
          deliveryInfo: {
            value: '3-day delivery',
            isFeatured: false,
          },
          dataMomentList: [],
        },
      ],
      siteQueryParams: null,
    },
  ],
  siteProductSpecs: [
    {
      name: 'Type',
      values: ['All season'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra erat feugiat, sodales sapien non, dictum lacus. Donec a libero.',
      cta: {
        label: 'Browse All Season tires',
        link: {
          href: '/catalog/all-season',
          isExternal: false,
        },
      },
    },
    {
      name: 'Warranty',
      values: ['55,000 miles'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra erat feugiat, sodales sapien non, dictum lacus. Donec a libero.',
      cta: null,
    },
  ],
  siteProductInsights: {
    rebate: {
      label: 'Save $80 instantly: Use coupon AS23RJ',
      siteDynamicModal: {
        title: '$80 Rebate',
        subtitle: 'Get up to $80 back with code AS23RJ',
        content:
          "* Valid for April 3 thru May 31, 2020.\n* Credit received on a VISA Prepaid Card\n\nWhen you purchase a set of four (4) select Hankook tires you may be eligible to receive up to a $80 VISA Prepaid Card after online rebate.  Available only on purchases from SimpleTire's in-stock inventory between 12:00 a.m. EDT April 3, 2020 and 11:59 p.m. EDT March 31, 2020.",
        image: {
          src: 'https://dummyimage.com/1600x900/000/f00.jpg',
          width: 1600,
          height: 900,
          altText: 'Risk-Free Guarantee',
          type: SiteImageNullableTypeEnum.SiteImage,
        },
        link: {
          label: 'Learn more',
          link: {
            href: '/about-us',
            isExternal: false,
          },
        },
        showSupportSection: true,
        type: 'SiteDynamicModal',
      },
    },
    delivery: 'Free 2-day shipping to Brooklyn, NY',
    siteProductInsightList: [
      {
        label: 'Best seller for Honda Civic',
        icon: {
          type: ICON_IMAGE_TYPE.ICON,
          svgId: 'fire',
        },
        sectionAnchor: null,
      },
    ],
  },
  siteProductLineAvailableSizeList: [
    {
      size: '100/40R15',
      loadSpeedRating: '89H',
      specList: [
        {
          label: 'UTQG',
          value: '700 AB',
        },
        {
          label: 'Sidewall',
          value: 'BW',
        },
        {
          label: 'Part Nr.',
          value: '15498150000',
        },
      ],
      priceInCents: '5999',
      rim: 15,
      isFitForCurrentVehicle: false,
      isSelected: false,
      partNumber: '00000000',
      siteQueryParams: {
        tireSize: '100-40r15',
      },
    },
    {
      size: '100/40R17',
      loadSpeedRating: '89H',
      specList: [
        {
          label: 'UTQG',
          value: '700 AB',
        },
        {
          label: 'Sidewall',
          value: 'BW',
        },
        {
          label: 'Part Nr.',
          value: '15498150000',
        },
      ],
      priceInCents: '6999',
      rim: 17,
      isFitForCurrentVehicle: true,
      isSelected: false,
      partNumber: '11111111',
      siteQueryParams: {
        tireSize: '100-40r17',
      },
    },
    {
      size: '200/40R17',
      loadSpeedRating: '89H',
      specList: [
        {
          label: 'UTQG',
          value: '700 AB',
        },
        {
          label: 'Sidewall',
          value: 'BW',
        },
        {
          label: 'Part Nr.',
          value: '15498150000',
        },
      ],
      priceInCents: '4999',
      rim: 17,
      isFitForCurrentVehicle: false,
      isSelected: false,
      partNumber: '12345678',
      siteQueryParams: {
        tireSize: '200-40r17',
      },
    },
  ],
};

export const siteProductReviewsMock: SiteProductReviews = {
  listResultMetadata: {
    noExactMatch: false,
    pagination: { total: 15, resultsPerPage: 10, offset: 0 },
  },
  performanceRating: {
    overall: 4.9,
    ratingList: [
      { label: 'Dry', value: 5 },
      { label: 'Wet', value: 5 },
      { label: 'Winter', value: 2.7 },
      { label: 'Comfort', value: 4.8 },
      { label: 'Noise', value: 3.5 },
      { label: 'Treadwear', value: 3.7 },
    ],
  },
  reviewsSource: { simpleTire: 115, googleShopping: 72 },
  dataMomentList: [
    { label: "Honda Civic's ranking", value: '1st in popularity' },
    { label: 'Would you buy again', value: '98%' },
  ],
  reviewsList: [
    {
      purchaseDate: null,
      name: 'Joe',
      vehicle: null,
      address: null,
      verifiedCustomer: true,
      additionalComments: null,
      dataMomentList: [
        { label: 'Would you buy again', value: 'Yes' },
        { label: 'Annual mileage', value: '20,000 - 29,000' },
        { label: 'Driving style', value: 'Cautious' },
        { label: 'Annual mileage', value: '20,000 - 29,000' },
        { label: 'Driving location', value: 'Mostly City' },
      ],
      performanceRating: {
        overall: 4.9,
        ratingList: [
          { label: 'Dry', value: 5 },
          { label: 'Wet', value: 5 },
          { label: 'Winter', value: 2.7 },
          { label: 'Comfort', value: 4.8 },
          { label: 'Noise', value: 3.5 },
          { label: 'Treadwear', value: 3.7 },
        ],
      },
    },
    {
      purchaseDate: '01/12/2020',
      name: 'Victor',
      vehicle: 'Honda Civic 2015 EX-L',
      address: 'San Francisco, CA',
      verifiedCustomer: true,
      additionalComments:
        'Excellent tire and great smooth ride and handling ability.',
      dataMomentList: [
        { label: 'Would you buy again', value: 'Yes' },
        { label: 'Annual mileage', value: '20,000 - 29,000' },
        { label: 'Driving style', value: 'Cautious' },
        { label: 'Annual mileage', value: '20,000 - 29,000' },
        { label: 'Driving location', value: 'Mostly City' },
      ],
      performanceRating: {
        overall: 4.9,
        ratingList: [
          { label: 'Dry', value: 5 },
          { label: 'Wet', value: 5 },
          { label: 'Winter', value: 2.7 },
          { label: 'Comfort', value: 4.8 },
          { label: 'Noise', value: 3.5 },
          { label: 'Treadwear', value: 3.7 },
        ],
      },
    },
  ],
};
