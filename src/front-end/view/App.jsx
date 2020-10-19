import React from 'react';
import SignupPage from './SignupPage.jsx';
import LoginPage from './LoginPage.jsx';
import TheZonePage from './TheZonePage.jsx';
import TriviaPage from './TriviaPage.jsx';
import DebatePage from './DebatePage.jsx';
import PicksAndPredictionsPage from './PicksAndPredictionsPage.jsx';
import OpenCourtPage from './OpenCourtPage.jsx';


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
    return (
      <div>
      {(!this.state.auth) && (this.state.currentPage==="Signup")&&<SignupPage/>}
      {(!this.state.auth) && (this.state.currentPage!=="Signup")&&<LoginPage/>}
       {(this.state.auth) && (this.state.currentPage==="TheZone")&&<TheZonePage/>}
      {(this.state.auth) && (this.state.currentPage==="OpenCourt")&&<OpenCourtPage/>}
       {(this.state.auth) && (this.state.currentPage==="Trivia")&&<TriviaPage/>}
       {(this.state.auth) && (this.state.currentPage==="PicksAndPredictions")&&<PicksAndPredictionsPage/>}
        {(this.state.auth) && (this.state.currentPage==="Debate")&&<DebatePage/>}
      </div>
      
    )
  }
}

export default App;
