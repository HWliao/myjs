import { BaseAction } from '../store/actions';

export function createActionCFWithJustType<P extends string>(type: P): () => BaseAction<P> {
  function actionCF() {
    return {type};
  }

  return actionCF;
}
