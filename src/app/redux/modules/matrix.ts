import { IMatrix, IMatrixAction, IMatrixItem } from 'models/matrix';

/** Action Types */
export const SET_SIZE: string = 'matrix/SET_SIZE';
export const INVERT_ITEM: string = 'matrix/INVERT_ITEM';
export const GET_DOMAINS_COUNT: string = 'matrix/GET_DOMAINS_COUNT';

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

    case INVERT_ITEM:
      const { n, m } = action.payload;
      state.value[n][m].value = +!state.value[n][m].value;
      return Object.assign({}, state);

    case GET_DOMAINS_COUNT:
      const allItemsWithValue1 = new Set<IMatrixItem>();
      const domains = new Set<number>();

      for (const row of state.value) {
        for (const item of row) {
          if (item.value) {
            item.domain = allItemsWithValue1.size;
            domains.add(allItemsWithValue1.size);
            allItemsWithValue1.add(item);
          }
        }
      }

      for (const item of allItemsWithValue1) {
        const right = item.m + 1 < state.M && state.value[item.n][item.m + 1];
        const down = item.n + 1 < state.N && state.value[item.n + 1][item.m];

        [right, down]
          .filter((next) => allItemsWithValue1.has(next))
          .filter((next) => item.domain < next.domain)
          .forEach((next) => {
            domains.delete(next.domain);
            next.domain = item.domain;
          });
      }

      return Object.assign({}, state, { domainsLength: domains.size });

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

export function invertMatrixItem(n: number, m: number): IMatrixAction {
  return {
    type: INVERT_ITEM,
    payload: { n, m },
  };
}

export function getDomainsCount(): IMatrixAction {
  return {
    type: GET_DOMAINS_COUNT,
  };
}

function createEmptyMatrix(N: number, M: number) {
  const matrix: IMatrix['value'] = [];

  for (let n = 0; n < N; n++) {
    matrix.push([]);
    for (let m = 0; m < M; m++) {
      matrix[n].push({ n, m, value: 0 });
    }
  }

  return matrix;
}
