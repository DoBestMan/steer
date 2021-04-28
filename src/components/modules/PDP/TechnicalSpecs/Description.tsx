import React, { useCallback, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { MARKDOWN_PRIMITIVES } from '~/lib/constants/markdown';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Description.styles';

interface Props {
  description: string;
  secondaryDescription: string;
}

function Description({ description, secondaryDescription }: Props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleFullDescription = useCallback(() => {
    setShowFullDescription(!showFullDescription);
  }, [showFullDescription, setShowFullDescription]);

  const splitDescription = description.split(/\n\n/g);
  const briefDescription = splitDescription[0];
  const moreDescription =
    splitDescription.length > 1 && splitDescription.slice(1).join('\n\n');
  const moreDescriptionId = 'technical-specs-more-description';
  return (
    <>
      <Markdown
        css={styles.markdown}
        allowedTypes={MARKDOWN_PRIMITIVES}
        unwrapDisallowed
      >
        {briefDescription}
      </Markdown>
      {moreDescription && (
        <>
          <div
            id={moreDescriptionId}
            aria-hidden={!showFullDescription}
            css={styles.moreDescription}
          >
            <Markdown css={styles.markdown}>{moreDescription}</Markdown>
            <Markdown css={styles.secondaryDescription}>
              {secondaryDescription}
            </Markdown>
          </div>
          <button
            aria-expanded={showFullDescription}
            aria-labelledby={moreDescriptionId}
            aria-controls={moreDescriptionId}
            onClick={toggleFullDescription}
            css={styles.showFullDescription}
          >
            {showFullDescription
              ? ui('pdp.technicalSpecs.hideFullDescription')
              : ui('pdp.technicalSpecs.showFullDescription')}
            <Icon
              name={showFullDescription ? ICONS.CHEVRON_UP : ICONS.CHEVRON_DOWN}
              css={styles.showFullDescriptionIcon}
            />
          </button>
        </>
      )}
    </>
  );
}

export default Description;
