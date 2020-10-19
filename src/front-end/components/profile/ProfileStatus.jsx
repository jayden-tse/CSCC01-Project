import React, { Component } from "react";

class ProfileStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "Status Message" };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    console.log("Profile Status edit");
  }
  render() {
    return (
      <div className="ProfileStatus">
        <ProfileStatusMessage message={this.state.message} />
        <ProfileStatusEdit name="Edit" onClick={this.handleEdit} />
      </div>
    );
  }
}
function ProfileStatusMessage(props) {
  return <p className="ProfileStatusMessage">{props.message}</p>;
}
function ProfileStatusEdit(props) {
  return (
    <button className="ProfileStatusEdit" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

export default ProfileStatus;
