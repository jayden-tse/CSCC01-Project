import React, { Component } from "react";

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "About Message" };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    console.log("Profile About edit");
  }
  render() {
    return (
      <div className="ProfileAbout">
        <ProfileAboutMessage message={this.state.message} />
        <ProfileAboutEdit name="Edit" onClick={this.handleEdit} />
      </div>
    );
  }
}
function ProfileAboutMessage(props) {
  return <p className="ProfileAboutMessage">{props.message}</p>;
}
function ProfileAboutEdit(props) {
  return (
    <button className="ProfileAboutEdit" onClick={props.onClick}>
      {props.name}
    </button>
  );
}
export default ProfileAbout;
