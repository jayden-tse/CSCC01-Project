import React from "react";
import "./TheZonePost.css";
import TheZoneCreateComment from "./TheZoneCreateComment";
import TheZoneAgreeScale from "./TheZoneAgreeScale";

class TheZonePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: "POST TITLE",
      poster: "Poster",
      body: "POST BODY",
      agreePercent: 56, 
      comments: [
        "first comment",
        "second comment",
        "third comment"
      ]
    };
  }
  
  //TODO: get post data from back end api given the post id
  // and set the post data with state
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className="post">        
        <div className="postHeader">
          <div className="percentageDisplay">
            <h2 className="percentageText">{this.state.agreePercent}% Agree</h2>
          </div>
          <div className="agree">
            <TheZoneAgreeScale postid={this.props.postid} />
          </div>
          <h1 className="title">{this.state.title}</h1>
          <p>Posted by:<span>{this.state.poster}</span></p>
        </div>
        <p>{this.state.body}</p>
        <div className="comment">
          {this.state.comments.map(
            comment => <p>{comment}</p>
          )}
          <TheZoneCreateComment 
            postid={this.props.postid} 
          />
        </div>
        
      </div>
    );
  }
}

export default TheZonePost;