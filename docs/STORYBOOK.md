# Storybook

Guidelines for using Storybook:

## Creating Stories

Create one story for each meaningful variation of a component, plus one story with knobs that allows the component to be tested.

The Link component is a good example of this:

- Link With Knobs
- Orange Link
- Black Link
- Small Orange Link
- Small Black Link

## Avoiding Nested Stories

Similar to [our approach to testing](./TESTING.md), every component does not need a story.

For example:

```
SearchBar/
  SearchBar.tsx
  SearchBar.hooks.ts
  SearchBar.stories.tsx
  SearchBarButton/
    SearchBarButton.tsx
```

One storybook file in `SearchBar.stories.tsx` will usually be sufficient to visually test the component system, without additional stories for `SearchBarButton` alone.

An exception to this would be complex child components like the SmartModule components on the homepage, which will probably benefit from their own stories.

## Connected Components

### The Problem

We can run into problems with Storybook when multiple items in a component tree connect to an external data store, like React Context.

Consider the following components:

```
pages/
  HomePage/
    HomePage.container.tsx                  // connects to Context
    HomePage.tsx                            // renders ReviewSection
modules/
  ReviewModule/
    ReviewModule.container.tsx              // connects to Context
    ReviewModule.tsx                        // renders ReviewModuleDecription
    ReviewModuleDecription/
      ReviewModuleDecription.container.tsx  // connects to Context
      ReviewModuleDecription.tsx
```

To add stories for these, we should follow two techniques:

## Technique 1: Remove extra containers

Right now, we can't create a `ReviewModule.stories.tsx` file, because stories in that file will be able to mock the props coming from `ReviewModule.container.tsx`, but not `ReviewModuleDecription.container.tsx`.

The extra connection in `ReviewModuleDecription.container.tsx` is making it hard to test this group of components in storybook. `ReviewModule` and `ReviewModuleDescription` are both closely related, so it's OK to get all the needed props in `ReviewModule.container.tsx` and pass them down.

## Technique 2: Avoid top-level stories

We should not create stories for `HomePage`, because they will not be able to mock the data `ReviewModule` is getting from Context. `HomePage` has children that are too complex and independent for a story.

## Result

Following these techniques, the final tree will look like this:

```
pages/
  HomePage/
    HomePage.container.tsx                  // connects to Context
    HomePage.tsx                            // renders ReviewSection
modules/
  ReviewModule/
    ReviewModule.container.tsx              // connects to Context
    ReviewModule.tsx                        // renders ReviewModuleDecription
    ReviewModule.stories.tsx                // story file
    ReviewModuleDecription/
      ReviewModuleDecription.tsx
```

## Rules of Thumb

- Do not create Context or Redux providers in Storybook\*
- Do not try to use default props to get around properties that would normally be provided in the middle of the tree from Context
- Do not add logic to your stories to mock behavior that would usually be provided by Context; if you need to mock it like this, it's too complex for Storybook
- When building components, be conservative about how often you connect to Context

Further reading: [https://kentcdodds.com/blog/prop-drilling](https://kentcdodds.com/blog/prop-drilling)

\*We might make small exceptions to this in a global decorator for things like translations.
