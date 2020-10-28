import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileACS from "./ProfileACS";
import ProfilePicture from "./ProfilePicture";
import ProfileStatus from "./ProfileStatus";
import "./ProfilePage.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ProfilePage">
        <ProfilePicture username={this.props.username} />
        <ProfileAbout username={this.props.username} />
        <ProfileStatus username={this.props.username} />
        <ProfileACS username={this.props.username} />
      </div>
    );
  }
}

export default ProfilePage;
