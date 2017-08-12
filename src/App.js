import React, { Component } from 'react';
import Navbar from './Navbar';
import VideoItem from './VideoItem';

if (global.window) {
	require('../node_modules/bootstrap/dist/css/bootstrap.css');
	require('./css/1-col-portfolio.css');
}


export default class App extends Component {
  constructor(props){
    super(props);
    let inputData = require('./data/videos.json');
    this.state = {
      videos: inputData.videos
    }
  }

  render() {
    const items = this.state.videos.map((value, index) => {
      return <VideoItem key={index} data={value}/>
    })

    return (
      <div>
        <Navbar />
        <div className={'container'}>
          {items}
        </div>
      </div>

    );
  }
}
