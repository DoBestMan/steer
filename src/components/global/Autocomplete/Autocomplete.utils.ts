export const getItemDOMId = (base: string, id: string) => `${base}-${id}`;

export const generateIDs = (base: string) => ({
  invalidID: getItemDOMId(`${base}-listbox-item`, 'invalid'),
  labelID: `${base}-autocomplete`,
  listboxID: `${base}-listbox`,
  listboxItemID: `${base}-listbox-item`,
});
