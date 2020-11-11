import React, { Component } from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileACS from './ProfileACS';
import ProfilePicture from './ProfilePicture';
import ProfileStatus from './ProfileStatus';
import ProfileRadar from './ProfileRadar';
import ProfileSocial from './ProfileSocial';
import { getProfile, getUserPicture, setUserPicture } from '../../api/ProfileCalls.js';
import './ProfilePage.css';

/*note: currentUser is the user logged in currently
wantedUser is the user whose page is shown*/
const VIEW = 'View',
  EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

  var SAMPLE = [
    { username: 'demouser', ACS: 100 },
    { username: 'demouser25', ACS: 200 },
    { username: '123asdqw132feq', ACS: 300 },
    { username: 'Choose', ACS: 400 },
    { username: 'user5', ACS: 500 },
  ];

class ProfilePage extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        ACS: 0,
        ACSChange: 0,
        ACSError:false,
        About: '',
        AboutEdit: '',
        AboutMode: VIEW,
        Picture: '',
        PictureEdit: '',
        PictureMode: VIEW,
        Status: '',
        StatusEdit: '',
        StatusMode: VIEW,
        Social: [
            'https://www.facebook.com',
            'https://twitter.com',
            'https://www.instagram.com/',
          ],
        SocialEdit: [
            'https://www.facebook.com',
            'https://twitter.com',
            'https://www.instagram.com/',
          ],
        SocialMode: VIEW,
        CurrentIsFollowing:false,
        WantedFollowList: SAMPLE
    };

    //a lot of bloat rn, refactor later
    this.AboutHandleEdit = this.AboutHandleEdit.bind(this);
    this.AboutHandleSave = this.AboutHandleSave.bind(this);
    this.AboutHandleCancel = this.AboutHandleCancel.bind(this);
    this.AboutHandleChange = this.AboutHandleChange.bind(this);

    this.PictureHandleEdit = this.PictureHandleEdit.bind(this);
    this.PictureHandleSave = this.PictureHandleSave.bind(this);
    this.PictureHandleCancel = this.PictureHandleCancel.bind(this);
    this.PictureHandleChange = this.PictureHandleChange.bind(this);
    
    this.StatusHandleEdit = this.StatusHandleEdit.bind(this);
    this.StatusHandleSave = this.StatusHandleSave.bind(this);
    this.StatusHandleCancel = this.StatusHandleCancel.bind(this);
    this.StatusHandleChange = this.StatusHandleChange.bind(this);

    this.SocialHandleEdit = this.SocialHandleEdit.bind(this);
    this.SocialHandleSave = this.SocialHandleSave.bind(this);
    this.SocialHandleCancel = this.SocialHandleCancel.bind(this);
    this.SocialHandleChange = this.SocialHandleChange.bind(this);

    this.RadarHandleFollow = this.RadarHandleFollow.bind(this);
}

updateShownUser(){
    //expect to get json object with ACS, acs change later
    getProfile(this.props.wantedUser).then((profile)=>{
        if(profile.error === true){
            throw "error getting profile";
        }
        this.setState({
            ACS: profile.ACS,
            ACSChange: 0,
            ACSError:false,
            About: profile.about,
            AboutEdit: profile.about,
            AboutMode: VIEW,
            Picture: profile.picture,
            PictureEdit: profile.picture,
            PictureMode: VIEW,
            Status: profile.status,
            StatusEdit: profile.status,
            StatusMode: VIEW,
            Social: [
                'https://www.facebook.com',
                'https://twitter.com',
                'https://www.instagram.com/',
            ],
            SocialEdit: [
                'https://www.facebook.com',
                'https://twitter.com',
                'https://www.instagram.com/',
            ],
            SocialMode: VIEW,
            CurrentIsFollowing:false,
            WantedFollowList: [...SAMPLE]
        });
    }).catch((error) => {
        //will throw if somethings missing
            console.log(error);
            console.log('Error with profile response');
            this.setState({ ACSError: true });
            });
}

componentDidMount() {
    this.updateShownUser();
}

componentDidUpdate(prevProps) {
    if(this.props.wantedUser !== prevProps.wantedUser){
        this.updateShownUser();
    }
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

  PictureHandleEdit() {
    if (this.props.editable) {
      console.log('Profile Picture edit');
      this.setState({ PictureMode: EDIT });
    } else {
      console.log('Edit not authorised');
    }
  }

  PictureHandleSave() {
    console.log('Profile Picture save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.PictureHandleCancel();
      return;
    }

    //change picture in database
    setUserPicture(this.props.currentUser, this.state.PictureEdit);
    //if successful, change message in state
    this.setState({ Picture: this.state.PictureEdit });

    this.setState({ PictureMode: VIEW });
  }

  PictureHandleCancel() {
    console.log('Profile Picture cancel');

    //reset editMessage
    this.setState({ PictureEdit: this.state.Picture });

    this.setState({ PictureMode: VIEW });
  }

  PictureHandleChange(e) {
    this.setState({ PictureEdit: e.target.value });
  }

  StatusHandleEdit() {
    if (this.props.editable) {
      console.log('Profile Status edit');
      this.setState({ StatusMode: EDIT });
    } else {
      console.log('Edit not authorised');
    }
  }

  StatusHandleSave() {
    console.log('Profile Status save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.StatusHandleCancel();
      return;
    }
    this.setState({ Status: this.state.StatusEdit });
    this.setState({ StatusMode: VIEW });
  }

  StatusHandleCancel() {
    console.log('Profile Status cancel');

    //reset editMessage
    this.setState({ StatusEdit: this.state.Status });
    this.setState({ StatusMode: VIEW });
  }

  StatusHandleChange(e) {
    this.setState({ StatusEdit: e.target.value });
  }

  SocialHandleEdit(e) {
    if (this.props.editable) {
      console.log('Profile Social edit');
      this.setState({ SocialMode: EDIT });
    } else {
      console.log('Edit not authorised');
    }
  }

  SocialHandleSave() {
    console.log('Profile Social save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.SocialHandleCancel();
      return;
    }
    //if successful, change message in state
    this.setState({ Social: this.state.SocialEdit });
    this.setState({ SocialMode: VIEW });
  }

  SocialHandleCancel() {
    console.log('Profile Social cancel');

    //reset editMessage
    this.setState({ SocialEdit: this.state.Social });
    this.setState({ SocialMode: VIEW });
  }

  SocialHandleChange(e, id) {
    var tempLinks = [...this.state.SocialEdit]; //clone array
    tempLinks[id] = e.target.value;
    this.setState({ SocialEdit: tempLinks });
  }

  RadarHandleFollow() {
    //toggle following
    this.setState({ CurrentIsFollowing: !this.state.CurrentIsFollowing });
  }

  render() {
    return (
      <div className="ProfilePage">
        <ProfilePicture
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.PictureMode}
          picture={this.state.Picture}
          handleEdit={this.PictureHandleEdit}
          handleSave={this.PictureHandleSave}
          handleCancel={this.PictureHandleCancel}
          handleChange={this.PictureHandleChange}
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
          mode={this.state.StatusMode}
          message={this.state.Status}
          handleEdit={this.StatusHandleEdit}
          handleSave={this.StatusHandleSave}
          handleCancel={this.StatusHandleCancel}
          handleChange={this.StatusHandleChange}
        />
        <ProfileACS
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          ACS={this.state.ACS}
          ACSChange={this.state.ACSChange}
          ACSError={this.state.ACSError}
        />
        <ProfileRadar
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          handleViewProfile={this.props.handleViewProfile}
          handleFollow={this.RadarHandleFollow}
          CurrentIsFollowing={this.state.CurrentIsFollowing}
          WantedFollowList={this.state.WantedFollowList}
        />
        <ProfileSocial
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.SocialMode}
          links={this.state.Social}
          handleEdit={this.SocialHandleEdit}
          handleSave={this.SocialHandleSave}
          handleCancel={this.SocialHandleCancel}
          handleChange={this.SocialHandleChange}
        />
      </div>
    );
  }
}

export default ProfilePage;
