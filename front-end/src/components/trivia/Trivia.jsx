import React from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TriviaStart from './TriviaStart';
import TriviaGame from './TriviaGame';
import LoadingScreen from '../general/LoadingScreen';
import {get10TriviaQuestions} from '../../api/TriviaCalls.js';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#86C232'
    },
    secondary: {
      main: '#FFA722'
    }
  }
});

/**
 * The Trivia game. Handles the game state and displays the corresponding
 * components to the state.
 */
class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The current game state.
      state: 'start',
      // The questions (question objects) for the trivia game.
      // Needs to be loaded from the backend
      questions: []
    };
    this.loadSolo = this.loadSolo.bind(this);
    this.loadHeadToHead = this.loadHeadToHead.bind(this);
    this.handleTriviaComplete = this.handleTriviaComplete.bind(this);
  }
  
  loadSolo() {
    console.log('Loading Solo Trivia');
    this.setState({state: 'load'});
    // make async call to get the 10 questions and store it in state
    // and after that's done update the game state to trivia
    get10TriviaQuestions().then(async (res)=>{
        if(typeof res !== 'undefined' && res.ok){
            const questions = await res.json();
            this.setState({state: 'trivia', questions: questions});
        } else {
            throw new Error("Bad Response From Backend");
        }
    }).catch((error)=>{
        console.log(`Error Loading Trivia Questions: ${error}`)
        this.setState({state: 'start'});
    });
  }

  // Disabled for now
  loadHeadToHead() {
    // console.log('Loading Head to Head Trivia');
    // this.setState({state: 'load'});
  }

  handleTriviaComplete() {
    // TODO:
    console.log('Finished answering trivia questions')
    this.setState({state: 'results'});
  }
  
  render() {
    let content = null;
    switch (this.state.state) {
      case 'start':
        content = (
          <TriviaStart
            onSolo={this.loadSolo}
            onHeadToHead={this.loadHeadToHead}
          />
        );
        break;
      case 'load':
        content = <LoadingScreen text='Starting Trivia...'/>
        break;
      case 'trivia':
        content = (
          <TriviaGame
            triviaQuestions={this.state.questions}
            previewTimer={3}
            answerTimer={14}
            onFinish={this.handleTriviaComplete}
          />
        );
        break;
      case 'results':
        content = <Typography variant="body1">Results</Typography>
        break;
      default:
        content = (
          <Typography variant="body1">
            There was a problem in the game state. State '{this.state.state}'
            is not recognized.
          </Typography>
        );
    }
    return (
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    );
  }
}

export default Trivia;
