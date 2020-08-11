// TODO update test with approach to test the output generate by
// the react-markdown plugin

import { fireEvent, render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import { ui } from '~/lib/utils/ui-dictionary';

import Feedback from './Feedback';

// Mock icons since jest-next-dynamic does not support svgx
jest.mock('~/components/global/Icon/Icon', () => () => 'Icon');

describe('Feedback', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  it('expected initial render', () => {
    render(<Feedback />);

    //     expect(
    //       screen.queryByText(ui('common.feedback.defaultMessageLabel')),
    //     ).toBeInTheDocument();

    expect(screen.getByText(ui('common.feedback.yes'))).toBeInTheDocument();
    expect(screen.getByText(ui('common.feedback.no'))).toBeInTheDocument();
  });

  test('yes button flow - render success', () => {
    render(<Feedback />);

    const yesButton = screen.getByText(ui('common.feedback.yes'));

    fireEvent.click(yesButton);

    //     expect(
    //       screen.queryByText(ui('common.feedback.positiveMessageLabel')),
    //     ).toBeInTheDocument();
    //     expect(
    //       screen.queryByText(ui('common.feedback.giveFeedback')),
    //     ).toBeInTheDocument();
  });

  test('no button flow - render success', () => {
    render(<Feedback />);

    const noButton = screen.getByText(ui('common.feedback.no'));

    fireEvent.click(noButton);

    //     expect(
    //       screen.queryByText(ui('common.feedback.negativeMessageLabel')),
    //     ).toBeInTheDocument();
    //     expect(
    //       screen.queryByText(ui('common.feedback.contact')),
    //     ).toBeInTheDocument();
    //     expect(
    //       screen.queryByText(ui('common.feedback.giveFeedback')),
    //     ).toBeInTheDocument();
  });
});
