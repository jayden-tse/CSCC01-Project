import React, { Component } from "react";
import DropdownButton from "./DropdownButton";
import "./CurrentUser.css";

class CurrentUser extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        user: {
          name: "Dave",
          picture: "../../resources/sportcredLogo.png"
        }
      }
    }

  render() {
    return (
      <div className="CurrentUserContainer">
            <DropdownButton name={this.state.user.name}/>
            <img className="profilePic" src={this.state.user.picture} />
       </div>
    )
  }
}

export default CurrentUser;