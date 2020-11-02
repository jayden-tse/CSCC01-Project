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
      ],
      agreeHidden:false
    };
    this.addComment = this.addComment.bind(this);
    this.hideAgree = this.hideAgree.bind(this);
    this.showAgree = this.showAgree.bind(this);
  }

  // add a new comment to the comments list with its message = data
  addComment(data) {
    const newComments = this.state.comments.concat(data);
    this.setState({
      comments: newComments
		})
	}
  //TODO: get post data from back end api given the post id
  // and set the post data with state
  componentDidMount() {
    
  }

  hideAgree() {
    this.setState({
      agreeHidden: true
    })
  }

  showAgree() {
    this.setState({
      agreeHidden: false
    })
  }
  
  render() {
    const isHidden = this.state.agreeHidden;
    let agree = null;
    if (!isHidden) {
      agree =
        (<div>
          <div className="percentageDisplay">
            <button className="smlButton" onClick={this.hideAgree}>-</button>
            <h2 className="percentageText">{this.state.agreePercent}% Agree</h2>
          </div>
          <div className="agree">
            <TheZoneAgreeScale postid={this.props.postid} />
          </div>
         </div>);
    } else {
      agree = (<button className="smlButton" onClick={this.showAgree}>+</button>);
		}
    return (
      <div className="post">        
        <div className="postHeader">
       
          {agree}
          <div className="titleContainer">
            <h1 className="title">{this.state.title}</h1>
          </div>
          <p>Posted by:<span>{this.state.poster}</span></p>
        </div>
        <p>{this.state.body}</p>
        <div className="comment">
          {this.state.comments.map(
            comment => <p>{comment}</p>
          )}
          <TheZoneCreateComment 
            addComment={this.addComment}
            postid={this.props.postid} 
          />
        </div>
        
      </div>
    );
  }
}

export default TheZonePost;