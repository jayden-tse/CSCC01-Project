import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class TheZoneCreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: "",
      body: "" 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  //TODO: call backend api and submit post with state values
  handleSubmit() {
    if (this.state.title!==""&&this.state.body!=="") {
        this.setState({ title:"", body:"" })
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <label> Post Title: </label>
        </div>
        <div>
          <input
            className="postTitle"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label> Post Body: </label>
        </div>
        <TextareaAutosize
          rowsMin={3}  
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        />              
        <div>
        <button onClick={this.handleSubmit}> Submit Post </button>
        </div>
      </div>
    );
  }
}

export default TheZoneCreatePost;