import React from 'react';
import { Button, Grid, Link, MenuItem, TextField } from '@material-ui/core';
import { signUp } from '../api/SignupCalls.js';
import './SignupPage.css';

// TODO: refactor form into its own component

// The property names in this.state that store the form input values.
// Useful for iterating on each form input property and their corresponding
// properties for other purposes.
const INPUT_PROPERTIES = [
  'username', 'email', 'phone', 'password', 'confirmPassword', 'favSport',
  'age', 'sportLevel', 'sportLearn', 'favTeam'
];

// The possible options for 'Highest level of sport play'
const SPORT_LEVELS = [
  'No History', 'Recreational', 'High School', 'University', 'Professional'
];

/**
 * The container for the sign up page components and process.
 */
class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      favSport: '',
      age: '',
      sportLevel: '',
      sportLearn: '',
      favTeam: '',
      // Helper text that could appear under the inputs
      usernameHelper: '',
      emailHelper: '',
      phoneHelper: '',
      passwordHelper: '',
      confirmPasswordHelper: '',
      favSportHelper: '',
      ageHelper: '',
      sportLevelHelper: '',
      sportLearnHelper: '',
      favTeamHelper: '',
      // Applies the error style to input fields with an error (true)
      usernameError: false,
      emailError: false,
      phoneError: false,
      passwordError: false,
      confirmPasswordError: false,
      favSportError: false,
      ageError: false,
      sportLevelError: false,
      sportLearnError: false,
      favTeamError: false,
      // Error text for the entire form
      formHelper: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Removes the helper text for each form input.
   */
  resetHelperText() {
    // The properties for helper text follow the naming convention:
    // <input property>Helper
    INPUT_PROPERTIES.forEach(property => {
      this.setState({[property + 'Helper']: ''});
    });
    // The form helper isn't part of the input properties
    this.setState({formHelper: ''});
  }

  /**
   * Removes the error state of each form input. Visually, they are no longer
   * highlighted with red.
   */
  resetErrors() {
    // Error property names follow the same naming convention:
    // <input property>Error
    INPUT_PROPERTIES.forEach(property => {
      this.setState({[property + 'Error']: false});
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // TODO
  handleSubmit(event) {
    // Prevent default behaviour of form submit (does a GET request with form
    // values in the request URL!)
    event.preventDefault();
    // Reset previous errors since it needs to be checked again
    this.resetHelperText();
    this.resetErrors();

    // Required fields must be filled in. This is actually built-in to the
    // form when using the required props in the input elements, so submit
    // only runs when all required fields are filled in.

    // TODO: Validate the required fields

    // Send the sign up request to the server and wait for a response
    const state = this.state;
    signUp(
      state.username, state.password, state.email, state.phone, state.favSport,
      state.age, state.sportLevel, state.sportLevel, state.favTeam
    )
    .then(response => {
      // If sign up successful, redirect user to log in
      if (response.success) {
        this.props.onSignup();
      // If sign up failed because invalid fields, prompt user to change it
      } else if (response.reason === 'invalid') {
        // For now, just highlight the all 3 invalid fields
        this.setState({
          usernameError: true,
          emailError: true,
          phoneError: true,
          formHelper: 'The username, email, or phone number is invalid'
        });
      // TODO: If sign up failed because there was a network error, unexpected
      // error from database, or other, display an error text for now
      } else {
        this.setState({ formHelper: 'There was an error with the server. Please try again.'});
      }
    });
  }
  
  render() {
    return (
      <div className='SignupPage'>
        <Grid container direction='column' justify='flex-start' alignItems='flex-start'>
          {/* Title */}
          <Grid item>
            <h1>Sign Up</h1>
          </Grid>

          {/* Navigation back to login */}
          <Grid item>
            <Button
              component={Link}
              onClick={this.props.onLoginRedirect}
            >
              or login with an existing account
            </Button>
          </Grid>

          {/* Form */}
          <Grid container item>
            <form className='SignupForm' onSubmit={this.handleSubmit}>
              {/* Username */}
              <Grid item>
                <TextField 
                  label='Username'
                  name='username'
                  value={this.state.username}
                  helperText={this.state.usernameHelper}
                  error={this.state.usernameError}
                  onChange={this.handleInputChange}
                  required
                  autoFocus
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>

              {/* Email */}
              <Grid item>
                <TextField 
                  label='Email'
                  name='email'
                  value={this.state.email}
                  helperText={this.state.emailHelper}
                  error={this.state.emailError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>

              {/* Phone */}
              <Grid item>
                <TextField
                  label='Phone'
                  name='phone'
                  value={this.state.phone}
                  helperText={this.state.phoneHelper}
                  error={this.state.phoneError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Password */}
              <Grid item>
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  helperText={this.state.passwordHelper}
                  error={this.state.passwordError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label='Confirm password'
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  helperText={this.state.confirmPasswordHelper}
                  error={this.state.confirmPasswordError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>

              {/* Favourite Sport */}
              <Grid item>
                <TextField
                  label='Favourite sport'
                  name='favSport'
                  value={this.state.favSport}
                  helperText={this.state.favSportHelper}
                  error={this.state.favSportError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>
              
              {/* Age */}
              <Grid item>
                <TextField
                  label='Age'
                  name='age'
                  value={this.state.age}
                  helperText={this.state.ageHelper}
                  error={this.state.ageError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Highest level of sport play */}
              <Grid item>
                <TextField
                  select
                  label='Highest level of sport play'
                  name='sportLevel'
                  value={this.state.sportLevel}
                  helperText={this.state.sportLevelHelper}
                  error={this.state.sportLevelError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                  {SPORT_LEVELS.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              {/* What sport do you want to know/learn about? */}
              <Grid item>
                <TextField
                  label='What sport do you want to know/learn about?'
                  name='sportLearn'
                  value={this.state.sportLearn}
                  helperText={this.state.sportLearnHelper}
                  error={this.state.sportLearnError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>
              
              {/* Favourite sports team */}
              <Grid item>
                <TextField
                  label='Favourite sports team'
                  name='favTeam'
                  value={this.state.favTeam}
                  helperText={this.state.favTeamHelper}
                  error={this.state.favTeamError}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  value="Submit"
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid> {/* Form container */}
          {/* TODO: Error text for the entire form. Change component later */}
          <Grid>
            <h2 className='SignupFormError'>{this.state.formHelper}</h2>
          </Grid>
        </Grid> {/* Page container */}
      </div>
    );
  }
}

export default SignupPage;
