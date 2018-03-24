import 'rxjs/add/operator/do';
import { imLayoutEpic } from '../epics';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { imSidebarClickHeaderAction } from '../../im-sidebar/actions';
import { ActionsObservable } from 'redux-observable';
import { imLayoutDownAction, imLayoutUpAction } from '../actions';
import { createStore } from 'redux';
import { Map } from 'immutable';

const store = createStore(() => (Map({})));
describe('im layout epics', () => {
  describe('im sidebar header click action', () => {
    it('should return im layout down action', (done) => {
      const input$ = new BehaviorSubject(imSidebarClickHeaderAction(true));
      const action$ = new ActionsObservable(input$);
      imLayoutEpic(action$, store, {})
        .do((action) => {
          expect(action).toEqual(imLayoutDownAction());
        })
        .subscribe(done);
    });
    it('should return im layout up action', (done) => {
      const input$ = new BehaviorSubject(imSidebarClickHeaderAction(false));
      const action$ = new ActionsObservable(input$);
      imLayoutEpic(action$, store, {})
        .do((action) => {
          expect(action).toEqual(imLayoutUpAction());
        })
        .subscribe(done);
    });
  });
});
