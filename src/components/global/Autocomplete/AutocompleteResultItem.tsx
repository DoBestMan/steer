import { ReactNode } from 'react';

export type AutocompleteResult = {
  main: string;
  secondary: string;
};

interface Props {
  children: ReactNode;
  id?: string;
  role?: string;
}

function AutocompleteResultsItem({ children, id, ...rest }: Props) {
  return (
    <li id={id} {...rest}>
      {children}
    </li>
  );
}

export default AutocompleteResultsItem;
