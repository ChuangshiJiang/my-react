import React from 'react';
import './style/App.css';
import { context } from './components/context';
import Index from './page/index';

function App (props) {
  const themeColor = '#ccc';
  const config = {
    themeColor,
  }
  const page = {
    title: 'hello',
    content: '你好'
  }
  return (
    <context.Provider vlaue={config}>
      <Index {...page}></Index>
    </context.Provider>
  );
}

export default App;
