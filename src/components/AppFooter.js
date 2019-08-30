import React from 'react';

export default class AppFooter extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  handleAll(){
    let all = this.refs.all.value;
    this.props.SubmitChooseValue(all);
  }
  handleActive(){
    let active = this.refs.active.value;
    this.props.SubmitChooseValue(active);
  }
  handleComplete(){
    let complete = this.refs.complete.value;
    this.props.SubmitChooseValue(complete);
  }
  render () {
    return (
      <div>
        <h2>show</h2>
        <button type="submit"
          className="ui blue button"
          value="1"
          ref="all"
          onClick={this.handleAll.bind(this)}
        >全部
        </button>
        <button type="submit"
          className="ui blue button"
          value="1"
          ref="all"
          onClick={this.handleActive.bind(this)}
        >未完成
        </button>
        <button type="submit"
          className="ui blue button"
          value="1"
          ref="all"
          onClick={this.handleComplete.bind(this)}
        >完成
        </button>

      </div>
    )
  }
}