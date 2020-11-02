import React from 'react';
import TheZonePost from './TheZonePost';
import TheZoneCreatePost from './TheZoneCreatePost';

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
    this.addPost = this.addPost.bind(this);
  }
  
  //TODO: get list of all posts from the backend api to display
  componentDidMount() {
    
  }

  // add a new post to post list with postid = data
  addPost(data) {
    const newPost = this.state.postid.concat(data);
    this.setState({
      postid: newPost
    })
	}
 
  render() {
    return (
      <div>
        <div>
          <TheZoneCreatePost addPost={this.addPost} />
        </div>
        {this.state.postid.map(
          id => <TheZonePost postid={id}/>)}
      </div>
    );
  }
}

export default TheZonePostList;