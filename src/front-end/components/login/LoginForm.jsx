import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loginError: true, Email: "", Password: "" };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name + " " + e.target.value + " changed");
  }

  handleLoginSubmit() {
    console.log("login submit pressed");
    console.log("Email: " + this.state.Email + " Pass: " + this.state.Password);
  }

  render() {
    return (
      <div>
        <LoginInput
          name="Email"
          value={this.state.Email}
          onChange={this.handleChange}
        />
        <LoginInput
          name="Password"
          value={this.state.Password}
          onChange={this.handleChange}
        />
        {this.state.loginError && (
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
    <form>
      <label>{props.name}</label>
      <br />
      <input
        type="text"
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
      />
    </form>
  );
}

function LoginInputError(props) {
  return <label style={{ color: "red" }}>{props.message}</label>;
}

function LoginSubmit(props) {
  return <button onClick={props.onClick}>{props.name}</button>;
}

function LoginToSignup(props) {
  return <a href="https://google.ca/">{props.message}</a>;
}

export default LoginForm;
