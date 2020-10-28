import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
  // and update parent post comment on success to rerender the comments
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
        <TextareaAutosize
          rowsMin={3}
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        />        
        <div>
        <button onClick={this.handleSubmit}> Submit Comment </button>
        </div>
      </div>
    );
  }
}

export default TheZoneCreateComment;