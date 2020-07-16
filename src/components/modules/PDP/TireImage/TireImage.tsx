import { useState } from 'react';

import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteCatalogProductImageTypeEnum } from '~/data/models/SiteCatalogProductImage';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import TireImageCarousel from './TireImageCarousel';
import TireImageZoom from './TireImageZoom';

interface Props extends Pick<SiteProductLine, 'assetList'> {
  brand: SiteCatalogBrand;
}

function TireImage({ brand, assetList }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { greaterThan } = useBreakpoints();
  const hasThumbs = greaterThan.M;
  const zoomImageList = assetList.filter(
    (item) =>
      item.type === SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  );

  // We need to track the two carousel states separately because
  // the zoom list doesn't include videos
  const [currentInlineIndex, setCurrentInlineIndex] = useState(0);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0);

  function findIndex(
    index: number,
    prevList: Props['assetList'],
    newList: Props['assetList'],
  ) {
    const selectedItem = prevList[index];
    const selectedZoomItem = newList.findIndex(
      (element) => element === selectedItem,
    );

    return selectedZoomItem;
  }

  function closeModal() {
    setCurrentInlineIndex(
      findIndex(currentZoomIndex, zoomImageList, assetList),
    );
    setIsModalOpen(false);
  }

  function openModal() {
    setCurrentZoomIndex(
      findIndex(currentInlineIndex, assetList, zoomImageList),
    );
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <TireImageCarousel
        hasThumbs={hasThumbs}
        assetList={assetList}
        handleClick={openModal}
        currentIndex={currentInlineIndex}
        setCurrentIndex={setCurrentInlineIndex}
      />
      <TireImageZoom
        brand={brand}
        handleClose={closeModal}
        assetList={zoomImageList}
        isModalOpen={isModalOpen}
        currentIndex={currentZoomIndex}
        setCurrentIndex={setCurrentZoomIndex}
      />
    </>
  );
}

export default TireImage;
