import React from 'react';
import TriviaQuestion from './TriviaQuestion';

/**
 * The actual trivia game. Displays each question and their 4 possible answers.
 * The player is shown the question first for `props.previewTimer` seconds,
 * and then they have to pick an answer within `props.answerTimer` seconds.
 * 
 * The question object has the shape:
 * ```
 * {
 *  _id: string;
 *  question: string;
 *  answer: string;
 *  other: string[]; // exactly 3 strings
 * }
 * ```
 */
class TriviaGame extends React.Component {
  /**
   * @param {*[]} props.triviaQuestions an array of trivia question objects
   * @param {Number} props.previewTimer number of seconds to preview the question for
   * @param {Number} props.answerTimer number of seconds to choose an answer
   * @param {*} props.onFinish callback when all trivia questions are answered.
   */
  constructor(props) {
    super(props);
    this.state = {
      // The current question index; 0 <= questionCount < total
      questionCount: 0,
      // Total number of questions
      total: this.props.triviaQuestions.length
    };
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  // When a trivia question is answered.
  handleAnswer() {
    // TODO implement
    // Move to the next question
    this.setState((state) => ({
      questionCount: state.questionCount + 1
    }));
  }

  render() {
    const questions = this.props.triviaQuestions;
    const previewTimer = this.props.previewTimer;
    const answerTimer = this.props.answerTimer;
    // For each trivia question, show the question and then prompt the user
    // for an answer within the time given.
    let content = null;
    if (this.state.questionCount < this.state.total) {
      // Note: handleAnswer() will increment the count
      content = (
        <TriviaQuestion
          question={questions[this.state.questionCount]}
          previewTimer={previewTimer}
          answerTimer={answerTimer}
          onAnswer={this.handleAnswer}
        />
      );
    } else {
      // Done answering all the questions
      this.props.onFinish();
    }
    return content;
  }
}

export default TriviaGame;
