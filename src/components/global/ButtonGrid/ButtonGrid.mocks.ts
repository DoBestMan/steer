import { ButtonProps } from '~/components/global/Button/Button';
import { LINK_TYPES } from '~/lib/constants';

const handleButtonClick = () => {
  //button handler
};
const children = 'Button Label';
export const ButtonGridMockData: Array<ButtonProps> = [
  {
    as: LINK_TYPES.BUTTON,
    children,
    onClick: handleButtonClick,
    isDisabled: false,
  },
  {
    as: LINK_TYPES.BUTTON,
    onClick: handleButtonClick,
    children,
    isDisabled: false,
  },
  {
    as: LINK_TYPES.BUTTON,
    onClick: handleButtonClick,
    children,
    isDisabled: false,
  },
  {
    as: LINK_TYPES.BUTTON,
    onClick: handleButtonClick,
    children,
    isDisabled: false,
  },
  {
    as: LINK_TYPES.BUTTON,
    onClick: handleButtonClick,
    children,
    isDisabled: false,
  },
  {
    as: LINK_TYPES.A,
    children,
    href: '/',
    isDisabled: false,
    onClick: handleButtonClick,
  },
  {
    as: LINK_TYPES.A,
    children,
    href: '/about',
    isDisabled: false,
    onClick: handleButtonClick,
  },
  {
    as: LINK_TYPES.A,
    children,
    href: '/about',
    isDisabled: false,
    onClick: handleButtonClick,
  },
];
