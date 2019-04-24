import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = { 
    msg: "loading.... (this text is set in App's initial state)",
    user: this.props.user
  }

  componentDidMount() {
    axios.get('/test').then(res => this.setState({ msg: res.data.message }))
  }

  // can be used by login and logout components to set/unset the user object
  setTheUser = (user) => {
    this.setState({ user })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* we can place a Login component here with a setTheUser callback function */}
          {/* <Login setTheUser={this.setTheUser}></Login> */}
          <p>
            The following message was retrieved with a relative path ('/test') with the help of react proxy:
          </p>
          <p>
            {this.state.msg}
          </p>
          <p>
            This is synchronous user information (if it was retrieved directly after browser-reload):
          </p>
          <p>
            {this.state.user.fullName}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
