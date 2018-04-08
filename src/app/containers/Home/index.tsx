import Matrix from 'components/Matrix';
import { IMatrix, IMatrixAction } from 'models/matrix';
import { countDomains, setAutoValue, setSize } from 'modules/matrix';
import * as React from 'react';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
  countMatrixDomains: Redux.ActionCreator<IMatrixAction>;
  setMatrixSize: Redux.ActionCreator<IMatrixAction>;
  setRandomMatrixValue: Redux.ActionCreator<IMatrixAction>;
}

interface IState {
  N: number;
  M: number;
  chance: number;
}

@connect(
  (state) => ({ matrix: state.matrix }),
  (dispatch) => ({
    countMatrixDomains: () => dispatch(countDomains()),
    setMatrixSize: (N: number, M: number) => dispatch(setSize(N, M)),
    setRandomMatrixValue: (chance: number) => dispatch(setAutoValue(chance)),
  }),
)
export class Home extends React.Component<IProps, IState> {

  public state = {
    N: 5,
    M: 6,
    chance: 0.5,
  };

  constructor(props) {
    super(props);
    this.setMatrixSize = this.setMatrixSize.bind(this);
    this.setRandomMatrixValue = this.setRandomMatrixValue.bind(this);
  }

  public render() {
    const { matrix, countMatrixDomains } = this.props;

    const matrixHistory = matrix.log.map((historyItem, i) => (
      <tr key={i}>
        <td>{historyItem.chance}</td>
        <td>{historyItem.domainsLength}</td>
        <td>{historyItem.N} x {historyItem.M}</td>
      </tr>
    ));

    return (
      <div className={style.home}>

        <h1 className={style.title}>
          Матрица {matrix.value.length}x{matrix.value[0].length} &nbsp;
          {matrix.isChecked ? `(доменов: ${matrix.domainsLength})` : ''}
        </h1>

        <section><Matrix /></section>

        <section>
          <button className={style.button} onClick={countMatrixDomains}>
            Посчитать домены
          </button>

          <form onSubmit={this.setMatrixSize} >
            <div className={style['input-group']}>
              <label htmlFor="N">N:</label>
              <input id="N"
                className={style.input}
                max="40" min="1"
                value={this.state.N}
                onChange={this.handleChangeInput.bind(this, 'N')}
                required={true}
                type="number"
              />
            </div>
            <div className={style['input-group']}>
              <label htmlFor="M">M:</label>
              <input id="M"
                className={style.input}
                max="40" min="1"
                value={this.state.M}
                onChange={this.handleChangeInput.bind(this, 'M')}
                required={true}
                type="number"
              />
            </div>
            <button className={style.button} type="submit">
              Задать матрицу
            </button>
          </form>

          <form onSubmit={this.setRandomMatrixValue} >
            <div className={style['input-group']}>
              <label htmlFor="chance">Вероятность:</label>
              <input id="chance"
                className={style.input}
                min="0.01" max="0.99" step="0.01"
                value={this.state.chance}
                onChange={this.handleChangeInput.bind(this, 'chance')}
                required={true}
                type="number"
              />
            </div>
            <button className={style.button} type="submit">
              АВТО
            </button>
          </form>
        </section>

        <table className={style['table-log']}>
          <tbody>
            <tr className={style['table-log__header']}>
              <td>Вероятность</td>
              <td>Количество доменов в матрице</td>
              <td>Количество ячеек в матрице</td>
            </tr>
            {matrixHistory}
          </tbody>
        </table>

      </div>
    );
  }

  private setMatrixSize(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setMatrixSize(this.state.N, this.state.M);
  }

  private setRandomMatrixValue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setRandomMatrixValue(this.state.chance);
  }

  private handleChangeInput(key: keyof IState, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.setState({ [key]: parseFloat(value) } as any);
  }

}
