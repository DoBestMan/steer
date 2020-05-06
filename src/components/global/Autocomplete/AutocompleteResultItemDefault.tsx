import { ResultItemProps } from './Autocomplete';
import AutocompleteResultsItem from './AutocompleteResultItem';

// TODO: This will probably changed with the implementation of https://simpletire.atlassian.net/browse/WCS-40
function AutocompleteResultItemDefault({ index, result }: ResultItemProps) {
  return (
    <AutocompleteResultsItem>
      [{index}]: {result.main}, {result.secondary}
    </AutocompleteResultsItem>
  );
}

export default AutocompleteResultItemDefault;
