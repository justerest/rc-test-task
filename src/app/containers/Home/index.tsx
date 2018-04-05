import { IMatrix, IMatrixAction } from 'models/matrix';
import { countDomains, invertItem } from 'modules/matrix';
import * as React from 'react';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
  invertMatrixItem: Redux.ActionCreator<IMatrixAction>;
  countMatrixDomains: Redux.ActionCreator<IMatrixAction>;
}

@connect(
  (state) => ({ matrix: state.matrix }),
  (dispatch) => ({
    invertMatrixItem: (n: number, m: number) => dispatch(invertItem(n, m)),
    countMatrixDomains: () => dispatch(countDomains()),
  }),
)
export class Home extends React.Component<IProps, {}> {

  public render() {
    const { matrix, invertMatrixItem, countMatrixDomains } = this.props;
    const colors = new Map<number, string>();
    const table = [];

    for (let n = 0; n < matrix.value.length; n++) {
      const row = [];

      table.push(
        <tr key={n}>{row}</tr>,
      );

      for (let m = 0; m < matrix.value[n].length; m++) {
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

        <p>Матрица {'domainsLength' in matrix ? `(доменов: ${matrix.domainsLength})` : ''}</p>

        <table className={style.matrix}>
          <tbody>
            {table}
          </tbody>
        </table>

        <button className={style.button} onClick={countMatrixDomains}>
          Посчитать домены
        </button>

      </div>
    );
  }
}
