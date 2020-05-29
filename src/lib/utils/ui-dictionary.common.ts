import UI from '~/assets/ui-dictionnary/ui.json';

export type UIType = {
  [key: string]: {} | string | number | boolean;
};

export type InterpolationType = {
  [key: string]: string | number | JSX.Element;
};

export let UIData: UIType = UI;

export function setUIData(data: UIType) {
  UIData = data;
}
