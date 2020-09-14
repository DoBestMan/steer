import { STATIC_MODAL_IDS } from '../constants/staticModals';
import { isValidStaticModal } from './modal';

describe('utils/modal', () => {
  describe('isValidStaticModal', () => {
    it('should return true when a valid modal ID is passed', () => {
      expect(
        isValidStaticModal(STATIC_MODAL_IDS.CATALOG_FILTER_LOAD_INDEX),
      ).toEqual(true);
      expect(isValidStaticModal(STATIC_MODAL_IDS.GLOBAL_EASY_RETURN)).toEqual(
        true,
      );
    });

    it('should return false when an invalid modal ID is passed', () => {
      jest.spyOn(global.console, 'info').mockImplementation();

      expect(isValidStaticModal('ANINVALIDMODALID')).toEqual(false);
    });
  });
});
