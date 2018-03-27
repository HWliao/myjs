import 'rxjs/add/operator/map';
import { BaseEpic } from '../../store/epics';
import { BaseAction } from '../../store/actions';
import { ImSidebarActionType, ImSidebarClickHeaderAction } from '../im-sidebar/actions';
import { imLayoutDownAction, imLayoutUpAction } from './actions';
import { combineEpics } from 'redux-observable';

export const imLayoutEpic: BaseEpic<BaseAction> = (action$) => {
  return action$
    .ofType(ImSidebarActionType.clickHeader)
    .map((action: ImSidebarClickHeaderAction) => action.payload ? imLayoutDownAction() : imLayoutUpAction());
};

export const createImLayoutEpics = () => combineEpics(imLayoutEpic);
