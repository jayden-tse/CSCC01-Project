//Should probably have the main app pass user data when login auth success
//redirect function empty for now, not sure how to redirect in react -> maybe render a new page? 
import React, { Component } from "react";
import "./TheZone.css";
import ScoreTicker from './ScoreTicker';


class TheZone extends React.Component{
  constructor(props) {
      super(props);
      this.RedirectToTrivia = this.RedirectToTrivia.bind(this);
      this.RedirectToDebate = this.RedirectToDebate.bind(this);
      this.RedirectToOpenCourt = this.RedirectToOpenCourt.bind(this);
      this.RedirectToPicksAndPredictions = this.RedirectToPicksAndPredictions.bind(this);
  }
  
  RedirectToTrivia() {

  }
  
  RedirectToDebate() {

  }
  
  RedirectToOpenCourt() {

  }
  
  RedirectToPicksAndPredictions() {

  }
  
  render() {
    return (
      <div>
        <ScoreTicker/>
        <div className="TheZoneContainer"> 
          <button onClick={this.RedirectToTrivia}>Trivia</button>
          <h3>Description for Trivia</h3>
        </div>
        <div className="TheZoneContainer"> 
          <button onClick={this.RedirectToDebate}>Debate</button>
          <h3>Description for Debate</h3>
        </div>
        <div className="TheZoneContainer"> 
          <button onClick={this.RedirectToOpenCourt}>Open Court</button>
          <h3>Description for Open Court</h3>
        </div>
        <div className="TheZoneContainer"> 
          <button onClick={this.RedirectToPicksAndPredictions}>Picks & Predictions</button>
          <h3>Description for Picks and Predictions</h3>
        </div>
      </div>
    )
  }
}

export default TheZone;