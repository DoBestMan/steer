import Image from './Image';

export default {
  component: Image,
  title: 'Global/Image',
};

export function ImageWithHeightAndWidth() {
  return (
    <Image
      altText="test"
      srcSet="https://picsum.photos/600/300"
      height="300"
      width="600"
    />
  );
}

export function ImageResponsive() {
  return (
    <div css={{ width: '50%' }}>
      <Image
        altText="test"
        srcSet="https://dummyimage.com/800x400/000/f00.jpg 800w, https://dummyimage.com/1600x400/000/f00.jpg 1600w, https://dummyimage.com/3000x400/000/f00.jpg 3000w"
      />
    </div>
  );
}
