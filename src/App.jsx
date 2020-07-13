import React from 'react';
import './style/App.css';
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
    <Index {...page}></Index>
  );
}

export default App;
