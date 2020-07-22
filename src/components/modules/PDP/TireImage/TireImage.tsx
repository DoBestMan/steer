import { useState } from 'react';

import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import {
  SiteCatalogProductImage,
  SiteCatalogProductImageProductImageTypeEnum,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import TireImageCarousel from './TireImageCarousel';
import TireImageZoom from './TireImageZoom';
import UnavailableImage from './UnavailableImage';

interface Props extends Pick<SiteProductLine, 'assetList'> {
  brand: SiteCatalogBrand;
}

function TireImage({ brand, assetList }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // We need to track the two carousel states separately because
  // the zoom list doesn't include videos
  const [currentInlineIndex, setCurrentInlineIndex] = useState(0);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0);

  const { greaterThan } = useBreakpoints();
  const isUnavailable = assetList.some(
    (item) =>
      item.type === SiteCatalogProductImageTypeEnum.SiteCatalogProductImage &&
      item.productImageType ===
        SiteCatalogProductImageProductImageTypeEnum.Unavailable,
  );

  if (isUnavailable) {
    const unavailableImage = assetList.find(
      (item) =>
        item.type === SiteCatalogProductImageTypeEnum.SiteCatalogProductImage &&
        item.productImageType ===
          SiteCatalogProductImageProductImageTypeEnum.Unavailable,
    ) as SiteCatalogProductImage;
    return <UnavailableImage image={unavailableImage.image} />;
  }

  const hasThumbs = greaterThan.M;
  const zoomImageList = assetList.filter(
    (item) =>
      item.type === SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  );

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
