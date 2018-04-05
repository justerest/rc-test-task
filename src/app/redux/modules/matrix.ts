import { IMatrix, IMatrixAction, IMatrixItem } from 'models/matrix';

/** Action Types */
export const SET_SIZE: string = 'matrix/SET_SIZE';
export const INVERT_ITEM: string = 'matrix/INVERT_ITEM';
export const GET_DOMAINS_COUNT: string = 'matrix/GET_DOMAINS_COUNT';

/** Matrix: Initial State */
const initialState: IMatrix = {
  value: createEmptyMatrix(7, 7),
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
      const item = state.value[n][m];
      item.value = +!item.value;
      return Object.assign({}, state);

    case GET_DOMAINS_COUNT:
      const positiveItems = new Set<IMatrixItem>();
      const domains = new Map<number, IMatrixItem[]>();

      for (const row of state.value) {
        for (const item of row) {
          if (item.value) {
            item.domain = positiveItems.size;
            domains.set(item.domain, [item]);
            positiveItems.add(item);
          }
        }
      }

      for (const item of positiveItems) {
        const neighbors = [];
        if (item.m + 1 < state.value[0].length) {
          const rightNeighbor = state.value[item.n][item.m + 1];
          neighbors.push(rightNeighbor);
        }
        if (item.n + 1 < state.value.length) {
          const downNeighbor = state.value[item.n + 1][item.m];
          neighbors.push(downNeighbor);
        }

        const mergeDomains = (next) => {
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
