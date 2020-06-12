import { CSSObject } from '@emotion/core';

export type CSSObjectType = { [classname: string]: CSSObject };

export type CSSStyles = CSSObject | Array<CSSObject | Array<CSSObject>>;

export type StylesMap = { [classname: string]: CSSStyles };
