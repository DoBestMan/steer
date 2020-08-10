import { useEffect } from 'react';

import Button from '~/components/global/Button/Button';
import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { BUTTON_STYLE, LINK_TYPES } from '~/lib/constants';
import GA from '~/lib/helpers/analytics';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './ErrorPage.styles';

interface Props {
  copy?: string | JSX.Element;
  description: string;
  errorCode: string | number;
  hasHomeButton?: boolean;
}

function ErrorPage({ copy, description, errorCode, hasHomeButton }: Props) {
  // Push event to GA dataLayer if 404
  useEffect(() => {
    if (errorCode === 404 || errorCode === '404') {
      GA.addToDataLayer({
        event: 'is404',
        page: document.location.pathname,
      });
    }
  }, [errorCode]);

  return (
    <div css={[styles.root, navigationPaddingTop]}>
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          css={styles.header}
        >
          <h1 css={styles.title}>{errorCode}</h1>
          <div css={styles.content}>
            <p css={styles.description}>
              <Markdown renderers={{ paragraph: 'span' }}>
                {description}
              </Markdown>
            </p>

            {copy && <p css={styles.copy}>{copy}</p>}

            {hasHomeButton && (
              <Button
                href={'/'}
                as={LINK_TYPES.A}
                css={styles.button}
                style={BUTTON_STYLE.SOLID}
              >
                {ui('error.homeButtonLabel')}
              </Button>
            )}
          </div>
        </GridItem>

        <PageIllustration carId={CARS[CARS_KEYS.LUXURY]} />
      </Grid>
    </div>
  );
}

export default ErrorPage;
