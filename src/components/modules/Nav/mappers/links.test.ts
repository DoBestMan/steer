import { buildLinks } from '~/components/modules/Nav/mappers/links';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';

describe('Nav links', () => {
  test('creating links - no personalization data', () => {
    const { links } = buildLinks({ locationString: '' });

    expect(links).toEqual(
      expect.arrayContaining([
        {
          icon: 'location',
          label: 'Select location',
          target: NAV_TARGETS.LOCATION,
          text: '',
        },
      ]),
    );
  });

  test('creating links - personalization data', () => {
    const { links } = buildLinks({ locationString: 'Portland, OR' });

    expect(links).toEqual(
      expect.arrayContaining([
        {
          icon: 'location',
          label: 'Select location',
          target: NAV_TARGETS.LOCATION,
          text: 'Portland, OR',
        },
      ]),
    );
  });
});
