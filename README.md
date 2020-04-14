# Simpletire STEER

## Documentation

- [Contributing](./docs/CONTRIBUTING.md)
- [Storybook](./docs/STORYBOOK.md)
- [Testing](./docs/TESTING.md)

## Installation

Dependencies

- [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://classic.yarnpkg.com)

Make sure you're a member of https://zeit.co/steer/steer . Ask Chris Vitale (chris.vitale@simpletire.com) or Arnaud Tanielian (tanielian@work.co) for access.

First, install `now` globally on your computer

```bash
npm i -g now
```

Then, login in

```bash
now login
```

Finally, link your local project

```bash
now
```

You'll be asked a few questions, make sure to answer:

```bash
$ now
Now CLI 17.1.1
? Set up and deploy “~/path-to-project/steer”? [Y/n] y
? Which scope do you want to deploy to? STEER
? Found project “steer/steer”. Link to it? [Y/n] y
```

Then, make sure to run the correct version of node contained in `.nvmuse`.

```bash
nvm use
```
Windows users:
```bash
type .\.nvmrc | %{$_ -replace "v",""} | %{nvm install $_}
type .\.nvmrc | %{$_ -replace "v",""} | %{nvm use $_}
```

Finally, install the `node_modules`.

```bash
yarn
```

You're all set!

## Development

As the project use Now env. variables, to start a local server:

```bash
now dev
```

## Other Scripts

Lint files:

```
yarn lint
```

Lint files and apply fixes:

```
yarn lint:fix
```

Check for Typescript errors:

```
yarn ts
```

Run tests:

```
yarn test
```

Run tests in watch mode:

```
yarn test:watch
```

Run tests and generate coverage report

```
yarn test:coverage
```

Run all checks (linting, ts, tests):

```
yarn checks
```

Run Storybook locally:

```
yarn storybook
```

## Deploying

Every push generates a URL you can see online.
But if you wish to deploy your local work on a preview link, at any time

```bash
now
```

To deploy on prod, merge with the `master` branch, or

```bash
now --prod
```

### `build` scripts

`yarn build` has conditional behavior depending on the existence of `NOW_GITHUB_COMMIT_REF`, a ZEIT Now environment variable with the current Github branch.

- If there's no `NOW_GITHUB_COMMIT_REF` variable because we are deploying from the command line, run `yarn build-prod`
- If `NOW_GITHUB_COMMIT_REF` is master, run `yarn build-prod`
- If `NOW_GITHUB_COMMIT_REF` is another else, run `yarn build-ci`

`build-prod` will create a Next.js build. `build-ci` will create a Next.js build containing storybook at the `/storybook` route.

Note: Builds from other branches (eg staging) that are promoted to production will still contain a visible `/storybook` route.
