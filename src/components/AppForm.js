import React from 'react';
import uuid from 'uuid';

let styles = {
  'title': {
    width: 20,
    display: 'inline-block',
    marginRight: 10,
    verticalAlign: 'top'
  }
}

class AppForm extends React.Component {
  render () {
    return (
      <form className="ui reply from">
        <div className="field" style={styles.title}>
          <input type="text" placeholder="TODO" ref='text' />
        </div>
        <button type="submit" className="ui blue button">添加</button>
      </form>
    )
  }
}

export default AppForm;