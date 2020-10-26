import React from "react";
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
  
  //TODO: GET POST DATA FROM BACKEND API
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className="post">        
        <div className="postHeader">
          <div className="agree">
            <h2><span>{this.state.agreePercent}</span>% agree</h2>
            <TheZoneAgreeScale postid={this.props.postid} />
          </div>
          <h1>{this.state.title}</h1>
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