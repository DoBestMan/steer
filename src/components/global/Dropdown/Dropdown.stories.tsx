import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { useCallback, useState } from 'react';

import { typography } from '~/styles/typography.styles';

import Button from '../Button/Button';
import { ActionBarProps } from './ActionBar';
import Dropdown from './Dropdown';

export default {
  component: Dropdown,
  title: 'Global/Dropdown',
};

export function DropdownWithKnobs() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const forceModal = boolean('Force modal on desktop', false);
  const hasActionBar = boolean('Has action bar?', true);
  const actionBarPrimary = text('Primary button label', 'Primary');
  const actionBarSecondary = text(
    'Secondary button label (optional)',
    'Secondary',
  );
  const actionBar: ActionBarProps | null = hasActionBar
    ? {
        onClickPrimary: action('click-action-bar-primary'),
        onClickSecondary: action('click-action-bar-secondary'),
        primaryLabel: actionBarPrimary,
        secondaryLabel: actionBarSecondary,
      }
    : null;
  const content = text(
    'Content',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  );

  return (
    <div css={{ padding: 10 }}>
      <Button
        onClick={toggleIsOpen}
        aria-expanded={isOpen}
        className="dropdown-button"
      >
        {isOpen ? 'Dropdown opened' : 'Open dropdown'}
      </Button>
      <Dropdown
        actionBar={actionBar}
        contentLabel="modal"
        forceModal={forceModal}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div css={typography.copyBody}>{content}</div>
      </Dropdown>
    </div>
  );
}
