# Code Guidelines

> This document contains code guidelines that might not be caught by the linter.

- The front-end directories are sorted by the following within `src/`:

  - `src/components`
    - `src/components/global` - global reusable components
    - `src/components/modules` - non-page components that are more complex than atomic components (eg they have containers or external data files)
    - `src/components/pages` - page components
  - `src/hooks` - global hooks
  - `src/context` - global context
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
     HomePage/
        HomePage.tsx // <HomePage />
        HomePage.container.ts // <HomePageContainer />
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
import { StylesMap } from '@emotion/core';

- const foo: CSSObject = {
-   background: 'red'
- };
- const bar: CSSObject = {
-   background: 'blue'
- };

+ const styles: StylesMap = {
+   foo: {
+     background: 'red'
+   },
+   bar: {
+     background: 'blue'
+   },
+ }
+ export default styles
```

- Composed styles should generally be composed within the component
- Typing with `StylesMap` helps us avoid issues with "type widening" (ie: things like `{ borderTopStyle: 'solid' as 'solid' }`). Read more about it [here](https://github.com/emotion-js/emotion/pull/1129#issuecomment-452376242)

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

## Markdown

This component uses the [react-markdown](https://github.com/rexxars/react-markdown) library to parse Markdown formatted strings in HTML elements

### Line breaks

Markdown allows a few different ways to apply breaks between lines. Because of those variations and some quirks with the `react-markdown` library, we recommend to follow the below methods to apply different types of line breaks consistently.

### Add a break to split the HTML element

Use `\n\n` to break a line into a new HTML element. The generated element will be a `p` tag by default but can be turned into another element by preceding it with a Markdown tag (`#`, `*`, etc).

Examples:

- `"# Title\n\n A new paragraph."` will render an `h1` and a `p` tag.
- `"* List Item 1\n\n*List Item 2"` will render two `li` tags inside a `ul`
- `"Oops.\n\nPlease enter a valid ZIP code."` will render "Oops." and "Please enter a valid ZIP code." as two separate `p` tags.

### Add a break whithin the same HTML element

Use `<br />` to insert a line break inside the same HTML element without splitting into two. For example this `"# Oops.<br />Please enter a valid ZIP code."` will render a "Oops. <br /> Please enter a valid ZIP code." inside a single `h1` tag.

## Routing

### Scrolling back to the top

Next.js’ `Router.push` event doesn’t automatically scroll the window to the op on route change as `<Link>` does. To force this behavior the following can be added to the `Router.push` promise on each case that requires it: `.then(() => window.scrollTo(0, 0));`

Example:

```
 router.push([params]).then(() => window.scrollTo(0, 0));
```

## Typescript notes

### Union types and enums as unique identifiers

Union types are used throughout the codebase. To illustrate how to properly assign enums as an identifier for type checking, the example from https://www.typescriptlang.org/docs/handbook/enums.html#union-enums-and-enum-member-types will be used.

To make a field unique, the value from the enum has to be used. It cannot reference any one of the fields in the enum.

```
enum ShapeKind {
    Circle = 'Circle',
    Square = 'Square,
}
```

```diff
- interface Circle {
-   kind: ShapeKind; // oneof enum vals
-   radius: number;
- }
- interface Square {
-   kind: ShapeKind; // oneof enum vals
-   sideLength: number;
- }

if (shape.kind === ShapeKind.Circle) {
   return <-- we don't want circles to reach code below
}

// According to the Square interface, shape.kind could still technically be Circle here

+ interface Circle {
+   kind: ShapeKind.Circle; // can only ever be "Circle"
+   radius: number;
+ }
+ interface Square {
+   kind: ShapeKind.Square; // can only ever be "Square"
+   sideLength: number;
+ }


if (shape.kind === ShapeKind.Circle) {
   return
}

// shape.kind can only ever be `ShapeKind.Square`, so Circle types will not reach this code
```

### Type checking when unique identifier is not present

Where possible, we should use a required, unique-identifying field when using union types, but sometimes this is unavoidable. In these instances, the `in` operator can be used as a subtitution. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in

```diff
interface LinkProps {
  href: string;
}

interface ButtonProps {
  onClick: () => void;
}

function ButtonOrLink(props: ButtonProps | LinkProps) {
- // TS will error because `onClick` does not exist on LinkProps interface
- if (props.onClick) {
-   return <button onClick={props.onClick} />
- }

+ if ('onClick' in props) {
+   return <button onClick={props.onClick} />
+ }

  return <a href={props.href} />
}
```
