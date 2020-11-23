import React from 'react';

/**
 * Shows the given question for `props.questionTimer` seconds, then gives
 * `props.answerTimer` seconds for the player to choose an answer. Calls
 * `props.onAnswer` when the player has chosen an answer or the time ran out.
 */
class TriviaQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return <p>Trivia Question</p>
  }
}

export default TriviaQuestion;
