/**
 * Static build has trailing `/` in routes
 * Remove leading and trailing backslash for matching
 */
export const trimSlash = (str: string) => str.replace(/^\/+|\/+$/, '');
