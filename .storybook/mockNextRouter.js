import Router from 'next/router';

Router.router = {
  push: () => Promise.resolve(),
  prefetch: () => Promise.resolve(),
};
