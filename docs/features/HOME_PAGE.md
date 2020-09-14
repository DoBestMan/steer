# Home Page

## Scrolling Triggered UI Updates

The Home page has a set of rules and behaviors triggered when users scroll. The logic and UI for these interactions can be found in the `src/components/pages/HomePage.tsx` and `src/components/pages/HomePage.hooks.ts` files

### Expected Behavior

The page has a scroll threshold upon which the content below the hero area changes color and opacity; If the scroll position is above the threshold, the content is dimmed and its background is set to the default color. Once that threshold is passed, the background changes to the alternate color and the content is at full opacity.

To accomplish this, we use the `useChangeBackgroundColor` hook, which listens to the current scroll position and determines when the content should change color and its visibility.

Please note opening the Search modal slightly modifies the behavior described above to provide a pleasant transition between the Home content and the Search Modal. When the Search modal is opened, the Home content is faded out in coordination with the modal's fade in transition and vice versa when the modal is closed.

## Content Peeking Above Fold

This design requirement dictates that a small portion of the content (see `CONTENT_PEEKING_AMOUNT` variable) has to be visible at most window sizes (excluding edge cases when window heights are very short) above the fold. To accomplish this we use the `useContentSpacerHeight` hook to dynamically add spacing between the bottom of the search button and the content.
