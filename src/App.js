import React from 'react';
import './style/App.css';
import {GlobalStyle} from './style';
import { IconStyle } from './assets/iconfont/index';
import IndexUseHooks from './page/indexLeft';
import IndexUseClass from './page/indexRight';

function App (props) {
  const page = {
    title: 'hello',
    content: '你好'
  }
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
