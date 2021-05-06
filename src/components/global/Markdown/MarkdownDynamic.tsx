import { ReactChild, ReactElement } from 'react';
import { ReactMarkdownProps } from 'react-markdown';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

import { styles } from './Markdown.styles';

interface Props extends ReactMarkdownProps {
  children: ReactChild;
}

function Markdown({ children, ...rest }: Props) {
  // custom renderer for paragraph to indent first line when it's indented on contentful (starts with 2 spaces)
  const renderers = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paragraph(props: any) {
      return (
        <p>
          {props.children.map((elmt: ReactElement) => {
            if (elmt && elmt.props && elmt.props.value && !elmt.props.tag) {
              return elmt.props.value[0] === ' ' &&
                elmt.props.value[1] === ' ' &&
                elmt.props.value[2] !== ' ' ? (
                <span className="indented" key={elmt.key || undefined}>
                  {elmt}
                </span>
              ) : (
                elmt
              );
            } else {
              return elmt;
            }
          })}
        </p>
      );
    },
  };

  return (
    <div css={styles.defaultStyles}>
      <ReactMarkdownWithHtml renderers={renderers} {...rest} escapeHtml={false}>
        {children}
      </ReactMarkdownWithHtml>
    </div>
  );
}

export default Markdown;
