import { boolean, text } from '@storybook/addon-knobs';
import { ReactChild, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import ServiceNote from './ServiceNote';

export default {
  component: ServiceNote,
  title: 'Global/Service Note',
};

const styles: StylesMap = {
  paddingBottom: {
    paddingBottom: SPACING.SIZE_20,
  },
  root: [
    typography.bodyCopy,
    { paddingTop: SPACING.SIZE_20, position: 'relative' },
  ],
};

function serviceNoteDisclaimer() {
  return (
    <p css={styles.paddingBottom}>
      We want to test Service Note whether component is working properly <br />
      All service notes have close button at the top right.
    </p>
  );
}

function Container({ children }: { children: ReactChild[] }) {
  return (
    <Grid>
      <GridItem gridColumn="2/7" css={styles.root}>
        {children}
      </GridItem>
    </Grid>
  );
}

export function ServiceNoteWithClose() {
  const [isOpen, setOpen] = useState(false);

  const handleDismiss = () => {
    setOpen(false);
  };

  return (
    <Container>
      {serviceNoteDisclaimer()}
      <ServiceNote isOpen={boolean('Open', isOpen)} onDismiss={handleDismiss}>
        {text(
          'Service Note',
          'Service note: Due to high order volumes, phone support response times may be delayed. Submitting the form on this page is the best way to ask questions about your order. Thank you for your patience and understanding.',
        )}
      </ServiceNote>
    </Container>
  );
}
