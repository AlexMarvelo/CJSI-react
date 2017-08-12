import React, { Component } from 'react';


export default class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentsVisability: false,
      videoID: this.props.videoID,
      comments: process.env.BROWSER ? JSON.parse(localStorage.getItem(`comm${this.props.videoID}`) || '[]') : [],
    }

    this.toggleVisability = function(event) {
      event.preventDefault();
      this.setState({commentsVisability: !this.state.commentsVisability});
    }.bind(this);

    this.addComment = function(event) {
      event.preventDefault();
      if (!textareaValue.length) return;
      let currentList = this.state.comments;
      this.setState({
        comments: currentList.concat({
          id: currentList.length ? currentList[currentList.length-1].id + 1 : 1,
          header: 'Anonymous user',
          text: textareaValue
        })
      }, () => {
        if (process.env.BROWSER) {
          localStorage.setItem(`comm${this.state.videoID}`, JSON.stringify(this.state.comments));
        }
      });
    }.bind(this);

    var textareaValue;
    this.handleTextarea = function(event) {
      textareaValue = event.target.value;
    }

    this.removeComment = function(event, index) {
      event.preventDefault();
      let currentList = this.state.comments;
      currentList.splice(index, 1);
      this.setState({
        comments: currentList
      }, () => {
        if (!process.env.BROWSER) {
          localStorage.setItem(`comm${this.state.videoID}`, JSON.stringify(this.state.comments));
        }
      });
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
            <a className='btn btn-removeComment' onClick={(event) => this.removeComment(event, index)} href='#'>
              <span className='glyphicon glyphicon-remove'></span>
            </a>
          </div>
        </div>
      )
    });

    var addBlock;
    if (this.state.commentsVisability) {
      addBlock = (
        <form action='#' className='addCommentForm' onSubmit={this.addComment}>
          <textarea
            className="form-control comment-textarea"
            placeholder='Type your comment here'
            onChange={this.handleTextarea}
            rows="2">
          </textarea>
          <a className='btn btn-primary btn-addComment' onClick={this.addComment} href='#'>
            Add comment <span className='glyphicon glyphicon-pencil'></span>
          </a>
        </form>

      )
    };

    return (
      <div>
        <a className='btn btn-default btn-toggleComments' onClick={this.toggleVisability} href='#'>
          {this.state.commentsVisability ? 'Hide comments ' : 'Show comments ' }
          <span className='glyphicon glyphicon-comment'></span>
          <span className="badge">{this.state.comments.length}</span>
        </a>
        {commentsList}
        {addBlock}
      </div>
    )
  }
}
