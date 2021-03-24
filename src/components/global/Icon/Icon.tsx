import { useEffect, useRef, useState } from 'react';

import { THEME } from '~/lib/constants/theme';
import { hasIntersectionObserver, isBrowser } from '~/lib/utils/browser';
import { layout } from '~/styles/layout.styles';

import { ICON_SIZES, ICON_TYPES, ICONS } from './Icon.constants';
import { ICONS_OTHER_MAP } from './Icon.others';
import { Icon as IconName, IconObject } from './Icon.types';
import IconImage from './IconImage';

interface Props {
  name: IconName;
  ssHeight?: number | string;
  ssWidth?: number;
  ssr?: boolean;
  theme?: THEME | false | null; // used with ssr to set color
}

function getIconKey(name: IconName): string | undefined {
  return Object.keys(ICONS).find((key) => ICONS[key] === name);
}

function getIconObject(name: IconName): IconObject | null {
  const key = getIconKey(name);

  if (key) {
    return ICON_SIZES[key];
  }

  return null;
}

function Icon({ name, ssr = false, theme, ...rest }: Props) {
  const iconContainerRef = useRef<HTMLSpanElement>(null);
  const [showIcon, setShowIcon] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const iconObject = getIconObject(name);

  useEffect(() => {
    if (!isClient && isBrowser()) {
      setIsClient(true);
    }

    if (!iconContainerRef.current || showIcon) {
      return;
    }

    // if no IO, no scroll animation.
    if (!hasIntersectionObserver()) {
      setShowIcon(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowIcon(true);
          }
        });
      },
      {
        rootMargin: '100%',
      },
    );

    observer.observe(iconContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [iconContainerRef, isClient, showIcon, setShowIcon]);

  function renderClientIcon() {
    if (!iconObject) {
      return null;
    }

    return (
      <span css={[layout.container, layout.centeredVertical]} {...rest}>
        <svg
          viewBox={`0 0 ${iconObject.w} ${iconObject.h}`}
          width={iconObject.w}
          height={iconObject.h}
        >
          <use xlinkHref={`#steer--${name}`}></use>
        </svg>
      </span>
    );
  }

  function renderServerIcon() {
    if (!ssr) {
      return renderClientIcon();
    }

    return <IconImage iconName={name} theme={theme} {...rest} />;
  }

  if (!iconObject) {
    if (process.env.NODE_ENV === 'development') {
      console.info(`<Icon />: ${name} is not part of the icon library`);
    }

    return null;
  }

  // Not in SVG Sprite
  if (iconObject.type === ICON_TYPES.OTHER) {
    const key = getIconKey(name);
    const IconComponent = key && ICONS_OTHER_MAP[key];

    return isClient ? (
      <span
        ref={iconContainerRef}
        css={[layout.container, layout.centeredVertical]}
        {...rest}
      >
        {showIcon && IconComponent}
      </span>
    ) : (
      renderServerIcon()
    );
  }

  return <>{isClient ? renderClientIcon() : renderServerIcon()}</>;
}

export default Icon;
