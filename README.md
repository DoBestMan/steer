# Simpletire STEER

## Documentation

- [Contributing](./docs/CONTRIBUTING.md)
- [Data Fetching](./docs/DATA_FETCHING.md)
- [Storybook](./docs/STORYBOOK.md)
- [Testing](./docs/TESTING.md)

## Installation

Dependencies

- [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://classic.yarnpkg.com)

Make sure you're a member of https://zeit.co/steer/steer . Ask Chris Vitale (chris.vitale@simpletire.com) or Arnaud Tanielian (tanielian@work.co) for access.

First, make sure to install the correct version of node contained in `.nvmrc`.

```bash
nvm use
```

Windows users:

```bash
type .\.nvmrc | %{$_ -replace "v",""} | %{nvm install $_}
type .\.nvmrc | %{$_ -replace "v",""} | %{nvm use $_}
```

Next, install `now` globally on your computer

```bash
npm i -g now
```

Then, login

```bash
now login
```

Then, link your local project

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

Then, pull the development environment variables.

```bash
now env pull
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

## (Re)building the icon library

We're generating and using an SVG Sprite in the application. If you need to add more icons, please:

- add your SVG icon in `/src/assets/icons`. Make sure the filename is respecting the kebab-case format.
- run `yarn generate-svg-sprite`.
- You're all set, commit your change and voilà!

Note: make sure that every SVG file used has a `viewBox` attribute.

List of assets [here](https://docs.google.com/spreadsheets/d/1kjsrjn0Y-dQAo_ahsUV-jxhk58JpxPmHUNkiwCI-lw8/edit#gid=0)

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
