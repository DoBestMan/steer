import { ReactChild } from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';

interface Props extends ReactMarkdownProps {
  children: ReactChild;
}

function Markdown({ children, ...rest }: Props) {
  return (
    <ReactMarkdown escapeHtml={false} {...rest}>
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
