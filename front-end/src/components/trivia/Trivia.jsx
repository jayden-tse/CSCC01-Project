import React from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TriviaStart from './TriviaStart';
import TriviaGame from './TriviaGame';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#86C232'
    },
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
    };
    this.loadSolo = this.loadSolo.bind(this);
    this.loadHeadToHead = this.loadHeadToHead.bind(this);
  }
  
  loadSolo() {
    console.log('Loading Solo Trivia');
    this.setState({state: 'trivia'});
  }

  loadHeadToHead() {
    console.log('Loading Head to Head Trivia');
    this.setState({state: 'load'});
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
        content = <Typography variant="body1">Loading...</Typography>
        break;
      case 'trivia':
        content = <TriviaGame/>
        break;
      case 'result':
        content = <Typography variant="body1">Result</Typography>
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
