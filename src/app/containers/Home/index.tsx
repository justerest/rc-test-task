import Matrix from 'components/Matrix';
import { IMatrix, IMatrixAction } from 'models/matrix';
import { countMatrixDomains, setMatrixSize } from 'modules/matrix';
import * as React from 'react';

const { connect } = require('react-redux');
const style = require('./style.css');

interface IProps {
  matrix: IMatrix;
  countMatrixDomains: Redux.ActionCreator<IMatrixAction>;
  setMatrixSize: Redux.ActionCreator<IMatrixAction>;
}

interface IState {
  N: number;
  M: number;
}

@connect(
  (state) => ({ matrix: state.matrix }),
  (dispatch) => ({
    countMatrixDomains: () => dispatch(countMatrixDomains()),
    setMatrixSize: (N: number, M: number) => dispatch(setMatrixSize(N, M)),
  }),
)
export class Home extends React.Component<IProps, IState> {

  public state = {
    N: 5,
    M: 6,
  };

  constructor(props) {
    super(props);
    this.setMatrixSize = this.setMatrixSize.bind(this);
  }

  public render() {
    const { matrix, countMatrixDomains } = this.props;

    return (
      <div className={style.home}>

        <h1>
          Матрица {matrix.value.length}x{matrix.value[0].length} &nbsp;
          {matrix.isChecked ? `(доменов: ${matrix.domainsLength})` : ''}
        </h1>

        <Matrix />

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

      </div>
    );
  }

  private setMatrixSize(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setMatrixSize(this.state.N, this.state.M);
  }

  private handleChangeInput(key: keyof IState, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.setState({ [key]: +value } as any);
  }

}
