import { ICounter } from 'models/counter';
import { IMatrix } from 'models/matrix';
import { IStars } from 'models/stars';

export interface IStore {
  counter: ICounter;
  matrix: IMatrix;
  stars: IStars;
};
