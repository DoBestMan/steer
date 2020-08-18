import { boolean } from '@storybook/addon-knobs';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

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
  const columnS = [
    { label: 'Model Year', width: 100 },
    { label: 'Trim & tire size', width: 205 },
    { label: 'Trim & tire size', width: 205 },
  ];
  const columnM = [
    { label: 'Model Year', width: 150 },
    { label: 'Trim & tire size', width: 220 },
    { label: 'Trim & tire size', width: 220 },
  ];
  const columnL = [
    { label: 'Model Year', width: 200 },
    { label: 'Trim & tire size', width: 300 },
    { label: 'Trim & tire size', width: 300 },
  ];
  const tableData = [
    {
      ModelYear: { label: '2018-2019' },
      tireSize: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
      tireSize2: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
    },
    {
      ModelYear: { label: '2018-2019' },
      tireSize: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
      tireSize2: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
    },
    {
      ModelYear: { label: '2018-2019' },
      tireSize: {
        link: { href: '/tire-sizes/lt285-70r-17-tires', isExternal: false },
        label: 'Unlimited Rubicon<br /><b>LT285/70R17/C 116Q</b>',
      },
      tireSize2: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
    },
    {
      ModelYear: { label: '2018-2019' },
      tireSize: {
        link: { href: '/tire-sizes/lt285-70r-17-tires', isExternal: false },
        label: 'Rubicon<br /><b>LT285/70R17/C 116Q</b>',
      },
      tireSize2: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
    },
    {
      ModelYear: { label: '2018-2019' },
      tireSize: {
        link: { href: '/tire-sizes/lt245-75r-17-tires', isExternal: false },
        label: 'Sport<br /><b>245/75R17 116S</b>',
      },
      tireSize2: {
        link: { href: '/tire-sizes/st255-70r-18-tires', isExternal: false },
        label: 'Unlimited Sahara<br /><b>255/70R18 113S</b>',
      },
    },
  ];
  const { bk } = useBreakpoints();
  const columns =
    bk === BREAKPOINT_SIZES.S
      ? columnS
      : bk === BREAKPOINT_SIZES.M
      ? columnM
      : columnL;
  const isFirsColumnFixed = boolean('Is First Column Fixed?', true);
  return (
    <DataTableVertical
      columns={columns}
      data={tableData}
      isFirstColumnFixed={isFirsColumnFixed}
      caption={'Trim and Tire Sizes Data Table'}
    />
  );
}
