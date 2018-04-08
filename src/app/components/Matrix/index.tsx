import { IMatrix, IMatrixAction } from 'models/matrix';
import { invertItem } from 'modules/matrix';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';

const randomColor = require('randomcolor');
const style = require('./style.css');

const MAX_MATRIX_SIZE = 40 * 40;
const COLORS: string[] = randomColor({ count: MAX_MATRIX_SIZE });

interface IProps {
  matrix: IMatrix;
  invertMatrixItem: Redux.ActionCreator<IMatrixAction>;
}

export class Matrix extends React.Component<IProps, {}> {

  public render() {
    const { matrix, invertMatrixItem } = this.props;
    const N = matrix.value.length;
    const M = matrix.value[0].length;
    const table = [];

    for (let n = 0; n < N; n++) {
      const row = [];

      table.push(
        <tr key={n}>{row}</tr>,
      );

      for (let m = 0; m < M; m++) {
        const item = matrix.value[n][m];

        row.push(
          <td key={n + ',' + m}
            className={style.matrix__item}
            style={{ background: matrix.isChecked && item.value ? COLORS[item.domain.value] : 'none' }}
            onClick={invertMatrixItem.bind(null, n, m)}>
            {item.value}
          </td>,
        );
      }
    }

    return (
      <table className={style.matrix}>
        <tbody>
          {table}
        </tbody>
      </table>
    );
  }
}

export default connect(
  ({ matrix }: IStore) => ({ matrix }),
  (dispatch) => ({
    invertMatrixItem: (n: number, m: number) => dispatch(invertItem(n, m)),
  }),
)(Matrix);
