export interface IMatrix {
  value: number[][];
  N: number;
  M: number;
  domainsLength?: number;
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
