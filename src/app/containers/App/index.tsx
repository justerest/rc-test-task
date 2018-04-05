const appConfig = require('../../../../config/main');

import * as React from 'react';
import { Helmet } from 'react-helmet';

const style = require('./style.css');

export class App extends React.Component<any, any> {
  public render() {
    return (
      <section className={style.AppContainer}>
        <Helmet {...appConfig.app} {...appConfig.app.head} />
        {this.props.children}
      </section>
    );
  }
}
