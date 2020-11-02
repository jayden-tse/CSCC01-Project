import React, { Component } from 'react';

const sample = [
  { username: 'user1', ACS: 100 },
  { username: 'user2', ACS: 200 },
  { username: 'user3', ACS: 300 },
  { username: 'user4', ACS: 400 },
  { username: 'user5', ACS: 500 },
];

class ProfileRadar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFollow = this.handleFollow.bind(this);
  }

  handleFollow() {}

  render() {
    return (
      <div className="ProfileRadar">
        {!this.props.editable && (
          <FollowButton handleClick={this.handleFollow} />
        )}
        <header className="ProfileRadarHeader">{`${this.props.wantedUser} is following:`}</header>
        <nav>
          <ul className="ProfileRadarList">
            {ListFollowed(sample, this.props.handleViewProfile)}
          </ul>
        </nav>
      </div>
    );
  }
}

function ProfileItem(props) {
  return (
    <li className="ProfileRadarItem">
      <button
        className="ProfileRadarItemButton"
        onClick={(e) => props.handleClick(props.username)}
      >
        {props.username}, ACS:{props.ACS}
      </button>
    </li>
  );
}

function ListFollowed(list, redirect) {
  return list.map((user) => (
    <ProfileItem
      key={user.username}
      id={user.username}
      username={user.username}
      ACS={user.ACS}
      handleClick={redirect}
    />
  ));
}

function FollowButton(props) {
  return (
    <button className="ProfileRadarFollowButton" onClick={props.handleClick}>
      Follow: x
    </button>
  );
}

export default ProfileRadar;
