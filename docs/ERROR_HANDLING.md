# Error Handling

## Which Error Page is Which?

### /src/pages/_error.tsx

Next.js documentation: https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page

Uses in our code:

- 500 errors client-side and server-side in Production only (default Next behavior)
- Imported into WithErrorPageHandling HOC to display any 4xx/5xx status code from API responses

### /src/pages/404.tsx

Next.js documentation: https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-404-page

Uses in our code:

- For pages like `/[slug]` that use `getStaticPaths` with `fallback: false` setting: https://nextjs.org/docs/basic-features/data-fetching#fallback-false. Next will automatically render the content of this file directly with a status code of 404.
- If you visit `/404` in the browser directly. I can't return a status code of 404 because of the [limitations of static pages](https://github.com/vercel/next.js/discussions/11464#discussioncomment-2410) but it is an acceptable edge-case.
  - In the future, upgrade to Next 9.5.2 might solve this issue [1](https://github.com/vercel/next.js/releases/tag/v9.5.2)[2](https://github.com/vercel/next.js/pull/15728)

## fetchWithErrorHandling and AsyncResponse

We can fetch data by calling our `fetch` function via the `fetchWithErrorHandling` wrapper, which will catch any errors and return an `AsyncResponse<T>` shaped object.

Example successful response:

```javascript
{
  data: {...},
  isSuccess: true
}
```

Example error response:

```javascript
{
  error: {
    statusCode: 404,
    ...
  },
  isSuccess: true
}
```

## Server-side

In general, our desired behavior:

- Render error/404 UI without redirecting the page
- Update the page's HTTP status code the match the error

### getServerSideProps/getStaticProps and WithErrorPageHandling HOC

We can use the `AsyncResponse<T>`-shaped responses of our request(s) in `getServerSideProps`/`getStaticProps` to handle successful/error states.

Example error handling for a page with two requests:

```javascript
export const getServerSideProps: GetServerSideProps<PageResponse<
  ProductDetailData
>> = async (context) => {
  // ...

  const [siteProduct, siteProductReviews] = await Promise.all([
    backendGetProductDetail(...),
    backendGetProductReviews(...),
  ]);

  // Handle product error
  if (!siteProduct.isSuccess) {
    const errorStatusCode = siteProduct.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  // Handle reviews error
  if (!siteProductReviews.isSuccess) {
    const errorStatusCode = siteProductReviews.error.statusCode;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  // Handle success
  return {
    props: {
      serverData: {
        siteProduct: siteProduct.data,
        siteProductReviews: siteProductReviews.data,
      },
    },
  };
};
```

Note, this function returns the type `PageResponse<ProductDetailData>`, a type intended for use with the `WithErrorPageHandling` HOC.

To use it in your page file (eg `pages/my-page.tsx`):

```javascript
// Export your page's container component wrapped in the HOC
const MyPage = WithErrorPageHandling(MyPageContainer);
export default MyPage;
```

On success, `WithErrorPageHandling` will render your page container and pass it the props from `getServerSideProps`/`getStaticProps`.

```javascript
<MyPageContainer {...props} />
```

On error, `WithErrorPageHandling` will render the error UI with the status code returned from `getServerSideProps`/`getStaticProps`:

```javascript
<Error statusCode={props.errorStatusCode} />;
```

In the future, if/when all pages use `WithErrorPageHandling`, we may be able to use it on the `App` component instead, rather than each individual page.
