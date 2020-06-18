import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import CatalogMessage from '../CatalogMessage/CatalogMessage';
import { DEFAULT_SCENERY, DEFAULT_VEHICLE } from './CatalogSummary.constants';
import Background from './components/Background';
import Car from './components/Car';
import Content from './components/Content';
import Overlay from './components/Overlay';
import Scenery from './components/Scenery';
import VehicleContainer from './components/VehicleContainer';

function CatalogSummary() {
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

  return (
    <>
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
            <img
              aria-hidden
              className="back-wheel-img"
              src="/images/default-tire.svg"
            />
          </VehicleContainer>
        </Overlay>
      </Background>

      <Content data-component="Content" stage={contentStage}>
        <CatalogMessage data-component="MessageContainer" />
      </Content>
    </>
  );
}

export default CatalogSummary;
