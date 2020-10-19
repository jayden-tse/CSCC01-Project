import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileACS from "./ProfileACS";
import ProfilePicture from "./ProfilePicture";
import ProfileStatus from "./ProfileStatus";

class ProfileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ProfileDisplay">
        <ProfileAbout />
        <ProfileACS />
        <ProfilePicture />
        <ProfileStatus />
      </div>
    );
  }
}

export default ProfileDisplay;
