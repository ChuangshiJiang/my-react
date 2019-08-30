import React from 'react';

let styles = {
  'title':{
    paddingLeft:'20px',
    paddingRight:'50px',
    position:'relative'
  },
  'delete':{
    marginLeft:'20px',
    marginRight:'50px'
  }
}
export default class AppTodos extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render () {
    return (
      <div className="comment">
        <div className="content">
          <span className="author" style={styles.title}>
            {this.props.text}
            <span className={this.props.complete?'line':''}></span>
          </span>
          <span className="author" style={styles.title}>
            {this.props.complete?'已完成':'未完成'}
          </span>
          <span className="author">{this.props.id}</span>
          <span className="ui blue button" style={styles.delete}>
            删除
          </span>
        </div>
      </div>
    )
  }
}