import React from "react";
import DropdownButton from "./DropdownButton";
import Avatar from '@material-ui/core/Avatar';
import "./CurrentUser.css";

class CurrentUser extends React.Component{
  constructor(props) {
      super(props);
    }

   /* TODO : GET DATA FROM BACKEND API 
    componentDidMount() {
        fetch('http://localhost:3000/api/someapi')
            .then(res => res.json())
            .then(data => this.setState(
                { user:data })
            );
    }
  */

  render() {
    return (
      <div className="CurrentUserContainer">
        <DropdownButton name={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          redirectToProfile={this.props.redirectToProfile}/>
        <Avatar className="profilePic"
          style={{
            width: 64,
            height: 64
          }}
          src={"../../resources/sportcredLogo.png"} />
       </div>
    )
  }
}

export default CurrentUser;