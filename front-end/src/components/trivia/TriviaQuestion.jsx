import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

/**
 * Shows the given question `props.question.question` for `props.previewTimer`
 * seconds, then gives `props.answerTimer` seconds for the player to choose an
 * answer. Calls `props.onAnswer` when the player chooses an answer or the
 * time runs out.
 */
class TriviaQuestion extends React.Component {
  /**
   * @param {*} props.onAnswer callback when an answer is selected or time ran
   * out. Accepts 1 argument: `answer`: string or `null`.
   * `answer` is `null` when the player does not choose an answer in time,
   * otherwise it's one of the possible answer strings for this question
   * (`props.question.answer` or one of `props.question.other`)
   */
  constructor(props) {
    super(props);
    this.state = {
      // Number of seconds elapsed
      time: 0,
      // Disables the answer buttons if true. The index corresponds to an
      // index in the answer array (see componentDidMount()). It is set in
      // componentDidMount since there are a variable number of answers
      disabled: [],
      // The index of the answer that the player selected
      selected: null
    }
    
    this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
  }

  componentDidMount() {
    // Setup a timer for every second
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
    // Collect trivia answers into one for easy iterating
    // TODO: randomize order
    this.answers = [this.props.question.answer, ...this.props.question.other];
    // Populate the disabled array to match the number of answers given
    let disable = [];
    for (let i = 0; i < this.answers.length; i++) {
      disable.push(false);
    }
    this.setState({disabled: disable});
  }

  componentWillUnmount() {
    // Done using the timer
    clearInterval(this.timerId);
  }

  // Updates state every second
  tick() {
    this.setState((state) => ({
      time: state.time + 1
    }));
  }

  // When an answer is selected
  handleAnswerSelect(answerIndex) {
    // Since an answer can only be selected once, disable the other options
    // and record the answer
    let disable = [];
    for (let i = 0; i < this.answers.length; i++) {
      disable.push(true);
    }
    disable[answerIndex] = false;
    this.setState({disabled: disable, selected: answerIndex});
  }

  render() {
    let content = null;
    const question = (
      <Typography variant='h2' color='textPrimary'>
        {this.props.question.question}
      </Typography>
    );
    // Which question the player is on eg. 2/10
    const questionCount = (
      <Typography variant='subtitle1' color='textSecondary'>
        {this.props.questionNumber + '/' + this.props.questionTotal}
      </Typography>
    );

    // Preview the question for the given seconds
    if (this.state.time < this.props.previewTimer) {
      // Time remaining for question preview
      const previewTimer = (
        <Typography variant='h2' color='secondary'>
          {this.props.previewTimer - this.state.time}
        </Typography>
      );
      content = (
        <Grid
          container
          className='TriviaQuestionPreview'
          spacing={2}
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={12}>{question}</Grid>
          <Grid item xs={12}>{questionCount}</Grid>
          <Grid item xs={12}>{previewTimer}</Grid>
        </Grid>
      );
    // Then prompt user to choose an answer within the given seconds
    } else {
      // Time remaining for answer phase (need to factor in the elapsed time
      // from the preview so we can get the elapsed time since preview ended)
      const decrement = this.state.time - this.props.previewTimer;
      const answerTimer = (
        <Typography variant='h2' color='secondary'>
          {this.props.answerTimer - decrement}
        </Typography>
      );
      const triviaAnswers = this.answers.map((answer, index) => {
        return (
        <Grid item xs={12} sm={6} key={'TriviaAnswer-' + index}>
          <Button
            disabled={this.state.disabled[index]}
            value={index}
            onClick={() => this.handleAnswerSelect(index)}
            variant='contained'
            color='primary'
          >
            {answer}
          </Button>
        </Grid>
        );
      });
      content = (
        <Grid
          container
          className='TriviaQuestionAnswers'
          spacing={2}
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={12}>{question}</Grid>
          <Grid item xs={12}>{questionCount}</Grid>
          {/* The possible answers */}
          <Grid container item xs={12} spacing={2}>
            {triviaAnswers}
          </Grid>
          <Grid item xs={12}>
            {this.state.selected === null ? answerTimer : <p>Selected</p>}
          </Grid>
        </Grid>
      );
    }
    return content;
  }
}

export default TriviaQuestion;
