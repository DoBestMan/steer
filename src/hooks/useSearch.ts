import { useState, useEffect } from 'react';

type Search = {
  [key: string]: string | boolean | number;
};

export function useSearch(): Search {
  const [search, setSearch] = useState<Search>({});

  useEffect(() => {
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

    setSearch(params);
  }, []);

  return search;
}
