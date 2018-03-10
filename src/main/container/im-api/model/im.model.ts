export interface ImModel {
  init: () => Promise<any>;
  destroy: () => Promise<any>;
  toggleShow: (show?: boolean) => void;
  toggleUp: (up?: boolean) => void;
}
