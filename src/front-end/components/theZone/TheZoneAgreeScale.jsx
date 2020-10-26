import React from "react";

class TheZoneAgreeScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      agreePercentage:0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  //TODO :CALL BACKEND APIS FOR SUBMIT
  handleSubmit() {
    
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return(
      <div>
        <div>
          <input 
            name="agreePercentage"
            type="range"
            min="0"
            max="100"
            step="1"
            value={this.state.agreePercentage}
            onChange={this.handleChange}
          >
          </input>
          <span>{this.state.agreePercentage}</span>
        </div>
        <button onClick={this.handleSubmit}>Agree</button>
      </div>
    );
  }
}

export default TheZoneAgreeScale;