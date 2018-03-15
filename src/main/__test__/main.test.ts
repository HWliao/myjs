import * as ImApi from '../im-api/im';
import JJSIM from '../main';

describe('main', () => {
  it('createIm should call getImInstance', () => {
    const im: any = 'test';
    spyOn(ImApi, 'getImInstance').and.returnValue(im);
    return JJSIM.createIm().then((theIm) => {
      expect(theIm).toEqual(im);
    });
  });

  it('createImAndInit should call createIm', () => {
    const im: any = {
      init: () => Promise.resolve()
    };
    spyOn(ImApi, 'getImInstance').and.returnValue(im);
    return JJSIM.createImAndInit({}).then((theIm) => {
      expect(theIm).toBe(im);
    });
  });
});
