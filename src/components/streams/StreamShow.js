import React, { Component } from 'react';
import {connect} from 'react-redux'
import { fetchStream } from '../../actions'
class StreamShow extends Component{
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderStream() {
    const { stream } = this.props
    if(!stream){
      return <div>This stream no longer exists.</div>
    }

    return (
      <React.Fragment>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </React.Fragment>
    )
  }
  render() {
    return (
      <div>{this.renderStream()}</div>
    );
  }
};

const mapStatetoProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id]}
}
export default connect(
  mapStatetoProps, 
  { fetchStream }
)(StreamShow);