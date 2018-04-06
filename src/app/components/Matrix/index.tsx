import { IMatrix, IMatrixAction } from 'models/matrix';
import { invertMatrixItem } from 'modules/matrix';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';
import { COLORS } from 'utils/colors';

const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
  invertMatrixItem: Redux.ActionCreator<IMatrixAction>;
}

export class Matrix extends React.Component<IProps, {}> {

  public render() {
    const { matrix, invertMatrixItem } = this.props;
    const table = [];

    for (let n = 0; n < matrix.value.length; n++) {
      const row = [];

      table.push(
        <tr key={n}>{row}</tr>,
      );

      for (let m = 0; m < matrix.value[n].length; m++) {
        const item = matrix.value[n][m];

        row.push(
          <td key={n + ',' + m}
            className={style.matrix__item}
            style={{ background: matrix.isChecked && item.value ? COLORS[item.domain] : 'none' }}
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
  (state: IStore) => ({ matrix: state.matrix }),
  (dispatch) => ({
    invertMatrixItem: (n: number, m: number) => dispatch(invertMatrixItem(n, m)),
  }),
)(Matrix);
