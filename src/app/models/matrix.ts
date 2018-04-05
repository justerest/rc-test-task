export interface IMatrix {
  value: IMatrixItem[][];
  domainsLength?: number;
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
