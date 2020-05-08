import { fireEvent, render, screen } from '@testing-library/react';

import AutocompleteResultItemLocation from '~/components/global/Location/AutocompleteResultItemLocation';
import { KEYCODES } from '~/lib/constants';

import Autocomplete from './Autocomplete';

describe('autocomplete', () => {
  it('has expected initial state', () => {
    render(
      <Autocomplete
        onChange={jest.fn()}
        results={[]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
      />,
    );

    const combobox = screen.getByRole('combobox');

    // it starts with a closed combo box and no error message
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Invalid input')).toBe(null);
    expect(screen.queryByLabelText('cancel')).toBe(null);
  });

  test('autocomplete flow - error', () => {
    const onChange = jest.fn();
    render(
      <Autocomplete
        onChange={onChange}
        results={[]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
        resultItemComponent={AutocompleteResultItemLocation}
      />,
    );

    const input = screen.getByRole('textbox');
    const combobox = screen.getByRole('combobox');

    // when text is entered with no result
    fireEvent.change(input, { target: { value: '1234' } });

    // it calls onChange
    expect(onChange).toHaveBeenCalledWith('1234');

    // it renders cancel button
    expect(screen.getByText('Clear')).toBeInTheDocument();

    // results listbox should be closed if combo box displays an error
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    // it opens the combo box with an error
    expect(screen.queryByText('Invalid input')).toBeInTheDocument();
  });

  // TODO: update and fix these tests as part of https://simpletire.atlassian.net/browse/WCS-40
  test.skip('autocomplete flow - success', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Autocomplete
        onChange={onChange}
        results={[]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
        resultItemComponent={AutocompleteResultItemLocation}
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const combobox = screen.getByRole('combobox');

    // when text is entered with results
    fireEvent.change(input, { target: { value: '0' } });
    rerender(
      <Autocomplete
        onChange={jest.fn()}
        results={[
          { main: '08203', secondary: 'secondary text for 08203' },
          { main: '10019', secondary: 'secondary text for 10019' },
        ]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
        resultItemComponent={AutocompleteResultItemLocation}
      />,
    );

    // it calls onChange
    expect(onChange).toHaveBeenCalledWith('0');

    // it renders cancel button
    expect(screen.getByText('Clear')).toBeInTheDocument();

    // it opens the combo box with no error
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(screen.queryByText('Invalid input')).toBe(null);

    // it renders results
    expect(
      screen.getByLabelText('08203 secondary text for 08203'),
    ).toBeInTheDocument();

    // when item is clicked
    fireEvent.click(screen.getByText('secondary text for 08203'));

    // it updates input value and closes combo box
    expect(input.value).toBe('08203');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  // TODO: update and fix these tests as part of https://simpletire.atlassian.net/browse/WCS-40
  test.skip('autocomplete flow - success keyboard', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Autocomplete
        onChange={onChange}
        results={[]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
        resultItemComponent={AutocompleteResultItemLocation}
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const combobox = screen.getByRole('combobox');

    // when text is entered with results
    fireEvent.change(input, { target: { value: '0' } });
    rerender(
      <Autocomplete
        onChange={jest.fn()}
        results={[
          { main: '08203', secondary: 'secondary text for 08203' },
          { main: '09019', secondary: 'secondary text for 09019' },
        ]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
        resultItemComponent={AutocompleteResultItemLocation}
      />,
    );

    // it calls onChange
    expect(onChange).toHaveBeenCalledWith('0');

    // it renders cancel button
    expect(screen.getByText('Clear')).toBeInTheDocument();

    // it opens the combo box with no error
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(screen.queryByText('Invalid input')).toBe(null);

    // it renders results
    expect(
      screen.getByLabelText('08203 secondary text for 08203'),
    ).toBeInTheDocument();

    // select second result with arrow key
    fireEvent.keyDown(input, { keyCode: KEYCODES.ARROW_DOWN });
    fireEvent.keyDown(input, { keyCode: KEYCODES.ENTER });

    // it updates input value and closes combo box
    expect(input.value).toBe('09019');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('clears input on cancel', () => {
    const { rerender } = render(
      <Autocomplete
        onChange={jest.fn()}
        results={[]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const combobox = screen.getByRole('combobox');

    // when text is entered with results
    fireEvent.change(input, { target: { value: '0' } });
    rerender(
      <Autocomplete
        onChange={jest.fn()}
        results={[
          { main: '08203', secondary: 'secondary text for 08203' },
          { main: '10019', secondary: 'secondary text for 10019' },
        ]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
      />,
    );

    const cancelButton = screen.getByText('Clear');

    // when cancel button is clicked
    fireEvent.click(cancelButton);

    // it clears input and closes combobox
    expect(input.value).toBe('');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('clears input on ESC keyPress', () => {
    const { rerender } = render(
      <Autocomplete
        onChange={jest.fn()}
        results={[]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const combobox = screen.getByRole('combobox');

    // when text is entered with results
    fireEvent.change(input, { target: { value: '0' } });
    rerender(
      <Autocomplete
        onChange={jest.fn()}
        results={[
          { main: '08203', secondary: 'secondary text for 08203' },
          { main: '10019', secondary: 'secondary text for 10019' },
        ]}
        label="Enter input"
        errorLabel="Invalid input"
        onValueSelectionSuccess={jest.fn()}
        resultItemComponent={AutocompleteResultItemLocation}
      />,
    );

    // when cancel button is clicked
    fireEvent.keyDown(input, { keyCode: KEYCODES.ESCAPE });

    // it clears input and closes combobox
    expect(input.value).toBe('');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });
});
