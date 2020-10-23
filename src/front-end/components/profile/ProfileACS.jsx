import React, { Component } from "react";
import { getUserACS, getUserACSChange } from "./ProfileACSCalls";
import "./ProfileACS.css";

class ProfileACS extends Component {
  constructor(props) {
    super(props);
    //get ACS and such from props
    console.log(props.username);
    this.state = { ACS: 0, ACSChange: 0 };
  }

  componentWillMount() {
    this.setState({ ACS: getUserACS(this.props.username) });
    this.setState({
      ACSChange: getUserACSChange(this.props.username),
    });
  }

  render() {
    return (
      <div className="ProfileACS">
        <ProfileACSLabel message={"Your ACS is " + this.state.ACS} />
        <br />
        <ProfileACSLabel message={"Tier: " + ACSTier(this.state.ACS)} />
        <br />
        <ProfileACSLabel message={this.state.ACSChange + " ACS score today"} />
      </div>
    );
  }
}

function ACSTier(ACS) {
  //high to low, same length arrays
  let minACS = [900, 600, 300, 100];
  let tier = ["Expert Analyst", "Pro Analyst", "Analyst", "Fanalyst"];
  var i;
  for (i = 0; i < minACS.length; i++) {
    if (ACS >= minACS[i]) {
      return tier[i];
    }
  }
  return "Untiered";
}

function ProfileACSLabel(props) {
  return <label className="ProfileACSLabel">{props.message}</label>;
}

export default ProfileACS;
