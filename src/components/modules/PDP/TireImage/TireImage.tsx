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
  const [activeSlide, setActiveSlide] = useState<number | undefined>(undefined);
  const { greaterThan } = useBreakpoints();
  const hasThumbs = greaterThan.M;
  const zoomImageList = imageList.filter((item) => item.image);

  function findIndex(index: number) {
    const selectedItem = imageList[index];
    const selectedZoomItem = zoomImageList.findIndex(
      (element) => element === selectedItem,
    );

    setActiveSlide(selectedZoomItem);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal(index: number) {
    findIndex(index);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <TireImageCarousel
        activeSlide={activeSlide}
        hasThumbs={hasThumbs}
        imageList={imageList}
        handleClick={openModal}
      />
      <TireImageZoom
        activeSlide={activeSlide}
        brand={brand}
        handleClose={closeModal}
        imageList={zoomImageList}
        isModalOpen={isModalOpen}
      />
    </>
  );
}

export default TireImage;
