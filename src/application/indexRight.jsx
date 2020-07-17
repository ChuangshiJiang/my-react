import React from "react";

export default class IndexUseClasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount () {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate () {
    document.title = `You clicked ${this.state.count} times`;
  }

  render () {
    let { title, content } = this.props;
    return (
      <div>
        <div className="index">
          {title}
        </div>
        <div className="content">
          {content}
        </div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>Click Me</button>
      </div>
    )
  }
}
