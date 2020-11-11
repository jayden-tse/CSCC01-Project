import React, { Component } from 'react';
import { getUserACS } from '../../api/ProfileCalls.js';
import './ProfileACS.css';

class ProfileACS extends Component {
  constructor(props) {
    super(props);
    this.state = {error:false, ACS: 0, ACSChange: 0 };
  }

  componentDidMount() {
      //expect to get json object with ACS, acs change later
    getUserACS(this.props.wantedUser).then((profile)=>{
        this.setState({ ACS: profile.ACS });
        //this.setState({ ACSChange: profile.ACSChange });
    }).catch((error) => {
            console.log(error);
            console.log('Error with profile response');
            this.setState({ error: true });
          });
}

    renderError(){
        return <ProfileACSLabel message={'Error getting ACS'} />;
    }

    renderNormal(){
        return(<React.Fragment>
            <ProfileACSLabel message={'Your ACS is ' + this.state.ACS} />
            <br />
            <ProfileACSLabel message={'Tier: ' + ACSTier(this.state.ACS)} />
            {/* <br />//remove for now
            <ProfileACSLabel message={this.state.ACSChange + ' ACS score today'} />
            */}
            </React.Fragment>);
    }

  render() {
    return (
      <div className="ProfileACS">
        {this.state.error ? this.renderError():this.renderNormal()}
      </div>
    );
  }
}

function ACSTier(ACS) {
  //high to low, same length arrays
  let minACS = [900, 600, 300, 100];
  let tier = ['Expert Analyst', 'Pro Analyst', 'Analyst', 'Fanalyst'];
  var i;
  for (i = 0; i < minACS.length; i++) {
    if (ACS >= minACS[i]) {
      return tier[i];
    }
  }
  return 'Untiered';
}

function ProfileACSLabel(props) {
  return <label className="ProfileACSLabel">{props.message}</label>;
}

export default ProfileACS;
