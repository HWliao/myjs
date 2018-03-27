import { createDependencies, createRootEpic } from '../epics';
import * as ImCore from '../../im-core/im-core';
import * as ImApi from '../../im-api/im';

describe('epics', () => {
  it('should not be crash', () => {
    try {
      createRootEpic();
      expect(true).toBeTruthy();
    } catch (e) {
      expect(false).toBeTruthy();
    }
  });
  it('should get the dependencies', () => {
    spyOn(ImCore, 'getImCoreInstance').and.returnValue('imcore');
    spyOn(ImApi, 'getImInstance').and.returnValue('imapi');
    expect(createDependencies()).toEqual({core: 'imcore', api: 'imapi'});
  });
});
