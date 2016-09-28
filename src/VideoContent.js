import React, { Component } from 'react';
export default class VideoContent extends Component {
  render() {
    return <div className="videoContainer text-center">
        <iframe
          src={this.props.url}
          frameBorder="5"
          width="520"
          height="247"
          allowFullScreen
        />
      </div>
  }
}
