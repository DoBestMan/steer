import { render } from '@testing-library/react';

import IconOrImage from './IconOrImage';
import { ICONS } from '../Icon/Icon.constants';

import { Image } from '~/lib/constants';

describe('IconOrImage', () => {
  test('icon', () => {
    const { container } = render(
      <IconOrImage svgId={ICONS.ARROW_RIGHT} type={Image.SVG} />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        <svg
          fill="#181818"
          height="12"
          viewBox="0 0 14 12"
          width="14"
        >
          <use
            xlink:href="#steer--arrow-right"
          />
        </svg>
      </span>
    `);
  });

  test('image', () => {
    const { container } = render(
      <IconOrImage
        srcSet="https://via.placeholder.com/150"
        altText="150x150 image"
        type={Image.BITMAP}
      />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <img
        alt="150x150 image"
        srcset="https://via.placeholder.com/150"
      />
    `);
  });
});
