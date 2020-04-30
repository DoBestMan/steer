# Data Fetching

This project's `_app.tsx` component includes a `getInitialProps` function to fetch global data such as the site menu items. This is the best way we've found to fetch data needed for every page.

Simplied version below:

```javascript
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps`/`getServerSideProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // We can return if fetching on the client side because
  // global data is already available in internal state
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    return appProps;
  }

  const serverData = await getServerData();

  return {
    ...appProps,
    serverData,
  };
};
```

Adding `getInitialProps` disables Next.js's [Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization), but it does not prevent static page generation in general.

## Stages

- **build:** Process of building static pages and other static assets
- **initial visit:** Initial load of the site, where HTML is provided by the server
- **client-side navigation:** Navigation after the initial load handled by Next.js's router.

After the **initial visit** of any type of page, global data is stored in `MyApp`'s internal state:

```javascript
class MyApp extends App<Props> {
  state = {
    serverData: this.props.serverData,
  };
```

Here's how the process works for different page types:

## Static Pages

```javascript
function MyStaticPage(props: Props) {
  return <SomeComponent {...props} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // data calls
};
```

- On **build**, MyStaticPage will call `MyApp.getInitialProps` after its own `getStaticProps`
- On **initial visit** and **client-side navigation** the static page is served; no additional calls are made

## Server-Side Pages

```javascript
function MyServerSidePage(props: Props) {
  return <SomeComponent {...props} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // data calls
};
```

- On **initial visit**, the server calls the page's `getServerSideProps` function, followed by the `MyApp.getInitialProps`.
- On **client-side navigation**, the server also calls the page's `getServerSideProps` function, followed by `MyApp.getInitialProps`.\*

\*⚠️ This is not ideal, because we already fetched the global data once from `MyApp.getInitialProps`. However, it can be mitigated by aggressive caching of global endpoints.

## Pages without Fetches

```javascript
function MySimplePage(props: Props) {
  return <SomeComponent {...props} />;
}

// nothing exported!
```

- On **initial visit**, the server calls `MyApp.getInitialProps`.\*
- On **client-side navigation**, the client calls `MyApp.getInitialProps`. We can check for this and avoid fetching data.

\*⚠️ Without `MyApp.getInitialProps`, this page would have been automatically statically optimized. But that's OK, because we can manually make pages static by exporting a `getStaticProps` function (even an empty one!).
