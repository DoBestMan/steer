import { useState } from 'react';

import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import TireImageCarousel from './TireImageCarousel';
import { ImageItemProps } from './TireImageCarouselItem';
import TireImageZoom from './TireImageZoom';

interface Props {
  brand: SiteCatalogBrand;
  imageList: ImageItemProps[];
}

function TireImage({ brand, imageList }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { greaterThan } = useBreakpoints();
  const hasThumbs = greaterThan.M;
  const zoomImageList = imageList.filter((item) => item.image);

  // We need to track the two carousel states separately because
  // the zoom list doesn't include videos
  const [currentInlineIndex, setCurrentInlineIndex] = useState(0);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0);

  function findIndex(
    index: number,
    prevList: Props['imageList'],
    newList: Props['imageList'],
  ) {
    const selectedItem = prevList[index];
    const selectedZoomItem = newList.findIndex(
      (element) => element === selectedItem,
    );

    return selectedZoomItem;
  }

  function closeModal() {
    setCurrentInlineIndex(
      findIndex(currentZoomIndex, zoomImageList, imageList),
    );
    setIsModalOpen(false);
  }

  function openModal() {
    setCurrentZoomIndex(
      findIndex(currentInlineIndex, imageList, zoomImageList),
    );
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <TireImageCarousel
        hasThumbs={hasThumbs}
        imageList={imageList}
        handleClick={openModal}
        currentIndex={currentInlineIndex}
        setCurrentIndex={setCurrentInlineIndex}
      />
      <TireImageZoom
        brand={brand}
        handleClose={closeModal}
        imageList={zoomImageList}
        isModalOpen={isModalOpen}
        currentIndex={currentZoomIndex}
        setCurrentIndex={setCurrentZoomIndex}
      />
    </>
  );
}

export default TireImage;
