import { ui } from '~/lib/utils/ui-dictionary';

import {
  ANCHORS,
  DEFAULT_ANCHOR_LINKS,
  mapDataToAnchorList,
  PAID_ANCHOR_LINKS,
  Params,
} from './anchorList';

describe('pages/ProductDetails/mappers/anchorList', () => {
  const mockParams = {
    insights: {},
    installation: {},
    isPLA: false,
    technicalSpecs: {},
  } as Params; // typecasting for ease of testing (internal object data doesn't matter)

  describe('when isPLA is false', () => {
    it('returns default anchor links', () => {
      expect(mapDataToAnchorList(mockParams)).toStrictEqual(
        DEFAULT_ANCHOR_LINKS,
      );
    });
  });

  describe('when isPLA is true', () => {
    beforeAll(() => {
      mockParams.isPLA = true;
    });

    it('returns paid anchor links when isPLA is true', () => {
      expect(mapDataToAnchorList(mockParams)).toStrictEqual(PAID_ANCHOR_LINKS);
    });
  });

  describe('when insights is null', () => {
    beforeAll(() => {
      mockParams.insights = null;
    });

    it('does not return the insights anchor', () => {
      expect(mapDataToAnchorList(mockParams)).not.toContain({
        anchor: ANCHORS.INSIGHTS_ANCHOR,
        label: ui('pdp.anchorBar.insights'),
        offset: -60,
      });
    });
  });

  describe('when technicalSpecs is null', () => {
    beforeAll(() => {
      mockParams.technicalSpecs = null;
    });

    it('does not return the technicalSpecs anchor', () => {
      expect(mapDataToAnchorList(mockParams)).not.toContain({
        anchor: ANCHORS.TECH_SPECS_ANCHOR,
        label: ui('pdp.anchorBar.specs'),
        offset: -20,
      });
    });
  });

  describe('when installation is null', () => {
    beforeAll(() => {
      mockParams.installation = null;
    });

    it('does not return the installation anchor', () => {
      expect(mapDataToAnchorList(mockParams)).not.toContain({
        anchor: ANCHORS.INSTALLATION_ANCHOR,
        label: ui('pdp.anchorBar.installation'),
      });
    });
  });
});
