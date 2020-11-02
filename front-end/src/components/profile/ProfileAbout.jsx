import React, { Component } from 'react';
import { getUserAbout, setUserAbout } from '../../api/ProfileCalls.js';
import './ProfileAbout.css';

const VIEW = 'View',
  EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      editMessage: '',
      mode: VIEW,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //initialize about with users about
    // getUserAbout(this.props.wantedUser)
    //   .then((response) => {
    //     if (response.ok) {
    //       //get about message from response here
    //       const mes = 'dsds';
    //       this.setState({ message: mes, editMessage: mes });
    //     } else {
    //       //on error ~400
    //       console.log('Error getting About');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log('Error with Backend response');
    //   });
  }

  handleEdit() {
    if (this.props.editable) {
      console.log('Profile About edit');
      this.setState({ mode: EDIT });
    } else {
      console.log('Edit not authorised');
    }
  }

  handleSave() {
    console.log('Profile About save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.handleCancel();
      return;
    }
    //change message in database
    setUserAbout(this.state.editMessage)
      .then((response) => {
        if (response.ok) {
          //if successful, change message in state
          this.setState({ message: this.state.editMessage });

          this.setState({ mode: VIEW });
        } else {
          //on error ~500 error writing, or 401 unauthorized
          console.log('Error writing About');
          this.handleCancel();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('Error with backend response');
        this.handleCancel();
      });
  }

  handleCancel() {
    console.log('Profile About cancel');

    //reset editMessage
    this.setState({ editMessage: this.state.message });

    this.setState({ mode: VIEW });
  }

  handleChange(e) {
    this.setState({ editMessage: e.target.value });
  }

  renderView() {
    return (
      <React.Fragment>
        <ProfileAboutView message={this.state.message} />
        {this.props.editable && (
          <ProfileAboutEditButton name="Edit" onClick={this.handleEdit} />
        )}
      </React.Fragment>
    );
  }

  renderEdit() {
    return (
      <ProfileAboutEditMode
        message={this.state.message}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    return (
      <div className="ProfileAbout">
        <ProfileAboutHeader message={`About ${this.props.wantedUser}:`} />
        {this.state.mode === VIEW ? this.renderView() : this.renderEdit()}
      </div>
    );
  }
}

function ProfileAboutHeader(props) {
  return <label className="ProfileAboutHeader">{props.message}</label>;
}

function ProfileAboutView(props) {
  return <p className="ProfileAboutView">{props.message}</p>;
}
function ProfileAboutEditButton(props) {
  return (
    <button className="ProfileAboutEditButton" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function ProfileAboutEditMode(props) {
  return (
    <form className="ProfileAboutEditMode">
      <textarea
        className="ProfileAboutEditMessage"
        defaultValue={props.message}
        onChange={props.onChange}
      />
      <button type="button" className="ProfileAboutSave" onClick={props.onSave}>
        {SAVE}
      </button>
      <button
        type="button"
        className="ProfileAboutCancel"
        onClick={props.onCancel}
      >
        {CANCEL}
      </button>
    </form>
  );
}

export default ProfileAbout;
