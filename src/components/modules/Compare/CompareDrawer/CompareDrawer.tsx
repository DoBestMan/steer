import { useCallback, useEffect, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Button from '~/components/global/Button/Button';
import Drawer from '~/components/global/Drawer/Drawer';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Notification from '~/components/global/NotificationBanner/Notification';
import { SiteCatalogProductItem } from '~/data/models//SiteCatalogProductItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { THEME, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { NUMBER_OF_TIRES } from '../Compare.constants';
import ListToCompare from '../ListToCompare/ListToCompare';
import styles, { tStyles } from './CompareDrawer.styles';

interface Props {
  hide: boolean;
  isDisabled?: boolean;
  onAddTire: () => void;
  onClose: () => void;
  onCompare: () => void;
  onRemove: (productId: string) => void;
  onToggle?: () => void;
  open: boolean;
  productList: SiteCatalogProductItem[];
  setRemovingProductIndex: (index: number) => void;
  setShowDupAlert: (value: boolean) => void;
  showDupAlert: boolean;
  subtitle: string;
  title: string;
}

const INIT_HEIGHT = 85;
function CompareDrawer({
  hide,
  title,
  subtitle,
  open,
  onClose,
  onToggle,
  isDisabled = false,
  productList,
  onRemove,
  onAddTire,
  onCompare,
  setRemovingProductIndex,
  showDupAlert,
  setShowDupAlert,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [render, setRender] = useState(!hide);

  const { is } = useBreakpoints();
  const [theme, setTheme] = useState<THEME.ORANGE | THEME.LIGHT>(THEME.ORANGE);

  const toggleHandler = () => {
    onToggle && onToggle();
  };
  const handleNotificationClick = () => {
    setShowDupAlert(false);
  };

  const slideTo = useCallback(
    (index: number) => {
      if (swiper) {
        swiper.slideTo(index);
      }
    },
    [swiper],
  );

  useEffect(() => {
    const interval = open ? TIME.MS100 : TIME.MS500;
    const theme = open ? THEME.LIGHT : THEME.ORANGE;

    const timerId = setTimeout(() => {
      setTheme(theme);
    }, interval);

    return () => {
      clearTimeout(timerId);
    };
  }, [open]);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.on('slideChangeTransitionEnd', () => {
      setCurrentIndex(swiper.activeIndex);
    });

    return () => {
      swiper.off('slideChange');
    };
  }, [swiper]);

  useEffect(() => {
    if (!hide) {
      setRender(true);
    }
  }, [hide]);

  const onAnimationEnd = () => {
    if (hide) {
      setRender(false);
    }
  };

  const header = (
    <div css={[styles.header, tStyles[theme].header]}>
      <div>
        <h3 css={styles.title}>{title}</h3>
        <p css={styles.subtitle}>{subtitle}</p>
      </div>
      <button css={styles.button} onClick={toggleHandler}>
        <span>
          {open ? ui('catalog.compare.hide') : ui('catalog.compare.show')}
        </span>
        {open ? (
          <Icon name={ICONS.CHEVRON_DOWN} />
        ) : (
          <Icon name={ICONS.CHEVRON_UP} />
        )}
      </button>
    </div>
  );

  if (!render) {
    return null;
  }

  return (
    <div css={hide && styles.hideAnimation} onAnimationEnd={onAnimationEnd}>
      <Drawer
        id="compare-drawer"
        anchor="bottom"
        open={open}
        onClose={onClose}
        header={header}
        containerStyle={[
          styles.drawer,
          tStyles[theme].drawer,
          is.XL ? styles.bigScreen : [],
        ]}
        initialPosition={INIT_HEIGHT}
      >
        <div css={styles.content}>
          <div css={styles.carousel}>
            <div css={styles.notification}>
              {productList.length > NUMBER_OF_TIRES.MAX && (
                <Notification
                  icon={{
                    svgId: ICONS.BELL,
                    type: ICON_IMAGE_TYPE.ICON,
                  }}
                  id="max-alert-in-compare-drawer"
                  subtext={ui('catalog.compare.notification.maxAlert.subtext')}
                  title={ui('catalog.compare.notification.maxAlert.title')}
                  type="Sale"
                  sessionExpiryTime={2}
                  suppressFromHomePage={false}
                  theme={THEME.ORANGE}
                />
              )}
              {showDupAlert && (
                <Notification
                  icon={{
                    svgId: ICONS.BELL,
                    type: ICON_IMAGE_TYPE.ICON,
                  }}
                  id="dup-alert-compare-drawer"
                  subtext={ui('catalog.compare.notification.dupAlert.subtext')}
                  title={ui('catalog.compare.notification.dupAlert.title')}
                  type="Sale"
                  sessionExpiryTime={2}
                  suppressFromHomePage={false}
                  theme={THEME.ORANGE}
                  handleNotificationClick={handleNotificationClick}
                />
              )}
            </div>
            <ListToCompare
              productList={productList}
              onRemove={onRemove}
              onAddTire={onAddTire}
              setRemovingProductIndex={setRemovingProductIndex}
              hasAddTire
              setSwiper={setSwiper}
              activeCarouselIndex={currentIndex}
              onChangeActiveIndex={slideTo}
            />
          </div>
          <div css={styles.buttonWrapper}>
            <Button
              isDisabled={isDisabled}
              onClick={onCompare}
              css={styles.compareButton}
              aria-label={ui('catalog.compare.compare') + productList.length}
              data-testid={ui('catalog.compare.compare') + productList.length}
            >
              {ui('catalog.compare.compare')}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default CompareDrawer;
