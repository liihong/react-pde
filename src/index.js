import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/reset.css';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import Route from './router/';
import store from './redux/index';
import {Provider} from 'react-redux';
import { AppContainer } from 'react-hot-loader';


const render = Component => {
    ReactDOM.render(
      //绑定redux、热加载
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      document.getElementById('root'),
    )
  }
  
render(Route);  
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

registerServiceWorker();
