import React, { Component } from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileACS from './ProfileACS';
import ProfilePicture from './ProfilePicture';
import ProfileStatus from './ProfileStatus';
import ProfileRadar from './ProfileRadar';
import ProfileSocial from './ProfileSocial';
import { getProfile, updateUserAbout, updateUserPicture, addProfileTracker, 
    deleteProfileTracker, updateUserStatus } from '../../api/ProfileCalls.js';
import './ProfilePage.css';

/*note: currentUser is the user logged in currently
wantedUser is the user whose page is shown*/
const VIEW = 'View',
  EDIT = 'Edit',
  MODE = 'Mode',
  ABOUT = 'About',
  STATUS = 'Status',
  PICTURE = 'Picture',
  SOCIAL = 'Social';

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

    //generic functions
    this.GenericHandleEdit = this.GenericHandleEdit.bind(this);
    this.GenericHandleCancel = this.GenericHandleCancel.bind(this);
    this.GenericHandleChange = this.GenericHandleChange.bind(this);

    //save functions (call handles might be different)
    this.AboutHandleSave = this.AboutHandleSave.bind(this);
    this.PictureHandleSave = this.PictureHandleSave.bind(this);
    this.StatusHandleSave = this.StatusHandleSave.bind(this);
    this.SocialHandleSave = this.SocialHandleSave.bind(this);

    //non-generic functions
    this.SocialHandleChange = this.SocialHandleChange.bind(this);
    this.RadarHandleFollow = this.RadarHandleFollow.bind(this);
}

updateShownUser(){
    //expect to get json object with ACS, acs change later
    getProfile(this.props.wantedUser).then((profile)=>{
        if(profile.error === true){
            throw new Error("error getting profile");
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

    GenericHandleEdit(caller){
        if (this.props.editable) {
            console.log(`Profile ${caller} edit`);
            this.setState({ [`${caller}${MODE}`]: EDIT });
          } else {
            console.log('Edit not authorised');
          }
    }

    GenericHandleCancel(caller){
        console.log(`Profile ${caller} cancel`);
        //reset editable field in tate
        //example: {AboutEdit: this.state.About} for updating About
        this.setState({ [`${caller}${EDIT}`]: this.state[`${caller}`],
                        [`${caller}${MODE}`]: VIEW });
    }

    GenericHandleChange(e, caller){
        this.setState({ [`${caller}${EDIT}`]: e.target.value });
    }

  AboutHandleSave() {
    console.log('Profile About save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.GenericHandleCancel(ABOUT);
      return;
    }
    //change message in database
    updateUserAbout(this.state.AboutEdit).then(async (res) => {
        if(res.success){
            //if successful, change message in state based on databaswe
            this.setState({ About: res.text,
                            AboutEdit: res.text,
                             AboutMode: VIEW });
        } else {
            throw new Error("Unsuccessful update to About");
        }
    }).catch((error) => {
        //unsuccessful, therefore reset
        this.GenericHandleCancel(ABOUT);
    });
  }

  PictureHandleSave() {
    console.log('Profile Picture save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.GenericHandleCancel(PICTURE);
      return;
    }

    //change picture in database
    
    //if successful, change message in state
    this.setState({ Picture: this.state.PictureEdit });

    this.setState({ PictureMode: VIEW });
  }

  StatusHandleSave() {
    console.log('Profile Status save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.GenericHandleCancel(STATUS);
      return;
    }
    this.setState({ Status: this.state.StatusEdit });
    this.setState({ StatusMode: VIEW });
  }

  SocialHandleSave() {
    console.log('Profile Social save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.GenericHandleCancel(SOCIAL);
      return;
    }
    //if successful, change message in state
    this.setState({ Social: this.state.SocialEdit });
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
    const editable = this.props.currentUser === this.props.wantedUser;
    return (
      <div className="ProfilePage">
        <ProfilePicture
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.PictureMode}
          picture={this.state.Picture}
          handleEdit={() => this.GenericHandleEdit(PICTURE)}
          handleSave={this.PictureHandleSave}
          handleCancel={() => this.GenericHandleCancel(PICTURE)}
          handleChange={(e) => this.GenericHandleChange(e, PICTURE)}
        />
        <ProfileAbout
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.AboutMode}
          message={this.state.About}
          handleEdit={() => this.GenericHandleEdit(ABOUT)}
          handleSave={this.AboutHandleSave}
          handleCancel={() => this.GenericHandleCancel(ABOUT)}
          handleChange={(e) => this.GenericHandleChange(e, ABOUT)}
        />
        <ProfileStatus
          currentUser={this.props.currentUser}
          wantedUser={this.props.wantedUser}
          editable={this.props.editable}
          mode={this.state.StatusMode}
          message={this.state.Status}
          handleEdit={() => this.GenericHandleEdit(STATUS)}
          handleSave={this.StatusHandleSave}
          handleCancel={() => this.GenericHandleCancel(STATUS)}
          handleChange={(e) => this.GenericHandleChange(e, STATUS)}
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
          handleEdit={() => this.GenericHandleEdit(SOCIAL)}
          handleSave={this.SocialHandleSave}
          handleCancel={() => this.GenericHandleCancel(SOCIAL)}
          handleChange={this.SocialHandleChange}
        />
      </div>
    );
  }
}

export default ProfilePage;
