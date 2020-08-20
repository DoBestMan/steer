import { Breakpoint, BREAKPOINTS } from '~/lib/constants';

export const NB_SLIDES_PER_BP: Record<Breakpoint, number> = {
  S: 1,
  M: 1,
  L: 1,
  XL: 4,
};

export const SPEED_PER_BP: Record<Breakpoint, number> = {
  S: 3,
  M: 5,
  L: 6,
  XL: 6,
};

export const CAROUSEL_PARAMS = {
  // Could use slidesPerView: NB_SLIDES_PER_BP[bp.bk], but seems better this way
  // Adding  bunch of "extra" breakpoint because `spaceBetween` needs a fixed width
  breakpoints: {
    [BREAKPOINTS.S]: {
      slidesPerView: NB_SLIDES_PER_BP.S,
      spaceBetween: -150,
    },
    [320]: {
      slidesPerView: NB_SLIDES_PER_BP.S,
      spaceBetween: -100,
    },
    [375]: {
      slidesPerView: NB_SLIDES_PER_BP.S,
      spaceBetween: -150,
    },
    [450]: {
      slidesPerView: NB_SLIDES_PER_BP.S,
      spaceBetween: -230,
    },
    [500]: {
      slidesPerView: NB_SLIDES_PER_BP.S,
      spaceBetween: -250,
    },
    [BREAKPOINTS.M]: {
      slidesPerView: NB_SLIDES_PER_BP.M,
      spaceBetween: -250,
    },
    [650]: {
      slidesPerView: NB_SLIDES_PER_BP.M,
      spaceBetween: -300,
    },
    [750]: {
      slidesPerView: NB_SLIDES_PER_BP.M,
      spaceBetween: -350,
    },
    [850]: {
      slidesPerView: NB_SLIDES_PER_BP.M,
      spaceBetween: -400,
    },
    [920]: {
      slidesPerView: NB_SLIDES_PER_BP.M,
      spaceBetween: -450,
    },
    [BREAKPOINTS.L]: {
      slidesPerView: NB_SLIDES_PER_BP.L,
      spaceBetween: -500,
    },
    [1024]: {
      slidesPerView: NB_SLIDES_PER_BP.L,
      spaceBetween: -510,
    },
    [1100]: {
      slidesPerView: NB_SLIDES_PER_BP.L,
      spaceBetween: -550,
    },
    [BREAKPOINTS.XL]: {
      slidesPerView: NB_SLIDES_PER_BP.XL,
      spaceBetween: 0,
    },
  },
  centeredSlides: true,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  longSwipesMs: 50,
  longSwipesRatio: 0.1,
  mousewheel: {
    forceToAxis: true,
  },
  on: {
    init() {
      // give manually role attributes
      const carouselContainerEl = document.querySelector(
        '#top-picks-carousel .swiper-wrapper',
      );
      if (carouselContainerEl) {
        carouselContainerEl.setAttribute('role', 'menubar');
      }

      const carouselSlideEls = document.querySelectorAll(
        '#top-picks-carousel .swiper-slide',
      );
      for (let i = 0; i < carouselSlideEls.length; i++) {
        carouselSlideEls[i].setAttribute('role', 'menuitem');
      }
    },
  },
  shortSwipes: false,
  shouldSwiperUpdate: true,
  slideToClickedSlide: true,
};
