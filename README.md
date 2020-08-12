# Simpletire STEER

## Documentation

- [Contributing](./docs/CONTRIBUTING.md)
- [Data Fetching](./docs/DATA_FETCHING.md)
- [Storybook](./docs/STORYBOOK.md)
- [Testing](./docs/TESTING.md)
- [Error Handling](./docs/ERROR_HANDLING.md)

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

By default, you'll run against the mock server.

### To run against a local server, `http://localhost:3000`:

- Clone the `steer-api-definition` repo and follow the instructions to start a local server
- Update this project's `.env` file's `STEER_BACKEND` value to `"local"`
- Run `now dev` to start local development in this project (it will start on port 3001)

### To run against the mock server:

- Update this project's `.env` file's `STEER_BACKEND` value to `"mock"`
- Run `now dev` to start local development in this project

### To run against the integration server:

- Update this project's `.env` file's `STEER_BACKEND` value to `"integration"`
- Run `now dev` to start local development in this project

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

The icon library is split in two types of icons:

- common: the icons that are common to most of the pages, or used by common layout such as the header
- others: all the other icons

We're generating and using an SVG Sprite in the application for the common icons. If you need to add more icons, please:

- add your SVG icon in `/src/assets/icons/common` if the icon is supposed to be heavily used, or `/src/assets/icons/others` otherwise. Make sure the filename is respecting the kebab-case format.
- run `yarn generate-svg-sprite`.
- You're all set, commit your change and voilà!

Note: make sure that every SVG file used has a `viewBox` attribute, as well as a `width` and `height` attributes.
Note (bis): It's rare an icon qualifies to be a `common` icon.

List of assets [here](https://docs.google.com/spreadsheets/d/1kjsrjn0Y-dQAo_ahsUV-jxhk58JpxPmHUNkiwCI-lw8/edit#gid=0)

## (Re)building the car library

Similar to the icon library, we've created a script that:

- cleans the car SVG files
- extracts detail info of each car

Each car SVG file should:

- Have 4 `<g>` elements:
  - `<g class="body-car">`: Group containing the body car of the illustration
  - `<g class="back-wheel">`: Group containing the back wheel of the illustration
  - `<g class="front-wheel">`: (Optional) Group containing the front wheel of the illustration
  - `<g class="solid-body-background">`: Group containing a transparent path for the hero homepage animation
- be correctly named, based on the `id` from the list of assets [here](https://docs.google.com/spreadsheets/d/1kjsrjn0Y-dQAo_ahsUV-jxhk58JpxPmHUNkiwCI-lw8/edit#gid=0)

Note: Don't worry if you have `id` instead of `class`, the script converts every instance of `id=...` to `class="...` on every SVG.

If you need to add more cars, please:

- Make sure that the previous requirements are met
- add your SVG car in `/public/static/assets/cars`. Make sure the filename is respecting the kebab-case format, based on the `id` of the car.
- run `yarn generate-cars-constants`.
- Update `CAR_DETAILS_TYPES` in `~/components/global/Car/Car.constants.ts` and add the new type of the added cars
- You're all set, commit your change and voilà!

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

### Deduplication

Vercel uses [deduplication](https://vercel.com/docs/v2/platform/deployments#deduplication) to only rebuild when a change in files/settings is detected. This can cause some issues in this codebase because we use the branch name to determine which API to connect to.

We have a few solutions to this in the codebase:

**Deploy Hooks**

The `dev`, `dev-st`, and `uat` branches have GitHub actions that will trigger deploy hooks when they are merged.

Among other things, this solves the use case where `my-feature-branch` (built against the mock API) is merged into `dev` and we need to kick off a new deploy against the integration API.

See `force-dev-deploy.yml` for an example.

**New Files**

Creating a new file will always trick Vercel into creating a build, but this should only be used for branches whose git history will never be merged back into the rest of our code.

Thus, this is a great solution for our `mock-dev`, `mock-qa`, etc. branches; these get rebuilt against the mock API anytime there is an update to the corresponding branch (eg `dev`, `qa`).

See `deploy-against-mock.yml` for more.

**Releases**

A release via `yarn version` will also kick off a new deploy because it changes the version number in `package.json`. This ensures that QA always rebuilds in the `release-qa.yml` and `version-qa.yml` actions.

**More notes on environments on [Dropbox Paper](https://paper.dropbox.com/doc/ST-Development-Links--AyCKb2pePbiZFUsXW8ShbtBfAg-Y33jYGKY0lmgt8ViSFxaq).**
