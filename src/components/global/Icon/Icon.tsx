import { useEffect, useRef, useState } from 'react';

import { hasIntersectionObserver } from '~/lib/utils/browser';
import { layout } from '~/styles/layout.styles';

import { ICON_SIZES, ICON_TYPES, ICONS } from './Icon.constants';
import { ICONS_OTHER_MAP } from './Icon.others';
import { Icon as IconName, IconObject } from './Icon.types';

interface Props {
  name: IconName;
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

function Icon({ name, ...rest }: Props) {
  const iconContainerRef = useRef<HTMLSpanElement>(null);
  const [showIcon, setShowIcon] = useState(false);
  const iconObject = getIconObject(name);

  useEffect(() => {
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
  }, [iconContainerRef, showIcon, setShowIcon]);

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

    return (
      <span
        ref={iconContainerRef}
        css={[layout.container, layout.centeredVertical]}
        {...rest}
      >
        {showIcon && IconComponent}
      </span>
    );
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

export default Icon;
