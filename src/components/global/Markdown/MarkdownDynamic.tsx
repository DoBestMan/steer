import { ReactChild } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  children: ReactChild;
}

function Markdown({ children }: Props) {
  return <ReactMarkdown escapeHtml={false}>{children}</ReactMarkdown>;
}

export default Markdown;
