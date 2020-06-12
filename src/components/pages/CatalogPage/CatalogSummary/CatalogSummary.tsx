import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import CatalogMessage from '../CatalogMessage/CatalogMessage';
import { brands } from '../CatalogPage.constants';
import Background from './components/Background';
import Car from './components/Car';
import Content from './components/Content';
import Overlay from './components/Overlay';
import Scenery from './components/Scenery';
import VehicleContainer from './components/VehicleContainer';

interface Props {
  hasMultipleTireSizes: boolean;
  isSearch: boolean;
}

function CatalogSummary({ hasMultipleTireSizes, isSearch }: Props) {
  const { stage, setStage } = useCatalogSummaryContext();

  const { bk } = useBreakpoints();

  // TODO: Temp fix before mock data using correct asset ids.
  const sceneryType = 'scenery--rural' as Sceneries;
  const carId = Cars['car--sedan'];

  // TODO: Temp fix before mock data
  const messageData = {
    brands,
    hasMultipleTireSizes,
    setStage,
  };

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
            isSearch={isSearch}
            stage={stage}
          >
            <Car
              bk={bk}
              carId={carId}
              data-component="Car"
              isSearch={isSearch}
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
      <Content data-component="Content" stage={stage}>
        <CatalogMessage data-component="MessageContainer" {...messageData} />
      </Content>
    </>
  );
}

export default CatalogSummary;
