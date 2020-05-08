# Code Guidelines

> This document contains code guidelines that might not be caught by the linter.

- The front-end directories are sorted by the following within `src/`:

  - `src/components`
    - `src/components/global` - global reusable components
    - `src/components/modules` - non-page components that are more complex than atomic components
    - `src/components/pages` - page components
  - `src/hooks` - global hooks
  - `src/lib` - global types, constants and utils
  - `src/pages` - page components that map to NextJS routes
  - `src/styles` - global serialized styles
  - `src/assets` - static assets

- Components are grouped by directories. Each directory will have an explicitly named component and adjacent styles, constants, and anything else specific to the component. Avoid using `index.tsx` for the component file name.

```
components/
  global/
     Button/
        Button.tsx
        Button.styles.ts
```

- Isolate data fetching logic from presentational components. More complex components might need a container file to handle this logic and should be treated as any other adjacent file.

```
components/
  pages/
     Homepage/
        Homepage.tsx
        Homepage.container.ts
```

- Naming convention for constants is all caps and snake case, and enums are encouraged over objects. eg `FOO_BAR.BAZ` Component-specific constants should go at the top of the component unless there are many, in which case they should be in an adjacent file in the component directory. If a constant is used elsewhere in the code, it should be in `src/lib/constants`

- Avoid using anonymous functions

```diff
- const foo = () => {
+ function Foo() {
  console.log('howdy')
}
```

## Styling

- Styles will be exported as one object with keys:

```diff
- const foo = css({
-   background: 'red'
- })
- const bar = css({
-   background: 'blue'
- })

+ const styles = {
+   foo: css({
+     background: 'red'
+   }),
+   bar: css({
+     background: 'blue'
+   })
+ }
+ export default styles
```

- Composed styles should generally be composed within the component

```
css={[styles.root, styles.other]}
```

- If a component has complex styling it is acceptable to compose styles within the style file. Such cases might be multiple conditional styles, overwrites, or media queries.

## Props

- Destructure props within a component:

```diff
- function Component(props: Props)
+ function Component({ foo, bar, ...rest }: Props)
```

- Prop interfaces should be named `Props` unless they need to be used in another file.

```
export interface PopularProps {
  woo: string
}

interface Props {
  boo: string
}
```

## Icons

- To allow icons to be colored, replace any strokes or fills with `currentColor` and make sure to pass the desired color to the `Icon` or container.

```diff
- <svg viewBox="0 0 25 25" fill="none">
-  <path stroke="#000" d="M23 2L13.4903 23L12.05 13.2194L2 11.6889L23 2Z" stroke-width="3" stroke-linejoin="round"/>
- </svg>
+ <svg viewBox="0 0 25 25" fill="none">
+  <path stroke="currentColor" d="M23 2L13.4903 23L12.05 13.2194L2 11.6889L23 2Z" stroke-width="3" stroke-linejoin="round"/>
+ </svg>
```

- Don't forget to run `yarn generate-svg-sprite`
- If an icon has multiple colors, like `icon-wheel`, you may not want to allow the color to be changed.

## Context

Create new context instances in `/context`. Use the `createContext` utility to create a provider and hook. `createContext` provides a better Typescript development experience than the default React implementation; you don't need to provide a default value or add checks for null/undefined.

### Simple Implementation

```javascript
// MyContext.context.ts

const MyContext = createContext<MyContextType>();

export const MyContextProvider = MyContext.Provider;

export const useMyContext = MyContext.useContext;

// SomePage.container.tsx

<MyContextProvider>
  <OtherComponent />
</MyContextProvider>

// OtherComponent.tsx

const { coolContextProp } = useMyContext();
```

### Complex Implementation

You can also wrap the `createContext` provider in your own custom provider to add properties or define the context value internally.

```javascript
// MyContext.context.ts

const MyContext = createContext<MyContextType>();

function useContextSetup() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    setIsOpen
  }
}

export function MyContextProvider({ children }: { children: ReactNode }) {
  const value = useContextSetup();
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export const useMyContext = MyContext.useContext;
```

### When & Where

Context is not needed in all cases; `useState` and `useReducer` on their own can manage many use cases. Context is great for:

- Data that needs to be available throughout the application
- Data that is cumbersome to pass through multiple components (see an article on [Prop drilling](https://kentcdodds.com/blog/prop-drilling) for help making the decision)

Context should live as close to where it's needed as possible.

- Some context needs to be at the app-level; our `MyApp` component contains an `AppProviders` wrapper for all of these providers.
- In other cases, a context provider can wrap a subset of components, like the `Nav` module, or a specific page.
