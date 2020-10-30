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
  }
  render() {
    return (
      <div className="ProfileRadar">
        <header className="ProfileRadarHeader">aieeeeeee</header>
        <nav>
          <ul className="ProfileRadarList">{listFollowed(sample)}</ul>
        </nav>
      </div>
    );
  }
}

function listFollowed(list) {
  return list.map((user) => (
    <li className="ProfileRadarItem">
      {user.username} :{user.ACS}
    </li>
  ));
}

export default ProfileRadar;
