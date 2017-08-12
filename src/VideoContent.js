import React, { Component } from 'react';


const VideoContent = (props) => (
	<div className="videoContainer text-center">
        <iframe
          src={props.url}
          frameBorder="5"
          width="520"
          height="247"
          allowFullScreen
        />
    </div>
);

export default VideoContent;
