import { Icon } from '~/components/global/Icon/Icon.types';

export interface FeedbackActionProps {
  action: string;
  href?: string;
  isButton?: boolean;
  label: string;
}

export interface FeedbackStatesProps {
  actions: FeedbackActionProps[];
  icon: Icon;
  label: string;
}

export enum STATES {
  DEFAULT = 'default',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
}

export enum ACTIONS {
  GO_TO_CONTACT = 'go-to-contact',
  GO_TO_NO = 'go-to-no',
  GO_TO_YES = 'go-to-yes',
  OPEN_FEEDBACK = 'open-feedback',
}
