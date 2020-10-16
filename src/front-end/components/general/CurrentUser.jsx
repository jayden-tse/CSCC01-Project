import React, { Component } from "react";
import DropdownButton from "./DropdownButton";
import "./CurrentUser.css";

//Username should be passed via props
class CurrentUser extends React.Component{
  constructor(props) {
      super(props);
  }
  
  render() {
    return (
      <div className="CurrentUserContainer">
        <DropdownButton/> 
        <img className="profilePic" src={"..\resources\sportcredLogo.png"}/>
       </div>
    )
  }
}

export default CurrentUser;