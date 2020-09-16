import { boolean } from '@storybook/addon-knobs';

import DataTableVertical from './DataTableVertical';

export default {
  component: DataTableVertical,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Global/DataTables/DataTableVertical',
};
export function DataTablesVerticalWithKnobs() {
  const columns = {
    columnS: [
      { label: 'Model Year', width: 100 },
      { label: 'Trim & tire size', width: 205 },
      { label: 'Trim & tire size', width: 205 },
    ],
    columnM: [
      { label: 'Model Year', width: 150 },
      { label: 'Trim & tire size', width: 220 },
      { label: 'Trim & tire size', width: 220 },
    ],
    columnL: [
      { label: 'Model Year', width: 200 },
      { label: 'Trim & tire size', width: 300 },
      { label: 'Trim & tire size', width: 300 },
    ],
  };
  const data = [
    {
      dataRow: [
        { label: '2018-2019' },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
      ],
    },
    {
      dataRow: [
        { label: '2018-2019' },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
      ],
    },
    {
      dataRow: [
        { label: '2018-2019' },
        {
          link: { href: '/tire-sizes/lt285-70r-17-tires', isExternal: false },
          label: 'Unlimited Rubicon<br /><b>LT285/70R17/C 116Q</b>',
        },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
      ],
    },
    {
      dataRow: [
        { label: '2018-2019' },
        {
          link: { href: '/tire-sizes/lt285-70r-17-tires', isExternal: false },
          label: 'Rubicon<br /><b>LT285/70R17/C 116Q</b>',
        },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
      ],
    },
    {
      dataRow: [
        { label: '2018-2019' },
        {
          link: { href: '/tire-sizes/lt245-75r-17-tires', isExternal: false },
          label: 'Sport<br /><b>245/75R17 116S</b>',
        },
        {
          link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
          label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
        },
      ],
    },
  ];

  const isFirsColumnFixed = boolean('Is First Column Fixed?', true);
  return (
    <DataTableVertical
      columns={columns}
      data={data}
      isFirstColumnFixed={isFirsColumnFixed}
      caption={'Trim and Tire Sizes Data Table'}
    />
  );
}
