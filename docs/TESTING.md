# Testing Strategy

Making strategic use of Unit and Integration tests will allow us to validate functionality without sacrificing velocity. In React, we can write both types of tests with these tools:

- [Jest](https://jestjs.io/)
- [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro)

## Guidelines

### What To Test

- Reusable hooks and functions
- Adapter functions
- Complex components

This is always going to be a judgment call, and we need to be smart with our decisions. Atomic and composite components (e.g. buttons and carousels, respectively) will probably not need tests, but pages or modules that fetch data or have other complex logic could benefit from testing.

### Jest Snapshots

We have the `prefer-inline-snapshot` rule turned on to enforce inline snapshots. It's usually better to assert a specific expectation, rather than use a snapshot, but they can be helpful for simple JSX elements, error messages, objects or arrays.

The `no-large-snapshots` rule has [an open issue for Typescript use](https://github.com/jest-community/eslint-plugin-jest/issues/370) but we should still avoid snapshots over 10 lines.

### Integration Tests

Prefer integration tests, rather than unit tests covering smaller pieces that are not used elsewhere.

For example:

```
SearchBar/
  SearchBar.tsx
  SearchBar.hooks.ts
  SearchBar.test.tsx
  SearchBarButton/
    SearchBarButton.tsx
```

One test file in SearchBar.test.tsx allows us to test how all pieces of this component work together.

### Hooks

Hooks can be tested with [React Hooks Testing Library](https://react-hooks-testing-library.com/).

- This is a great solution for hooks used throughout the application
- If a hook is only used in one place, in a component, it is usually better to test the component

### Longer Tests

Tests should be isolated. It's better to have a few long tests, rather than a bunch of small ones that test different pieces of a flow.

To make longer tests manageable, use the `test` syntax and add inline comments. When you need to wait for a component update or mocked async request, group related pieces of code in `waitFor` statements. Review an example: https://github.com/sarahatwork/integration-tests/blob/master/src/LoginModule/index.integration.test.js#L21. (The `it` syntax is still preferred for shorter tests.)

Further reading: https://kentcdodds.com/blog/write-fewer-longer-tests

### Query Best Practices

Prefer [queries](https://testing-library.com/docs/dom-testing-library/api-queries#queries) (`byText`, `byAriaLabel`, etc.) that relate to behavior that can be experienced by a user.

When this is not possible, query `byTestId` after adding a `data-testid` attribute in the code.

Import `screen` for queries to avoid the overhead of keeping the `render` destructure up to date.

```diff
- const { getByRole } = render(<Example />)
- const errorMessageNode = getByRole('alert')
+ render(<Example />)
+ const errorMessageNode = screen.getByRole('alert')
```

### Mocking

We've enabled Jest's `restoreMocks` option, so any mocked function will be reset at the end of each test. We can use the `ts-jest`'s `mocked` util to control mocked functions inside tests. Example:

```javascript
import { mocked } from 'ts-jest/utils';

describe('getUsername', () => {
  beforeEach(() => {
    jest.spyOn(UserApi, fetchUser);
  });

  it('returns user name for logged in user', async () => {
     mocked(UserApi.fetchUser).mockResolveValue({ username: 'Mr. Test' });
     const result = await getUsername();
     expect(result).toBe('Mr. Test');
  });

  it('returns undefined otherwise', async () => {
     mocked(UserApi.fetchUser).mockResolveValue(null);
     const result = await getUsername();
     expect(result).toBeUndefined();
  });
});

```

### Mock Data

For readability, it's desirable to extract big pieces of mock data into their own colocated file:

```
SearchBar/
  mockData/
    SearchBar.mock.ts
  SearchBar.tsx
  SearchBar.test.tsx
```
