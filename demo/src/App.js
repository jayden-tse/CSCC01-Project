import React from 'react';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import TheZonePage from './components/TheZonePage';
import TriviaPage from './components/TriviaPage';
import DebatePage from './components/DebatePage';
import PicksAndPredictionsPage from './components/PicksAndPredictionsPage';
import OpenCourtPage from './components/OpenCourtPage';


//Main page that display different pages depending on current state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:false,
      currentPage:"Signup",
      currentUser:"hello"
    };
   }


  render() {
    let page = null;

    if (!this.state.auth) {
    // logic to determine which page
      if (this.state.currentPage === "Signup") {
        page = <SignupPage />;
      }
      else {
        page = <LoginPage />;
      }
    } else {
      if (this.state.currentPage === "TheZone") {
        page = <TheZonePage />;
      } else if (this.state.currentPage === "OpenCourt") {
        page = <OpenCourtPage />;
      } else if (this.state.currentPage === "Trivia") {
        page = <TriviaPage />;
      } else if (this.state.currentPage === "PicksAndPredictions") {
        page = <PicksAndPredictionsPage />;
      } else if (this.state.currentPage === "Debate") {
        page = <DebatePage />;
      }
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

export default App;
