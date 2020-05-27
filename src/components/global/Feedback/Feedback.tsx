import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { BUTTON_STYLE, BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Feedback.styles';
import {
  ACTIONS,
  FeedbackActionProps,
  FeedbackStatesProps,
  STATES,
} from './Feedback.types';
import { injectFeedbackifyScript } from './Feedback.utils';

const FEEDBACK_STATE: { [name: string]: FeedbackStatesProps } = {
  [STATES.DEFAULT]: {
    label: ui('common.feedback.defaultMessageLabel'),
    icon: ICONS.SMILEY,
    actions: [
      {
        label: ui('common.feedback.yes'),
        action: ACTIONS.GO_TO_YES,
      },
      {
        label: ui('common.feedback.no'),
        action: ACTIONS.GO_TO_NO,
      },
    ],
  },
  [STATES.NEGATIVE]: {
    icon: ICONS.SMILEY_CONCERNED,
    label: ui('common.feedback.negativeMessageLabel'),
    actions: [
      {
        label: ui('common.feedback.contact'),
        action: ACTIONS.GO_TO_CONTACT,
        href: '/contact',
      },
      {
        label: ui('common.feedback.giveFeedback'),
        action: ACTIONS.OPEN_FEEDBACK,
      },
    ],
  },
  [STATES.POSITIVE]: {
    label: ui('common.feedback.positiveMessageLabel'),
    icon: ICONS.SMILEY_WINK,
    actions: [
      {
        label: ui('common.feedback.giveFeedback'),
        action: ACTIONS.OPEN_FEEDBACK,
      },
    ],
  },
};

function Feedback() {
  const [state, setState] = useState(STATES.DEFAULT);
  const { actions, icon, label } = FEEDBACK_STATE[state];

  const events: { [name: string]: () => void } = {
    [ACTIONS.GO_TO_YES]: () => setState(STATES.POSITIVE),
    [ACTIONS.GO_TO_NO]: () => setState(STATES.NEGATIVE),
    [ACTIONS.OPEN_FEEDBACK]: injectFeedbackifyScript,
  };

  return (
    <div css={styles.container}>
      <Icon name={icon} css={styles.icon} />
      <h3 css={styles.label}>{label}</h3>

      <div css={styles.buttonContainer}>
        {actions.map((action: FeedbackActionProps) => (
          <Button
            as={action.href ? 'a' : 'button'}
            css={styles.button}
            key={action.label}
            style={BUTTON_STYLE.OUTLINED}
            theme={BUTTON_THEME.LIGHT}
            {...(action.href
              ? { href: action.href }
              : { onClick: events[action.action] })}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
