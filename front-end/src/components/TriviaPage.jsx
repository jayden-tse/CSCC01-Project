import React from 'react';
import TriviaGame from './trivia/TriviaGame';
import './TriviaPage.css';

/**
 * The container for playing a Trivia game.
 */
class TriviaPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return <div className="TriviaPage"><TriviaGame/></div>;
  }
}

export default TriviaPage;
