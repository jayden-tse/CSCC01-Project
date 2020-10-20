import React from 'react';
import TheZone from '../components/theZone/TheZone';
import TopNavBar from '../components/general/TopNavBar';
// replace whatever is in render with components
// needed for the page

class TheZonePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <TopNavBar />
        <TheZone redirectToDebate={this.props.redirectToDebate}
          redirectToOpenCourt={this.props.redirectToOpenCourt}
          redirectToPicksAndPredictions={this.props.redirectToPicksAndPredictions}
          redirectToTrivia={this.props.redirectToTrivia}/>
      </div>
    )
  }
}

export default TheZonePage;
