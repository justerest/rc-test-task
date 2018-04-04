import * as React from 'react';
import { IMatrix } from 'models/matrix';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
}

@connect(
  (state) => ({ matrix: state.matrix }),
)
export class Home extends React.Component<IProps, {}> {

  public render() {
    const { matrix } = this.props;

    const table = matrix.value
      .map((line, i) => line.map((cell, j) => <td key={i + ',' + j}>{cell}</td>))
      .map((line, i) => <tr key={i}>{line}</tr>);

    console.log(matrix.value);

    return (
      <div className={style.Home}>
        <p>Матрица</p>
        <table>
          <tbody>
            {table}
          </tbody>
        </table>
      </div>
    );
  }
}
