import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = { msg: "loading...." }
  }

  componentDidMount() {
    axios.get('/test').then(res => this.setState({ msg: res.data.message }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            {this.state.msg}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
