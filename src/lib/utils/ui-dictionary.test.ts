import { ui } from '~/lib/utils/ui-dictionary';
import { setUIData, UIType } from '~/lib/utils/ui-dictionary.common';

const UIData: UIType = {
  common: {
    aBoolean: true,
    aDangerousInterpolation: 'My name is {{- name}}',
    anArray: [],
    anInterpolation: 'My name is {{name}}',
    anObject: {},
    aNumber: 23,
    aString: 'this is a string',
  },
};

describe('ui-dictionary', () => {
  beforeEach(() => {
    setUIData(UIData);
  });

  it('should return an correct value, a string', () => {
    const answer = ui('common.aString');

    expect(answer).toEqual('this is a string');
  });

  it('should return an correct value, a number', () => {
    const answer = ui('common.aNumber');

    expect(answer).toEqual('23');
  });

  it('should return an correct value, a boolean', () => {
    const answer = ui('common.aBoolean');

    expect(answer).toEqual('true');
  });

  it('should return a correct interpolated value, sanitized', () => {
    const answer = ui('common.anInterpolation', {
      name: 'Slim Shady, <p>A paragraph</p>',
    });

    expect(answer).toEqual(
      'My name is Slim Shady, &lt;p&gt;A paragraph&lt;/p&gt;',
    );
  });

  it('should return a correct interpolated value, unsanitized', () => {
    const answer = ui('common.aDangerousInterpolation', {
      name: 'Slim Shady, <p>A paragraph</p>',
    });

    expect(answer).toEqual('My name is Slim Shady, <p>A paragraph</p>');
  });

  it('should return the original key as the final value is an object', () => {
    const answer = ui('common.anObject');

    expect(answer).toEqual('common.anObject');
  });

  it('should return the original key as the final value is an array', () => {
    const answer = ui('common.anArray');

    expect(answer).toEqual('common.anArray');
  });

  it("should return the original key as the final value doesn't exist", () => {
    const answer = ui('common.doesnt.Exist');

    expect(answer).toEqual('common.doesnt.Exist');
  });

  it('should return the original key as the final value is not interpolated correctly', () => {
    const answer = ui('common.anInterpolation', { tar: 'zan' });

    expect(answer).toEqual('My name is {{name}}');
  });
});
