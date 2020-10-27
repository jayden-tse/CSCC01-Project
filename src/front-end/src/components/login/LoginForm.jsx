import React, { Component } from "react";
import logo from "../../resources/sportcredLogo2.png";
import "./LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { LoginError: false, Email: "", Password: "" };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLoginSubmit() {
    //on login error
    this.setState({ LoginError: true });
  }

  render() {
    return (
      <div className="LoginForm">
        <img className="SportcredLogo" src={logo} alt="Sportcred Logo" />
        <LoginInput
          type="text"
          name="Email"
          value={this.state.Email}
          onChange={this.handleChange}
        />
        <LoginInput
          type="password"
          name="Password"
          value={this.state.Password}
          onChange={this.handleChange}
          hidden={true}
        />
        {this.state.LoginError && (
          <LoginInputError message="Error Logging In" />
        )}
        <br />
        <LoginSubmit onClick={this.handleLoginSubmit} name="Login" />
        <br />
        <LoginToSignup message="Or make a new account here" />
      </div>
    );
  }
}

function LoginInput(props) {
  return (
    <form className="LoginInput">
      <label className="LoginInputLabel">{props.name}</label>
      <input
        className="LoginInputBox"
        type={props.type}
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
      />
    </form>
  );
}

function LoginInputError(props) {
  return <label className="LoginInputError">{props.message}</label>;
}

function LoginSubmit(props) {
  return (
    <button className="LoginSubmit" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function LoginToSignup(props) {
  return (
    <a className="LoginToSignup" href=".">
      {props.message}
    </a>
  );
}

export default LoginForm;
