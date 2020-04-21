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
