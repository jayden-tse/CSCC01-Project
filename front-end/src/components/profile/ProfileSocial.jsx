import React, { Component } from 'react';

class ProfileSocial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        'https://www.facebook.com',
        'https://twitter.com',
        'https://www.instagram.com/',
      ],
      linksEdit: [
        'https://www.facebook.com',
        'https://twitter.com',
        'https://www.instagram.com/',
      ],
      edit: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(e) {
    if (this.props.editable) {
      console.log('Profile Social edit');
      this.setState({ edit: true });
    } else {
      console.log('Edit not authorised');
    }
  }

  handleSave() {
    console.log('Profile Social save');
    //not your profile
    if (!this.props.editable) {
      console.log('Save not authorized');
      this.handleCancel();
      return;
    }

    //if successful, change message in state
    this.setState({ links: this.state.linksEdit });

    this.setState({ edit: false });
  }

  handleChange(e, id) {
    var tempLinks = this.state.linksEdit;
    tempLinks[id] = e.target.value;
    this.setState({ linksEdit: tempLinks });
  }

  renderLink(i) {
    //edit mode
    if (this.state.edit) {
      return (
        <SocialEditable
          key={i.toString()}
          id={i.toString()}
          link={this.state.linksEdit[i]}
          onChange={this.handleChange}
        />
      );
    }
    //link
    return (
      <SocialLink
        key={i.toString()}
        id={i.toString()}
        link={this.state.links[i]}
      />
    );
  }

  renderButton() {
    if (this.props.editable)
      return this.state.edit ? (
        <SocialSave onSave={this.handleSave} />
      ) : (
        <SocialEdit onClick={this.handleEdit} />
      );
    return null;
  }

  render() {
    return (
      <div className="ProfileSocial">
        {this.renderLink(0)}
        {this.renderLink(1)}
        {this.renderLink(2)}
        {this.renderButton()}
      </div>
    );
  }
}

function SocialLink(props) {
  return (
    <div>
      <a target="_blank" href={props.link}>
        {props.link}
      </a>
    </div>
  );
}

function SocialEditable(props) {
  return (
    <form className="ProfileSocialEditable">
      <input
        className="ProfileSociableEditableText"
        onChange={(e) => props.onChange(e, props.id)}
        defaultValue={props.link}
      />
    </form>
  );
}

function SocialSave(props) {
  return (
    <button className="ProfileSociableEditableSave" onClick={props.onSave}>
      save
    </button>
  );
}

function SocialEdit(props) {
  return <button onClick={props.onClick}>edit</button>;
}

export default ProfileSocial;
