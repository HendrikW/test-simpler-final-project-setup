import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'


// I think we should make it as synchronous as possible to get the user. 
// possibly just not rendering anything until the backend answers with potential user information
axios.get('/user').then(res => {
  ReactDOM.render(<App user={res.data}/>, document.getElementById('root')); 
}).catch(err => {
  alert('backend not running or /user route not defined !')
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
