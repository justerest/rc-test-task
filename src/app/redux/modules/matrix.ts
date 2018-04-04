import { IMatrix, IMatrixAction } from 'models/matrix';

/** Action Types */
export const SET_SIZE: string = 'matrix/SET_SIZE';

/** Matrix: Initial State */
const initialState: IMatrix = {
  value: createEmptyMatrix(3, 4),
  N: 2,
  M: 3,
};

/** Reducer: MatrixReducer */
export function matrixReducer(state = initialState, action?: IMatrixAction) {
  switch (action.type) {
    case SET_SIZE:
      return Object.assign({}, state, action.payload, {
        value: createEmptyMatrix(action.payload.N, action.payload.M),
      });

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
