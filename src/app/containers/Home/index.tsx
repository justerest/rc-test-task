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
  chance: string;
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
    chance: '5',
  };

  constructor(props) {
    super(props);
    this.setMatrixSize = this.setMatrixSize.bind(this);
    this.setRandomMatrixValue = this.setRandomMatrixValue.bind(this);
  }

  public render() {
    const { matrix, countMatrixDomains } = this.props;

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
                type="number"
              />
            </div>
            <button className={style.button} type="submit">
              Задать матрицу
            </button>
          </form>

          <form onSubmit={this.setRandomMatrixValue} >
            <div className={style['input-group']}>
              <label htmlFor="chance">Вероятность: 0,</label>
              <input id="chance"
                className={style.input + ' ' + style.input_ml_0}
                max="99" min="1"
                value={this.state.chance}
                onChange={this.handleChangeInput.bind(this, 'chance')}
                type="number"
              />
            </div>
            <button className={style.button} type="submit">
              АВТО
            </button>
          </form>
        </section>

      </div>
    );
  }

  private setMatrixSize(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setMatrixSize(this.state.N, this.state.M);
  }

  private setRandomMatrixValue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setRandomMatrixValue(parseFloat('0.' + this.state.chance));
  }

  private handleChangeInput(key: keyof IState, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.setState({ [key]: value } as any);
  }

}
