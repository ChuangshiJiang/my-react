import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.js';
let data= [
  {id:0,text:'吃饭',complete:false},
  {id:1,text:'喝水',complete:false},
  {id:2,text:'读书',complete:true},
  {id:3,text:'健身',complete:false},
];
ReactDom.render(
  <App data={data}/>,
  document.getElementById('app')
);