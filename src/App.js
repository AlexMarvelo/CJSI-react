import React, { Component } from 'react';
import Transmit from 'react-transmit';
import Navbar from './Navbar';
import VideoItem from './VideoItem';
import videosData from '../data/videos.json';


if (process.env.BROWSER) {
  require('../node_modules/bootstrap/dist/css/bootstrap.css');
  require('./css/1-col-portfolio.css');
}

const App = (props) => {
  // console.dir(props.videos)
  return (
    <div>
      <Navbar />
      <div className={'container'}>
        {props.videos && props.videos.map((value, index) => (
          <VideoItem key={index} data={value}/>
        ))}
      </div>
    </div>
  );
}

App.defaultProps = {
  videos: [],
}

export default Transmit.createContainer(App, {
  // These must be set or else it would fail to render
  initialVariables: {
    videos: []
  },
  // Each fragment will be resolved into a prop
  fragments: {
    videos() {
        if (process.env.BROWSER) {
          return fetch('/videos')
            .then(res => res.json())
            .then(videosObj => videosObj.videos)
        } else {
          return Promise.resolve()
            .then(() => videosData.videos)
        }
    }
  }
});
