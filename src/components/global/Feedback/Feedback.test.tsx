import { fireEvent, render, screen } from '@testing-library/react';

import { ui } from '~/lib/utils/ui-dictionary';

import Feedback from './Feedback';

describe('Feedback', () => {
  it('expected initial render', () => {
    render(<Feedback />);

    expect(
      screen.queryByText(ui('common.feedback.defaultMessageLabel')),
    ).toBeInTheDocument();

    expect(screen.getByText(ui('common.feedback.yes'))).toBeInTheDocument();
    expect(screen.getByText(ui('common.feedback.no'))).toBeInTheDocument();
  });

  test('yes button flow - render success', () => {
    render(<Feedback />);

    const yesButton = screen.getByText(ui('common.feedback.yes'));

    fireEvent.click(yesButton);

    expect(
      screen.queryByText(ui('common.feedback.positiveMessageLabel')),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(ui('common.feedback.giveFeedback')),
    ).toBeInTheDocument();
  });

  test('no button flow - render success', () => {
    render(<Feedback />);

    const noButton = screen.getByText(ui('common.feedback.no'));

    fireEvent.click(noButton);

    expect(
      screen.queryByText(ui('common.feedback.negativeMessageLabel')),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(ui('common.feedback.contact')),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(ui('common.feedback.giveFeedback')),
    ).toBeInTheDocument();
  });
});
