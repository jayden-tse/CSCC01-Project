import React from 'react';
import TheZonePost from './TheZonePost';

class TheZonePostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      postid: [
        111332,
        111333,
        111334
      ]
    };
  }
  
  //TODO: get list of all posts from the backend api to display
  componentDidMount() {
    
  }
  
      
  render() {
    return (
      <div>
        {this.state.postid.map(
          id => <TheZonePost postid={id}/>)}
      </div>
    );
  }
  
}

export default TheZonePostList;