import React from 'react';
import './style/index.css';
import IndexUseHooks from './page/indexLeft';
import IndexUseClass from './page/indexRight';

function App (props) {
  const page = {
    title: 'hello',
    content: '你好'
  }
  return (
    <div className="examples">
      <div className="left">
        <IndexUseHooks {...page}></IndexUseHooks>
      </div>
      <div className="right">
        <IndexUseClass {...page}></IndexUseClass>
      </div>
    </div>
  );
}

export default App;
