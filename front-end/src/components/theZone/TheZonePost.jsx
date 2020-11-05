import React from "react";
import "./TheZonePost.css";
import TheZoneCreateComment from "./TheZoneCreateComment";

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
      agreeHidden: false,
      selectedOption: "Agree"
    };
    this.addComment = this.addComment.bind(this);
    this.hideAgree = this.hideAgree.bind(this);
    this.showAgree = this.showAgree.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.handleAgreeSubmit = this.handleAgreeSubmit.bind(this);
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

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
    
  }

  //Debug message for now 
  handleAgreeSubmit() {
    console.log(this.state.selectedOption)
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
            <input
              className="agreeOptions"
              type="radio"
              value="Agree"
              checked={this.state.selectedOption === "Agree"}
              onChange={this.onValueChange}
            /> 
            <label className="agreeText"> Agree </label>
            <input
              className="agreeOptions"
              type="radio"
              value="Disagree"
              checked={this.state.selectedOption === "Disagree"}
              onChange={this.onValueChange}
            /> 
            <label className="agreeText"> Disagree </label>
            <button
              className="agreeButton"
              onClick={this.handleAgreeSubmit}
            >Submit</button>
  
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
            <p>Posted by:<span>{this.state.poster}</span></p>
          </div>
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