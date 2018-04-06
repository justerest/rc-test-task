export interface IMatrix {
  value: IMatrixItem[][];
  chance?: number;
  domainsLength?: number;
  isChecked?: boolean;
}

export interface IMatrixItem {
  value: number;
  n: number;
  m: number;
  domain?: number;
}

export interface IMatrixAction {
  type: string;
  payload?: {
    N?: number;
    M?: number;
    n?: number;
    m?: number;
  };
}
