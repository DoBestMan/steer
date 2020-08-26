import { FallbackProps } from 'react-error-boundary';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import { styles } from '~/components/modules/Nav/Nav.styles';
import { themes } from '~/components/modules/Nav/Nav.theme';
import ErrorPage from '~/components/pages/ErrorPage/ErrorPage';
import { ui } from '~/lib/utils/ui-dictionary';
import { layout } from '~/styles/layout.styles';

export default function GlobalErrorFallback(props: FallbackProps) {
  const errorCode = 500;
  const description = ui('error.generic');

  return (
    <>
      <Grid css={styles.root}>
        <GridItem css={[layout.container, styles.container]} gridColumn="2/4">
          <Image
            altText={ui('logo.alt')}
            css={styles.logo}
            src={themes.default.logoUrl}
          />
        </GridItem>
      </Grid>
      <ErrorPage
        errorCode={errorCode}
        description={description}
        hasRefreshButton
        errorMessage={props.error?.message}
      />
    </>
  );
}
