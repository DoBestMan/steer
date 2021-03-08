import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import { useTireSnapModalContext } from '~/components/modules/TireSnap/TireSnapModal.context';
import { SiteModuleSimpleSnapButton } from '~/data/models/SiteModules';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import simpleSnapStyles from './ModuleSimpleSnapButton.styles';

function ModuleSimpleSnapButton({
  buttonLabel,
  theme = THEME.ORANGE,
  style = BUTTON_STYLE.SOLID,
}: SiteModuleSimpleSnapButton) {
  const { setIsTireSnapOpen } = useTireSnapModalContext();
  const { isMobile } = useBreakpoints();

  return (
    <div
      data-component="module-simplesnapboardbutton"
      css={simpleSnapStyles.wrapper}
    >
      {isMobile ? (
        <Button
          type={'button'}
          onClick={() => setIsTireSnapOpen(true)}
          theme={theme}
          style={style}
          css={simpleSnapStyles.simpleSnapButtonSection}
        >
          {buttonLabel}
        </Button>
      ) : (
        <>
          <Grid>
            <GridItem fullbleed css={simpleSnapStyles.userInfo}>
              <Markdown>
                {ui('simpleSnap.simpleSnapButtonModule.userInfo')}
              </Markdown>
            </GridItem>
            <GridItem fullbleed>
              <SearchByBoard isHomepage hasBrand={false} />
            </GridItem>
          </Grid>
        </>
      )}
    </div>
  );
}

export default ModuleSimpleSnapButton;
