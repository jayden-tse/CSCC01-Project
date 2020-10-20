import React, { Component } from "react";
import CurrentUser from './CurrentUser';
import "./TopNavBar.css";

// Need to get back end data for currently logged in user including name and profile pic
class TopNavBar extends React.Component{
  constructor(props) {
      super(props);
      this.RedirectToTheZone = this.RedirectToTheZone.bind(this);
  }
  
  RedirectToTheZone() {
    
  }

  render() {
    return (
      <nav className="TopNavBar"> 
        <img className="logo" src={"../../resources/sportcredLogo.png"}/>
        <button className="TheZoneButton" onClick={this.RedirectToTheZone}>The Zone</button>
        <CurrentUser userName="Dave"/>
      </nav>
    )
  }
}

export default TopNavBar;