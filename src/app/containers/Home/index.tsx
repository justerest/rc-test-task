import { IMatrix, IMatrixAction } from 'models/matrix';
import { invertMatrixCell } from 'modules/matrix';
import * as React from 'react';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
  invertMatrixCell: Redux.ActionCreator<IMatrixAction>;
}

@connect(
  (state) => ({ matrix: state.matrix }),
  (dispatch) => ({
    invertMatrixCell: (n: number, m: number) => dispatch(invertMatrixCell(n, m)),
  }),
)
export class Home extends React.Component<IProps, {}> {

  public render() {
    const { matrix } = this.props;

    const table = matrix.value
      .map((line, i) => line.map((cell, j) => (
        <td key={i + ',' + j}
          className={style.matrix__item}
          onClick={this.props.invertMatrixCell.bind(null, i, j)}>
          {cell}
        </td>
      )))
      .map((line, i) => <tr key={i}>{line}</tr>);

    return (
      <div className={style.home}>
        <p>Матрица</p>
        <table className={style.matrix}>
          <tbody>
            {table}
          </tbody>
        </table>
      </div>
    );
  }
}
