export interface IMatrix {
  value: IMatrixItem[][];
  log: IMatrixHistory[];
  domainsLength?: number;
  isChecked?: boolean;
}

export interface IMatrixItem {
  value: number;
  n: number;
  m: number;
  domain?: number;
}

export interface IMatrixHistory {
  N: number;
  M: number;
  domainsLength: number;
  chance: number;
}

export interface IMatrixAction {
  type: string;
  payload?: {
    N?: number;
    M?: number;
    n?: number;
    m?: number;
    chance?: number;
  };
}
