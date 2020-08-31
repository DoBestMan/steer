import { useEffect, useState } from 'react';

type Search = {
  [key: string]: string | boolean | number;
};

export function getQueryParams(): Search {
  if (typeof window === 'undefined') {
    return {};
  }

  const hashes: Array<string> = window.location.search
    .slice(window.location.search.indexOf('?') + 1)
    .split('&');

  const params: Search = {};

  hashes.map((hash) => {
    if (!hash) {
      return;
    }
    const [key, val] = hash.split('=');
    params[key] = decodeURIComponent(val) as string;

    // Boolean
    if (params[key] === 'true') {
      params[key] = true;
    }
    if (params[key] === 'false') {
      params[key] = false;
    }

    // // Number
    if (!Number.isNaN(+params[key]) && typeof params[key] === 'string') {
      params[key] = +params[key];
    }
  });

  return params;
}
export function useQueryParams(): Search {
  const [queryParams, setQueryParams] = useState<Search>(getQueryParams());

  useEffect(() => {
    setQueryParams(getQueryParams());
  }, []);

  return queryParams;
}
