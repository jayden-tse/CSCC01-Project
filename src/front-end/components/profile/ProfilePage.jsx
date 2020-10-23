import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileACS from "./ProfileACS";
import ProfilePicture from "./ProfilePicture";
import ProfileStatus from "./ProfileStatus";
import "./ProfilePage.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: props.username };
  }

  render() {
    return (
      <div className="ProfilePage">
        <ProfilePicture username={this.state.username} />
        <ProfileAbout username={this.state.username} />
        <ProfileStatus username={this.state.username} />
        <ProfileACS username={this.state.username} />
      </div>
    );
  }
}

export default ProfilePage;
