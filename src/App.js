import React, { Component } from 'react';
import Home from './views/home/home'
import './App.css';

// 引入redux
import { Provider } from 'react-redux'

// 引入reducer
import store from './redux/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
            <Home></Home>
        </Provider>
      </div>
      
    );
  }
}

export default App;
