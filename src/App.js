import React, { Component } from 'react';
import Navbar from './Navbar';
import VideoItem from './VideoItem';

if (process.env.BROWSER) {
  require('../node_modules/bootstrap/dist/css/bootstrap.css');
  require('./css/1-col-portfolio.css');
}


export default class App extends Component {
  componentWillMount() {
    if (process.env.BROWSER) {
      fetch('/videos')
        .then(res => res.json())
        .then(json => this.setState({ videos: json.videos }));
    }
  }

  constructor(props){
    super(props);
    this.state = {
      videos: []
    };
    
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
