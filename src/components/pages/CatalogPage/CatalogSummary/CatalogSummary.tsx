import Image from '~/components/global/Image/Image';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import CatalogMessage from '../CatalogMessage/CatalogMessage';
import {
  DEFAULT_IMAGE,
  DEFAULT_SCENERY,
  DEFAULT_VEHICLE,
} from './CatalogSummary.constants';
import Background from './components/Background';
import Car from './components/Car';
import Content from './components/Content';
import Overlay from './components/Overlay';
import Root from './components/Root';
import Scenery from './components/Scenery';
import VehicleContainer from './components/VehicleContainer';

interface Props {
  exploreMore: () => void;
}

function CatalogSummary({ exploreMore }: Props) {
  const {
    catalogSummary,
    contentStage,
    showLoadingInterstitial,
    stage,
  } = useCatalogSummaryContext();

  const { bk } = useBreakpoints();

  const { siteCatalogSummaryMeta } = catalogSummary;

  const sceneryType = siteCatalogSummaryMeta?.sceneryType || DEFAULT_SCENERY;
  const carId = siteCatalogSummaryMeta?.vehicleType || DEFAULT_VEHICLE;
  const image = siteCatalogSummaryMeta?.tireImage || DEFAULT_IMAGE;

  return (
    <Root>
      <Background aria-hidden data-component="Background">
        <Scenery
          data-component="Scenery"
          sceneryID={sceneryType}
          stage={stage}
        />
        <Overlay data-component="Overlay" stage={stage}>
          <VehicleContainer
            data-component="VehicleContainer"
            showLoadingInterstitial={showLoadingInterstitial}
            stage={stage}
          >
            <Car
              bk={bk}
              carId={carId}
              data-component="Car"
              showLoadingInterstitial={showLoadingInterstitial}
              solid
              stage={stage}
            />
            <div className="back-wheel-img">
              <Image
                {...image}
                aria-hidden
                responsive
                widths={[175, 260, 230]}
              />
            </div>
          </VehicleContainer>
        </Overlay>
      </Background>

      <Content data-component="Content" stage={contentStage}>
        <CatalogMessage
          data-component="MessageContainer"
          exploreMore={exploreMore}
        />
      </Content>
    </Root>
  );
}

export default CatalogSummary;
