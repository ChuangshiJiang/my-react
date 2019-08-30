import React from 'react';
import AppTodos from './AppTodos.js';

export default class AppList extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render () {
    let value = this.props.choosevalue;
    const a = this.props.data.map(({ id, text, complete }, index) => {
      return <AppTodos
        key={index}
        id={id}
        text={text}
        complete={complete} />
    });
    return (
      <div>
        {a}
      </div>
    )
  }
}