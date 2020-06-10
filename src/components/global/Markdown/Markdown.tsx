import dynamic from 'next/dynamic';
import { ReactChild } from 'react';
import { ReactMarkdownProps } from 'react-markdown';

const MarkdownDynamic = dynamic(() => import('./MarkdownDynamic'));

interface Props extends ReactMarkdownProps {
  children: ReactChild;
}

function Markdown({ children, ...rest }: Props) {
  return <MarkdownDynamic {...rest}>{children}</MarkdownDynamic>;
}

export default Markdown;
