interface Props {
  altText: string;
  srcSet: string;
}

// TODO Lazy loading - WCS-44
// TODO Responsive images - WCS-63
function Image({ srcSet, altText, ...rest }: Props) {
  return <img srcSet={srcSet} alt={altText} {...rest} />;
}

export default Image;
