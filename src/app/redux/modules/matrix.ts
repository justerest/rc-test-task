import { IMatrix, IMatrixAction, IMatrixItem } from 'models/matrix';

export const COUNT_DOMAINS = 'matrix/COUNT_DOMAINS';
export const INVERT_ITEM = 'matrix/INVERT_ITEM';
export const SET_RANDOM = 'matrix/SET_RANDOM';
export const SET_SIZE = 'matrix/SET_SIZE';

/** Matrix: Initial State */
const initialState: IMatrix = {
  value: createEmptyMatrix(5, 6),
  log: [],
};

/** Reducer: MatrixReducer */
export function matrixReducer(state = initialState, action?: IMatrixAction): IMatrix {
  switch (action.type) {
    case SET_SIZE:
      return {
        value: createEmptyMatrix(action.payload.N, action.payload.M),
        log: state.log,
      };

    case INVERT_ITEM:
      toggleItemValue(state.value, action);
      return {
        ...state,
        isChecked: false,
      };

    case COUNT_DOMAINS:
      return {
        ...state,
        domainsLength: generateDomains(state.value),
        isChecked: true,
      };

    case SET_RANDOM:
      const N = state.value.length;
      const M = state.value[0].length;
      const value = createEmptyMatrix(N, M);
      const { chance } = action.payload;

      value.reduce((flatArr, row) => flatArr.concat(row), [])
        .filter(() => Math.random() < chance)
        .forEach((item) => {
          const { n, m } = item;
          toggleItemValue(value, { payload: { n, m }, type: '' });
        });

      const domainsLength = generateDomains(value);
      state.log.push({ chance, N, M, domainsLength });

      return {
        value,
        log: state.log.slice(-10),
        domainsLength,
        isChecked: true,
      };

    default:
      return state;
  }
}

export function setSize(N: number, M: number): IMatrixAction {
  return {
    type: SET_SIZE,
    payload: { N, M },
  };
}

export function invertItem(n: number, m: number): IMatrixAction {
  return {
    type: INVERT_ITEM,
    payload: { n, m },
  };
}

export function countDomains(): IMatrixAction {
  return {
    type: COUNT_DOMAINS,
  };
}

export function setAutoValue(chance: number): IMatrixAction {
  return {
    type: SET_RANDOM,
    payload: { chance },
  };
}

function createEmptyMatrix(N: number, M: number) {
  const matrix: IMatrixItem[][] = [];

  for (let n = 0; n < N; n++) {
    matrix.push([]);
    for (let m = 0; m < M; m++) {
      matrix[n].push({ n, m, value: 0 });
    }
  }

  return matrix;
}

function toggleItemValue(state: IMatrixItem[][], action: IMatrixAction) {
  const { n, m } = action.payload;
  const item = state[n][m];
  item.value = +!item.value;
  return state;
}

function generateDomains(state: IMatrixItem[][]) {
  const domains = new Set<number>();

  const mergeDomains = (item: IMatrixItem, ...neighbors: IMatrixItem[]) => {
    neighbors.filter((next) => next && next.value)
      .filter((next) => item.domain !== next.domain)
      .forEach((next: IMatrixItem) => {
        const [min, max] = [item, next].sort((a, b) => a.domain.value - b.domain.value);
        domains.delete(max.domain.value);
        max.domain.value = min.domain.value;
        max.domain = min.domain;
      });
    return item;
  };

  state.reduce((flatArr, row) => flatArr.concat(row), [])
    .filter((item) => item.value)
    .map((item, i) => {
      item.domain = { value: i };
      domains.add(i);
      return item;
    })
    .map((item) => {
      const rightNeighbor = item.m + 1 < state[0].length && state[item.n][item.m + 1];
      const downNeighbor = item.n + 1 < state.length && state[item.n + 1][item.m];
      return mergeDomains(item, rightNeighbor, downNeighbor);
    })
    .reverse()
    .forEach((item) => {
      const leftNeighbor = item.m > 0 && state[item.n][item.m - 1];
      const upNeighbor = item.n > 0 && state[item.n - 1][item.m];
      mergeDomains(item, leftNeighbor, upNeighbor);
    });

  return domains.size;
}
