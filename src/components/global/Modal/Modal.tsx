import dynamic from 'next/dynamic';

import { Props } from './Modal.types';

const ModalDynamic = dynamic(() => import('./ModalDynamic'));

function Modal({ children, ...rest }: Props) {
  return <ModalDynamic {...rest}>{children}</ModalDynamic>;
}

export default Modal;
