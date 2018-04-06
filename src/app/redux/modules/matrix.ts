import { IMatrix, IMatrixAction, IMatrixItem } from 'models/matrix';

export const COUNT_DOMAINS = 'matrix/COUNT_DOMAINS';
export const INVERT_ITEM = 'matrix/INVERT_ITEM';
export const SET_RANDOM = 'matrix/SET_RANDOM';
export const SET_SIZE = 'matrix/SET_SIZE';

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
        value: toggleItemValue(state.value, action),
        isChecked: false,
      };

    case COUNT_DOMAINS:
      return {
        ...state,
        domainsLength: getDomainsCount(state.value),
        isChecked: true,
      };

    case SET_RANDOM:
      const value = createEmptyMatrix(state.value.length, state.value[0].length);
      for (const row of state.value) {
        for (const item of row) {
          if (Math.random() < action.payload.chance) {
            action.payload.n = item.n;
            action.payload.m = item.m;
            toggleItemValue(value, action);
          }
        }
      }
      return {
        value,
        domainsLength: getDomainsCount(value),
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

function getDomainsCount(state: IMatrixItem[][]) {
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
