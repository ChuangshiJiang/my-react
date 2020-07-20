import React from 'react';
import './style/App.css';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/index';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import store from './store/index';
import { Provider } from 'react-redux';


function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {
          renderRoutes(routes)
        }
      </HashRouter>
    </Provider>
  );
}

export default App;
