import dynamic from 'next/dynamic';

import { Props as CarouselProps } from './CarouselDynamic';

const CarouselDynamic = dynamic(() => import('./CarouselDynamic'));

function Carousel({ children, ...rest }: CarouselProps) {
  return <CarouselDynamic {...rest}>{children}</CarouselDynamic>;
}

export default Carousel;
