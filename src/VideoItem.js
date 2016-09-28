import React, { Component } from 'react';
import Title from './Title';
import Video from './VideoContent';
import Comments from './Comments';

export default class VideoItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      description: this.props.data.description,
    }
  }

  render() {
    return (
      <div className='well'>
        <div className='row'>
          <div className={'col-lg-6'}>
            <Video url={this.props.data.video} />
          </div>
          <div className={'col-lg-6'}>
            <Title title={this.state.title} />
            <p>{this.state.description}</p>
            <Comments videoID={this.state.id}/>
          </div>
        </div>
      </div>
    );
  }
}
