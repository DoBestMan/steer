import dynamic from 'next/dynamic';

import { Props as CarouselProps } from './CarouselDynamic';

const CarouselDynamic = dynamic(() => import('./CarouselDynamic'));

function Carousel({ children, activeSlide, ...rest }: CarouselProps) {
  return (
    <CarouselDynamic {...rest} activeSlide={activeSlide}>
      {children}
    </CarouselDynamic>
  );
}

export default Carousel;
