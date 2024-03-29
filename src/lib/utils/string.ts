import { diameterFormat } from './regex';

export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`;

export const abbreviateThousand = (value: number): string =>
  value ? `${value.toString().slice(0, -3)}k` : '0';

export const formatDollars = (cents: string | number): string => {
  const finalCents = typeof cents === 'string' ? parseInt(cents) : cents;
  return (finalCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const ordinalSuffixOf = (i: number): string => {
  const j = i % 10;
  const k = i % 100;

  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const truncateText = (
  str: string,
  length: number,
  ending = '',
): string => {
  if (str.length > length) {
    return str.substring(0, length - ending.length).trim() + ending;
  }
  return str;
};

export const numbersOnly = (text: string): string =>
  text.match(/\d+/g)?.join('') || '';

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const keyToCamel = (text: string): string =>
  text.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  );

export const camelToKey = (text: string): string =>
  text.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const keyToKebab = (text: string): string =>
  capitalize(text).replace(/(-[a-z])/g, ($1) =>
    $1.toUpperCase().replace('-', '_'),
  );

export const minMaxify = (min: number, max: number) => `${min},${max}`;

export const removeInchFromQueryParam = (str: string) =>
  str.replace('-inch', '');

export const removeTireFromQueryParam = (str: string | string[]): string =>
  str ? str.toString().replace(/-tires$/, '') : '';

export const appendTiresToString = (str: string | string[]): string =>
  `${str.toString()}-tires`;

export const tireSizeQueryToTireSize = (s?: string) => {
  if (!s || !s.length) {
    return '';
  }
  return s.replace(/-/, '/').toUpperCase();
};

export const unSlugify = (s: string) => {
  return capitalize(s.replace(/-/, ' '));
};

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export function extractFromDiameterFormat(
  s?: string,
): { categoryOrType: string; size: string } | null {
  if (!s) {
    return null;
  }

  const matches = s.match(diameterFormat);

  if (!matches || !matches.length || matches.length < 5) {
    return null;
  }

  const size = `${matches[1]} inch`;
  let categoryOrType = '';

  for (let i = 3; i < matches.length - 1; i++) {
    categoryOrType += matches[i] + ' ';
  }

  // remove last space + capitalize
  categoryOrType = categoryOrType.substr(0, categoryOrType.length - 1);

  return {
    categoryOrType,
    size,
  };
}

export function replaceAt(str: string, index: number, replacement: string) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}

export function getUrlExtension(url: string): string {
  const extension = url.split('.').pop();
  return extension ? extension : url;
}

export function titleCaseSlug(str: string) {
  return str
    .split('-')
    .map((char) => `${char.charAt(0).toUpperCase()}${char.substring(1)}`)
    .join(' ');
}

export function removeQueryParams(url: string): string {
  return url.split('?')[0];
}

export function removeHashParams(url: string): string {
  return url.split('#')[0];
}

export function removeHashInString(str: string): string {
  return str.replace('#', '');
}

export function removeUrlParams(url: string): string {
  return removeHashParams(removeQueryParams(url));
}

export function hex2a(str1: string) {
  {
    const hex = str1;
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
}

export function getMIMEType(str: string) {
  const mimeTypes = str.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  return mimeTypes && mimeTypes[1];
}

export function getParameterByNameFromUrl(name: string, url: string) {
  /* eslint no-useless-escape: 0 */
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(url);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
