import dynamic from 'next/dynamic';
import { ReactChild } from 'react';

const MarkdownDynamic = dynamic(() => import('./MarkdownDynamic'));

interface Props {
  children: ReactChild;
}

function Markdown({ children }: Props) {
  return <MarkdownDynamic>{children}</MarkdownDynamic>;
}

export default Markdown;
