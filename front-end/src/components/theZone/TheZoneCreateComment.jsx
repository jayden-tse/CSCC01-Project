import React from "react";

class TheZoneCreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      body: "" 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  //TODO: call backend api and submit comment with state values
  handleSubmit() {
    if (this.state.title!==""&&this.state.body!=="") {
       this.setState({ body:"" })
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <label> Comment: </label>
        </div>
        <textarea
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        >              
        </textarea>
        <div>
        <button onClick={this.handleSubmit}> Submit Comment </button>
        </div>
      </div>
    );
  }
}

export default TheZoneCreateComment;