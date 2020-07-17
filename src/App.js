import React from 'react';
import './style/App.css';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/index';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';

function App (props) {
  const page = {
    title: 'hello',
    content: '你好'
  }
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {
        renderRoutes(routes)
      }
    </HashRouter>
  );
}

export default App;
