import { IMatrix, IMatrixAction } from 'models/matrix';
import { getDomainsCount, invertMatrixItem } from 'modules/matrix';
import * as React from 'react';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
  invertMatrixItem: Redux.ActionCreator<IMatrixAction>;
  getDomainsCount: Redux.ActionCreator<IMatrixAction>;
}

@connect(
  (state) => ({ matrix: state.matrix }),
  (dispatch) => ({
    invertMatrixItem: (n: number, m: number) => dispatch(invertMatrixItem(n, m)),
    getDomainsCount: () => dispatch(getDomainsCount()),
  }),
)
export class Home extends React.Component<IProps, {}> {

  public render() {
    const { matrix, invertMatrixItem, getDomainsCount } = this.props;
    const colors = new Map<number, string>();
    const table = [];

    for (let n = 0; n < matrix.N; n++) {
      const row = [];
      table.push(
        <tr key={n}>{row}</tr>,
      );
      for (let m = 0; m < matrix.M; m++) {
        const item = matrix.value[n][m];
        if (!colors.has(item.domain)) {
          colors.set(item.domain, '#' + (Math.round(Math.random() * 0XFFFFFF)).toString(16));
        }
        row.push(
          <td key={n + ',' + m}
            className={style.matrix__item}
            style={{ background: item.value ? colors.get(item.domain) : 'none' }}
            onClick={invertMatrixItem.bind(null, n, m)}>
            {item.value}
          </td>,
        );
      }
    }

    return (
      <div className={style.home}>
        <p>Матрица (доменов: {matrix.domainsLength})</p>
        <table className={style.matrix}>
          <tbody>
            {table}
          </tbody>
        </table>
        <button className={style.button} onClick={getDomainsCount}>Посчитать домены</button>
      </div>
    );
  }
}
