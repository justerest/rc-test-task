import { IMatrix, IMatrixAction, IMatrixItem } from 'models/matrix';
// import { combineReducers } from 'redux';

/** Action Types */
export const SET_SIZE = 'matrix/SET_SIZE';
export const INVERT_ITEM = 'matrix/INVERT_ITEM';
export const COUNT_DOMAINS = 'matrix/COUNT_DOMAINS';
export const CREATE_RANDOM = 'matrix/CREATE_RANDOM';

/** Matrix: Initial State */
const initialState: IMatrix = {
  value: createEmptyMatrix(5, 6),
};

/** Reducer: MatrixReducer */
export function matrixReducer(state = initialState, action?: IMatrixAction): IMatrix {
  switch (action.type) {
    case SET_SIZE:
      return {
        value: createEmptyMatrix(action.payload.N, action.payload.M),
      };

    case INVERT_ITEM:
      return {
        ...state,
        value: invertItem(state.value, action),
        isChecked: false,
      };

    case COUNT_DOMAINS:
      return {
        ...state,
        domainsLength: countDomains(state.value),
        isChecked: true,
      };

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

export function countMatrixDomains(): IMatrixAction {
  return {
    type: COUNT_DOMAINS,
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

function invertItem(state: IMatrixItem[][], action: IMatrixAction) {
  const { n, m } = action.payload;
  const item = state[n][m];
  item.value = +!item.value;
  return state;
}

function countDomains(state: IMatrixItem[][]) {
  const positiveItems = new Set<IMatrixItem>();
  const domains = new Map<number, IMatrixItem[]>();

  for (const row of state) {
    for (const item of row) {
      if (item.value) {
        item.domain = positiveItems.size;
        domains.set(item.domain, [item]);
        positiveItems.add(item);
      }
    }
  }

  for (const item of positiveItems) {
    const neighbors: IMatrixItem[] = [];
    if (item.m + 1 < state[0].length) {
      const rightNeighbor = state[item.n][item.m + 1];
      neighbors.push(rightNeighbor);
    }
    if (item.n + 1 < state.length) {
      const downNeighbor = state[item.n + 1][item.m];
      neighbors.push(downNeighbor);
    }
    const mergeDomains = (next: IMatrixItem) => {
      const [max, min] = [item, next].sort((a, b) => b.domain - a.domain);
      const maxDomain = max.domain;
      const minDomain = min.domain;
      domains.get(maxDomain).forEach((el) => el.domain = minDomain);
      domains.get(minDomain).push(...domains.get(maxDomain));
      domains.delete(maxDomain);
    };
    neighbors
      .filter((next) => positiveItems.has(next))
      .filter((next) => item.domain !== next.domain)
      .forEach(mergeDomains);
  }

  return domains.size;
}
