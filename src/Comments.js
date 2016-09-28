import React, { Component } from 'react';
export default class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentsVisability: false,
      videoID: this.props.data.id,
      comments: [
        {
          id: 1,
          header: 'First comment header',
          text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
        }
      ]
    }

    this.toggleVisability = function(event) {
      event.preventDefault();
      this.setState({commentsVisability: !this.state.commentsVisability});
    }.bind(this);

    this.addComment = function(event) {
      event.preventDefault();
    }.bind(this);
  }

  render() {
    const commentsList = this.state.comments.map((value, index) => {
      if (!this.state.commentsVisability) return;
      return (
        <div className='media' key={value.id}>
          <div className='media-left'>
            <img className='media-object' src='http://placehold.it/64x64' alt='Avatar'/>
          </div>
          <div className='media-body'>
            <h4 className='media-heading'>{value.header}</h4>
            <p>{value.text}</p>
          </div>
        </div>
      )
    });

    var addBtn, inputComment;
    if (this.state.commentsVisability) {
      addBtn = (
        <a className='btn btn-primary btn-addComment' onClick={this.addComment} href='#'>
          Add comment <span className='glyphicon glyphicon-pencil'></span>
        </a>
      )

      inputComment = (
        <textarea className="form-control comment-textarea" placeholder='Type your comment here' rows="2"></textarea>
      )
    };

    return (
      <div>
        <a className='btn btn-default btn-toggleComments' onClick={this.toggleVisability} href='#'>
          {this.state.commentsVisability ? 'Hide comments ' : 'Show comments ' }
          <span className='glyphicon glyphicon-comment'></span>
        </a>
        {commentsList}
        {inputComment}{addBtn}
      </div>
    )
  }
}
