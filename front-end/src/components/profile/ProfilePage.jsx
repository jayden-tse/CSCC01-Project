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
const VIEW = 'View',
  EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfilePage extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        About: '',
        AboutEdit: '',
        AboutMode: VIEW,
    };

    this.AboutHandleEdit = this.AboutHandleEdit.bind(this);
    this.AboutHandleSave = this.AboutHandleSave.bind(this);
    this.AboutHandleCancel = this.AboutHandleCancel.bind(this);
    this.AboutHandleChange = this.AboutHandleChange.bind(this);
}

  AboutHandleEdit() {
    if (this.props.editable) {
      console.log('Profile About edit');
      this.setState({ AboutMode: EDIT });
    } else {
      console.log('Edit not authorised');
    }
  }

  AboutHandleSave() {
    console.log('Profile About save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.AboutHandleCancel();
      return;
    }
    //change message in database

    //if successful, change message in state
    this.setState({ About: this.state.AboutEdit });
    this.setState({ AboutMode: VIEW });
  }

  AboutHandleCancel() {
    console.log('Profile About cancel');
    //reset editMessage
    this.setState({ AboutEdit: this.state.AboutEdit });
    this.setState({ AboutMode: VIEW });
  }

  AboutHandleChange(e) {
    this.setState({ AboutEdit: e.target.value });
  }

  render() {
    return (
      <div className="ProfilePage">
        <ProfilePicture
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
        />
        <ProfileAbout
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.AboutMode}
          message={this.state.About}
          handleEdit={this.AboutHandleEdit}
          handleSave={this.AboutHandleSave}
          handleCancel={this.AboutHandleCancel}
          handleChange={this.AboutHandleChange}
        />
        <ProfileStatus
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
        />
        <ProfileACS
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
        />
        <ProfileRadar
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          handleViewProfile={this.props.handleViewProfile}
        />
        <ProfileSocial
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
        />
      </div>
    );
  }
}

export default ProfilePage;
