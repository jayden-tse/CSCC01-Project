import React from "react";

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
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label> Post Body: </label>
        </div>
        <textarea
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        >              
        </textarea>
        <div>
        <button onClick={this.handleSubmit}> Submit Post </button>
        </div>
      </div>
    );
  }
}

export default TheZoneCreatePost;