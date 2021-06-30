import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconName } from '~/components/global/Icon/Icon.types';
import { isClient } from '~/lib/helpers/browser';

import styles from './AccountSection.styles';

interface Props {
  description: string;
  href: string;
  icon: IconName;
  index: number;
  isExternal: boolean;
  numberOfElements: number;
  title: string;
}
export default function AccountSection({
  index,
  title,
  description,
  icon,
  numberOfElements,
  href,
  isExternal,
}: Props) {
  const [sectionHoveredIndex, setHoveredState] = useState<number | null>(null);
  const isLastElement = index === numberOfElements - 1;
  const isSectionHovered = sectionHoveredIndex === index;
  const router = useRouter();

  const handleHover = (e: MouseEvent<HTMLButtonElement>) => {
    const targetValue = e.currentTarget.name;
    setHoveredState(Number(targetValue));
  };

  const handleRedirect = () => {
    if (isExternal) {
      if (isClient()) {
        window.location.href = href;
      }
    } else {
      router.push({ pathname: href });
    }
  };

  return (
    <>
      <button
        css={styles.buttonContainer}
        name={String(index)}
        onMouseOver={handleHover}
        onMouseOut={() => setHoveredState(null)}
        onClick={handleRedirect}
      >
        <div css={styles.container}>
          <div css={styles.titleContainer}>
            <h3 css={[styles.title, isSectionHovered && styles.hoveredText]}>
              {title}
            </h3>
            <p css={styles.description}>{description}</p>
          </div>
          <div css={styles.iconContainer}>
            <Icon
              name={icon}
              css={[styles.icon, isSectionHovered && styles.hoveredText]}
            />
          </div>
        </div>
        {!isLastElement && <div css={styles.linebreaker} />}
      </button>
    </>
  );
}
