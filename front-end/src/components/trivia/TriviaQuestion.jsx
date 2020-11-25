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
    return(
      <Grid
        container
        className='TriviaQuestion'
        spacing={2}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12}>{this.renderQuestion()}</Grid>
        <Grid item xs={12}>{this.renderQuestionCount()}</Grid>
        {/* The possible answers */}
        <Grid container item xs={12} spacing={2}>
          {
            this.state.time >= this.props.previewTimer 
            ? this.renderAnswers()
            : null
          }
        </Grid>
        {/* The countdown, or icon for correct/incorrect answer */}
        <Grid item xs={12}>
          {this.state.selected === null ? this.renderTimer() : <p>Selected</p>}
        </Grid>
      </Grid>
    );
  }

  renderQuestion() {
    return (
      <Typography variant='h2' color='textPrimary'>
        {this.props.question.question}
      </Typography>
    );
  }

  renderQuestionCount() {
    return (
      <Typography variant='subtitle1' color='textSecondary'>
        {this.props.questionNumber + '/' + this.props.questionTotal}
      </Typography>
    );
  }

  renderAnswers() {
    return this.answers.map((answer, index) => (
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
    ));
  }

  renderTimer() {
    let timer = null;
    const previewTime = this.props.previewTimer;
    const answerTime = this.props.answerTimer;
    // Render the countdown for each phase
    if (this.state.time < previewTime) {
      // Question preview
      timer = (
        <Typography variant='h2' color='secondary'>
          {previewTime - this.state.time}
        </Typography>
      );
    } else if (this.state.time < (answerTime + previewTime)) {
      // Answer phase
      // Want the time since the preview phase ended
      const decrement = this.state.time - previewTime;
      timer = (
        <Typography variant='h2' color='secondary'>
          {answerTime - decrement}
        </Typography>
      );
    } else {
      // Time ran out, so done with the timer
      clearInterval(this.timerId);
    }
    return timer;
  }
}

export default TriviaQuestion;
