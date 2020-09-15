# Catalog Filters

## UI Behavior

Catalog filters are expected to be a modal on small and medium breakpoints, and a dropdown on large and greater (referred to as "popup" throughout the code).

Once a filter popup is opened and filters are selected, each selection will trigger a fetch for "previewed" results. This data will be used only within the popup so that the information is up to date (filter counts, total results count, disabled states, etc).

Once the user clicks the apply button, the selected filters will trigger a new fetch for the catalog grid and rebuild the URL with the new filters. This includes filters that existed in initial state and were not removed.

Clicking reset will clear all filters in open popup, but will not automatically apply the filters globally.

## State Management

`initialState` is determined by running through initial results to determine which are marked as selected.

`activeFilters` - Value is `initialState`. The source of truth for filters that are currently applied to the catalog. Built from filter state in data.

`filtersToApply` - A map of filters that have been modified and will be applied. Begins as a copy of `initialState` and builds from there.

There are two different handlers to update the state:
`createUpdateFilterGroup` - This handles filters that are not automatically applied upon modification. State modification can be either additive, or overwrite the value.
`createToggleFilterHandler` - Handles toggle filters or filters that are applied automatically upon selection. Only handles overwriting values in state.

### Filter Types in State

Each filter has a value object that may contain multiple values (eg `sort` and `order` from the sort list). Depending on the type of filter, the value in state may be overwritten or appended/removed. When removing a filter value, we have opted to replace with an empty string rather than remove it from state altogether. Empty filter values will be excluded when creating the query params for the URL.

`SiteCatalogFilterToggle` - Values are not additive. They are overwritten and automatically applied.

`SiteCatalogFilterRange` - Values are not additive and should overwrite the value in state. Range is formatted as "<min>/<max>" eg. `"0,5000"`

`SiteCatalogFilterSort` - Values are not additive. Automatically applied on large and greater breakpoints.

`SiteCatalogFilterList` - Values are additive and exist as a comma separated list.
