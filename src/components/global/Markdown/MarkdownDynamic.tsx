import { ReactChild } from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';

import { styles } from './Markdown.styles';

interface Props extends ReactMarkdownProps {
  children: ReactChild;
}

function Markdown({ children, ...rest }: Props) {
  return (
    <div css={styles.defaultStyles}>
      <ReactMarkdown escapeHtml={false} {...rest}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
