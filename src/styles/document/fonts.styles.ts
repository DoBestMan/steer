interface Props {
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  source: string;
}

const fontFace = (props: Props): string => {
  const { fontFamily, fontStyle, fontWeight, source } = props;

  return `
    @font-face {
      font-family: "${fontFamily}";
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      src: url('${source}.woff') format('woff'),
        url('${source}.woff2') format('woff2'),
        url('${source}.ttf') format('truetype');
    }
  `;
};

export const fonts = `
  ${fontFace({
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: 'normal',
    source: '/static/fonts/CircularStd-Book',
  })}

  ${fontFace({
    fontFamily: 'Circular Std',
    fontStyle: 'italic',
    fontWeight: 'normal',
    source: '/static/fonts/CircularStd-BookItalic',
  })}

  ${fontFace({
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: 'bold',
    source: '/static/fonts/CircularStd-Bold',
  })}

  ${fontFace({
    fontFamily: 'Circular Std',
    fontStyle: 'italic',
    fontWeight: 'bold',
    source: '/static/fonts/CircularStd-BoldItalic',
  })}
`;

export const globalFont = `
  body {
    font-family: "Circular Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
  }`;
