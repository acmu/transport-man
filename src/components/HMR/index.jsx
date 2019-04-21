import React from 'react';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      n1: 10,
      n2: 300,
    };
    this.handleN1 = this.handleN1.bind(this);
    this.handleN2 = this.handleN2.bind(this);
  }

  handleN1() {
    this.setState({
      n1: this.state.n1 + 2,
    });
  }

  handleN2() {
    this.setState({
      n2: this.state.n2 + 10,
    });
  }

  render() {
    const { n1, n2 } = this.state;
    return (
      <div>
        <button onClick={this.handleN1}>1</button>
        <button onClick={this.handleN2}>2</button>
        <p>n1 {n1}</p>
        <p>n2 {n2}</p>
      </div>
    );
  }
}

export default hot(App);
