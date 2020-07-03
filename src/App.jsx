import React from 'react';
import './style/App.css';
import { context } from './components/context';

function App() {
  const themeColor = '#ccc';
  const config = {
    themeColor,
  }
  return (
    <context.Provider vlaue={config}></context.Provider>
  );
}

export default App;
