export enum Image {
  BITMAP = 'BITMAP', // external resource
  SVG = 'SVG', // corresponds to an icon in our code
}

export type Loading = 'lazy' | 'eager' | undefined;
