import { MouseEventHandler, ReactChild } from 'react';

interface Props {
  children: ReactChild;
  onClick: MouseEventHandler;
  tabIndex?: number;
}

function Button(props: Props) {
  const { children, onClick, ...rest } = props;

  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;