import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { IconOrImage as IconOrImageProps } from '~/data/models/IconOrImage';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './InsightRebate.styles';

export interface InsightsRebateProps {
  couponCode: string;
  icon: IconOrImageProps;
  label: string;
}

function InsightRebate({ couponCode, icon, label }: InsightsRebateProps) {
  const [copySuccess, setCopySuccess] = useState('Copy code');

  const copyToClipBoard = async (couponCode: string) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div css={[styles.container]}>
      <span css={styles.icon} aria-hidden>
        {icon && <IconOrImage {...icon} />}
      </span>
      <Grid>
        <GridItem gridColumn="1/4" gridColumnL="1/7">
          <Markdown renderers={{ paragraph: 'span' }} css={styles.label}>
            {label}
          </Markdown>
          <div css={styles.label}>
            {ui('pdp.insightRebate.useCode')} {couponCode}
          </div>
        </GridItem>
        <GridItem
          gridColumn="4/7"
          gridColumnL="7/14"
          css={styles.buttonWrapper}
        >
          <Button
            onClick={() => copyToClipBoard(couponCode)}
            css={styles.copyCodeButton}
            theme={THEME.ORANGE}
          >
            {copySuccess}
          </Button>
        </GridItem>
      </Grid>
      <Icon name={ICONS.CHEVRON_RIGHT} css={styles.chevron} ssWidth={22} />
    </div>
  );
}

export default InsightRebate;
