interface Props {
  fontFamily: string;
  fontWeigth: string;
  fontStyle: string;
  source: string;
}

const fontFace = (props: Props): string => {
  const { fontFamily, fontStyle, fontWeigth, source } = props;

  return `
    @font-face {
      font-family: "${fontFamily}";
      font-style: ${fontStyle};
      font-weight: ${fontWeigth};
      src: url('${source}.woff') format('woff'),
        url('${source}.woff2') format('woff2'),
        url('${source}.ttf') format('truetype');
    }
  `;
};

export const fonts = `
  ${fontFace({
    fontFamily: 'Circular Std',
    fontWeigth: 'normal',
    fontStyle: 'normal',
    source: '/static/fonts/CircularStd-Book',
  })}

  ${fontFace({
    fontFamily: 'Circular Std',
    fontWeigth: 'normal',
    fontStyle: 'italic',
    source: '/static/fonts/CircularStd-BookItalic',
  })}

  ${fontFace({
    fontFamily: 'Circular Std',
    fontWeigth: 'bold',
    fontStyle: 'normal',
    source: '/static/fonts/CircularStd-Bold',
  })}

  ${fontFace({
    fontFamily: 'Circular Std',
    fontWeigth: 'bold',
    fontStyle: 'italic',
    source: '/static/fonts/CircularStd-BoldItalic',
  })}
`;
