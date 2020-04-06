# Simpletire STEER

Dependencies

- [nvm]: https://github.com/nvm-sh/nvm

## Installation

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

Finally, install the `node_modules`. (Note, we're using `npm` because ZEIT Now prefers it.)

```bash
npm i 
```

You're all set!

## Development

As the project use Now env. variables, to start a local server:

```bash
now dev
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
