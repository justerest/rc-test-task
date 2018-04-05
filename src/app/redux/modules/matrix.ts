import { IMatrix, IMatrixAction } from 'models/matrix';

/** Action Types */
export const SET_SIZE: string = 'matrix/SET_SIZE';
export const INVERT_CELL: string = 'matrix/INVERT_CELL';

/** Matrix rows count */
const N = 5;
/** Matrix columns count */
const M = 6;

/** Matrix: Initial State */
const initialState: IMatrix = {
  N,
  M,
  value: createEmptyMatrix(N, M),
  domainsLength: 0,
};

/** Reducer: MatrixReducer */
export function matrixReducer(state = initialState, action?: IMatrixAction) {
  switch (action.type) {
    case SET_SIZE:
      return Object.assign({}, state, action.payload, {
        value: createEmptyMatrix(action.payload.N, action.payload.M),
      });

    case INVERT_CELL:
      const row = state.value[action.payload.n];
      const { m } = action.payload;
      row[m] = +!row[m];

      const all1 = new Set();
      for (let i = 0; i < state.N; i++) {
        for (let j = 0; j < state.M; j++) {
          if (state.value[i][j]) {
            all1.add(i + ',' + j);
          }
        }
      }
      console.log(...all1);

      return Object.assign({}, state);

    default:
      return state;
  }
}

export function setMatrixSize(N = 1, M = 1): IMatrixAction {
  return {
    type: SET_SIZE,
    payload: { N, M },
  };
}

export function invertMatrixCell(n: number, m: number): IMatrixAction {
  return {
    type: INVERT_CELL,
    payload: { n, m },
  };
}

function createEmptyMatrix(N: number, M: number) {
  const matrix = [];
  for (let i = 0; i < N; i++) {
    matrix.push([]);
    for (let j = 0; j < M; j++) {
      matrix[i].push(0);
    }
  }

  return matrix;
}
