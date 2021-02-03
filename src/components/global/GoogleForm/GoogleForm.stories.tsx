import { number, text } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import GoogleForm from './GoogleForm';

export default {
  component: GoogleForm,
  title: 'Global/GoogleForm',
};

export function GoogleFormWithKnobs() {
  const formId = text(
    'Unique Form Id',
    '1FAIpQLScUGP2dDoKs13oYvXQaSO8GtpQdAkAycHVJlP9J5tZdAtZABA',
  );
  const height = number('Default Height', 1850);
  const mobileHeight = number('Mobile Height', 2200);
  return (
    <Grid>
      <GridItem gridColumnM="2/5" gridColumnL="2/10">
        <GoogleForm
          formId={formId}
          height={height}
          mobileHeight={mobileHeight}
        />
      </GridItem>
    </Grid>
  );
}
