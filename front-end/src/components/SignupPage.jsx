import React from 'react';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { signUp } from '../api/SignupCalls.js';

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
      helpers: {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        favSport: '',
        age: '',
        sportLevel: '',
        sportLearn: '',
        favTeam: ''
      },
      // Applies the error style to input fields with an error (true)
      errors: {
        username: false,
        email: true,
        phone: false,
        password: false,
        confirmPassword: false,
        favSport: false,
        age: false,
        sportLevel: false,
        sportLearn: false,
        favTeam: false
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // TODO
  handleSubmit(event) {
    // make sure all required fields are filled in
    // validate the input
    // if valid, send to server and redirect to login
  }
  
  render() {
    return (
      <div className='SignupPage'>
        <Grid container direction='column' justify='flex-start' alignItems='flex-start'>
          <Grid item>
            <h1>Sign Up</h1>
          </Grid>
          <Grid container item>
            <form>
              {/* Username */}
              <Grid item>
                <TextField 
                  label='Username'
                  name='username'
                  value={this.state.username}
                  helperText={this.state.helpers.username}
                  error={this.state.errors.username}
                  onChange={this.handleInputChange}
                  required
                  autoFocus
                  variant='filled'
                >
                </TextField>
              </Grid>

              {/* Email */}
              <Grid item>
                <TextField 
                  label='Email'
                  name='email'
                  value={this.state.email}
                  helperText={this.state.helpers.email}
                  error={this.state.errors.email}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>

              {/* Phone */}
              <Grid item>
                <TextField
                  label='Phone'
                  name='phone'
                  value={this.state.phone}
                  helperText={this.state.helpers.phone}
                  error={this.state.errors.phone}
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
                  helperText={this.state.helpers.password}
                  error={this.state.errors.password}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label='Confirm password'
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  helperText={this.state.helpers.confirmPassword}
                  error={this.state.errors.confirmPassword}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>

              {/* Favourite Sport */}
              <Grid item>
                <TextField
                  label='Favourite sport'
                  name='favSport'
                  value={this.state.favSport}
                  helperText={this.state.helpers.favSport}
                  error={this.state.errors.favSport}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Age */}
              <Grid item>
                <TextField
                  label='Age'
                  name='age'
                  value={this.state.age}
                  helperText={this.state.helpers.age}
                  error={this.state.errors.age}
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
                  helperText={this.state.helpers.sportLevel}
                  error={this.state.errors.sportLevel}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                  <MenuItem value={'No History'}>No History</MenuItem>
                  <MenuItem value={'Recreational'}>Recreational</MenuItem>
                  <MenuItem value={'High School'}>High School</MenuItem>
                  <MenuItem value={'University'}>University</MenuItem>
                  <MenuItem value={'Professional'}>Professional</MenuItem>
                </TextField>
              </Grid>
              
              {/* What sport do you want to know/learn about? */}
              <Grid item>
                <TextField
                  label='What sport do you want to know/learn about?'
                  name='sportLearn'
                  value={this.state.sportLearn}
                  helperText={this.state.helpers.sportLearn}
                  error={this.state.errors.sportLearn}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Favourite sports team */}
              <Grid item>
                <TextField
                  label='Favourite sports team'
                  name='favTeam'
                  value={this.state.favTeam}
                  helperText={this.state.helpers.favTeam}
                  error={this.state.errors.favTeam}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>

              <Grid item>
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid> {/* Form container */}
        </Grid> {/* Page container */}
      </div>
    );
  }
}

export default SignupPage;
