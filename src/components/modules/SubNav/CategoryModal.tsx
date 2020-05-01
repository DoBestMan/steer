import { ReactChild } from 'react';
import ReactModal from 'react-modal';

interface Props {
  children: ReactChild;
  isOpen: boolean;
}

function CategoryModal({ children, isOpen }: Props) {
  return <ReactModal isOpen={isOpen}>{children}</ReactModal>;
}

export default CategoryModal;
