import React from 'react';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import TheZonePage from './TheZonePage';
import TriviaPage from './TriviaPage';
import DebatePage from './DebatePage';
import PicksAndPredictionsPage from './PicksAndPredictionsPage';
import OpenCourtPage from './OpenCourtPage';


//Main page that display different pages depending on current state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:true,
      currentPage:"Debate",
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
            //
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
