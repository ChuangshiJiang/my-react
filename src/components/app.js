import React, { Component } from 'react';
import AppList from './AppList.js';
import AppForm from './AppForm.js';
import AppFooter from './AppFooter.js';

export default class App extends Component {
  state = {
    chooseValue: 1,
    data: this.props.data
  }
  render () {
    return (
      <div className="ui comments">
        <h1>My Todo with React</h1>
        <div className="ui divider"></div>
        <AppForm></AppForm>
        <AppList data={this.state.data}></AppList>
        <AppFooter></AppFooter>
      </div>
    )
  }
}