import { ReactChild } from 'react';
// import { ReactMarkdownProps } from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

import { styles } from './Markdown.styles';

interface Props extends ReactMarkdownProps {
  children: ReactChild;
}

function Markdown({ children, ...rest }: Props) {
  return (
    <div css={styles.defaultStyles}>
      <ReactMarkdownWithHtml {...rest} escapeHtml={false}>
        {children}
      </ReactMarkdownWithHtml>
    </div>
  );
}

export default Markdown;
