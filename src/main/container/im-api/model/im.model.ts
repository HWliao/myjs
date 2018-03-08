export interface ImModel {
  init: () => Promise<any>;
  destroy: () => Promise<any>;
}
