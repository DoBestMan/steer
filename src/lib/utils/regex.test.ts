import { absoluteLink, email, specialLink, validBrandQuery } from './regex';

describe('utils/regex', () => {
  describe('absoluteLink', () => {
    it('returns true if link is absolute', () => {
      expect(absoluteLink.test('https://simpletire.com')).toEqual(true);
      expect(absoluteLink.test('https://simpletire.com/about')).toEqual(true);
      expect(absoluteLink.test('http://simpletire.com/contact')).toEqual(true);
    });

    it('returns false if link is relative', () => {
      expect(absoluteLink.test('/about')).toEqual(false);
      expect(absoluteLink.test('/contact/locations/main/email')).toEqual(false);
    });
  });

  describe('email', () => {
    it('returns true if string is a valid email', () => {
      expect(email.test('contact@simpletire.com')).toEqual(true);
      expect(email.test('contact@simpletire.co')).toEqual(true);
      expect(email.test('sales@simpletire.com.uk')).toEqual(true);
      expect(email.test('contact_+123@simpletire.net')).toEqual(true);
    });

    it('returns false if string is not a valid email', () => {
      expect(email.test('sales@ simpletire.com')).toEqual(false);
      expect(email.test('contact@simpletire')).toEqual(false);
      expect(email.test('contactsimpletire.com')).toEqual(false);
    });
  });

  describe('specialLink', () => {
    it('returns true if link is special', () => {
      expect(specialLink.test('https://simpletire.com')).toEqual(true);
      expect(specialLink.test('https://simpletire.com/about')).toEqual(true);
      expect(specialLink.test('http://simpletire.com/contact')).toEqual(true);
    });

    it('returns false if link is not special', () => {
      expect(specialLink.test('/about')).toEqual(false);
      expect(specialLink.test('/contact/locations/main/email')).toEqual(false);
    });
  });

  describe('validBrandQuery', () => {
    it('returns true string ends in `-tires`', () => {
      expect(validBrandQuery.test('achilles-tires')).toEqual(true);
      expect(validBrandQuery.test('12-inch-winter-tires')).toEqual(true);
    });

    it('returns false string does not end in `-tires', () => {
      expect(validBrandQuery.test('achilles-atr-sport-2')).toEqual(false);
      expect(
        validBrandQuery.test('14-inch-winter-tires-and-more-words'),
      ).toEqual(false);
    });
  });
});
