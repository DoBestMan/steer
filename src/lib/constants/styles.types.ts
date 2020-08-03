import { CSSObject } from '@emotion/core';

export type CSSObjectType = { [classname: string]: CSSObject };

export type CSSStyles = CSSObject | Array<CSSObject | Array<CSSObject>>;

export type StylesMap = { [classname: string]: CSSStyles };

// used when passing styles as a prop - reference this type in Props interface
export type CSSStylesProp = CSSStyles | Array<CSSStyles>;
