import React, { Component } from 'react';

const EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfileSocial extends Component {

  renderLink(i) {
    //edit mode
    if (this.props.mode === EDIT) {
      return (
        <SocialEditable
          key={i.toString()}
          id={i.toString()}
          link={this.props.links[i]}
          onChange={this.props.handleChange}
        />
      );
    }
    //link
    return (
      <SocialLink
        key={i.toString()}
        id={i.toString()}
        link={this.props.links[i]}
      />
    );
  }

  renderButton() {
    if (this.props.editable)
      return this.props.mode===EDIT ? (
        <SocialSaveCancel onSave={this.props.handleSave} onCancel={this.props.handleCancel}/>
      ) : (
        <SocialEdit onClick={this.props.handleEdit} />
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
    <form className="ProfileSocialEditable" onSubmit={event => event.preventDefault()}>
      <input
        className="ProfileSociableEditableText"
        onChange={(e) => props.onChange(e, props.id)}
        defaultValue={props.link}
      />
    </form>
  );
}

function SocialSaveCancel(props) {
  return (
      <React.Fragment>
        <button className="ProfileSociableEditableSave" onClick={props.onSave}>
            {SAVE}
        </button>
        <button className="ProfileSociableEditableCancel" onClick={props.onCancel}>
            {CANCEL}
        </button>
    </React.Fragment>
  );
}

function SocialEdit(props) {
    return <button onClick={props.onClick}>{EDIT}</button>;
}

export default ProfileSocial;
