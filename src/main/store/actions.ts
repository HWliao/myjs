import { FluxStandardAction } from 'typesafe-actions';

export interface BaseAction<T extends string = string, P = any, M= any> extends FluxStandardAction<T, P, M> {

}
