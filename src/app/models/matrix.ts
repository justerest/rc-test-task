export interface IMatrix {
  value: (0 | 1)[][];
  N: number;
  M: number;
  domainsLength?: number;
}

export interface IMatrixAction {
  type: string;
  payload?: {
    N?: number;
    M?: number;
  };
}
