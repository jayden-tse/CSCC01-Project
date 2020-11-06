import React, { Component } from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileACS from './ProfileACS';
import ProfilePicture from './ProfilePicture';
import ProfileStatus from './ProfileStatus';
import ProfileRadar from './ProfileRadar';
import ProfileSocial from './ProfileSocial';
import './ProfilePage.css';

/*note: currentUser is the user logged in currently
wantedUser is the user whose page is shown*/

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const editable = this.props.currentUser === this.props.wantedUser;
    return (
      <div className="ProfilePage">
        <ProfilePicture
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={editable}
        />
        <ProfileAbout
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={editable}
        />
        <ProfileStatus
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={editable}
        />
        <ProfileACS
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
        />
        <ProfileRadar
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={editable}
          handleViewProfile={this.props.handleViewProfile}
        />
        <ProfileSocial
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={editable}
        />
      </div>
    );
  }
}

export default ProfilePage;
