# Sprint goal
Connect and complete Debate and Trivia and make improvements to the UI so it looks less blocky.


# Participants
* Our team: Yes
* TA: Swarup Srini
* Product Owners: Jacob, Warren Ward


# Team capacity (max amount of user story points the team can take on)
78


# Decisions about user stories to be implemented
* Prioritize UI.
* Work on finishing Debate and Trivia.


# Stories to be completed
* YES-35
   * As a registered user, I want to get notifications on the current game from Debate so that I can be updated when I am busy
   * CoS:
      * Verify that notifications pop up when the current game is happening
      * Verify that notifications must be turned on for this feature to activate
      * Verify that notifications are relevant/important to the current game(s)
* YES-47
   * As a registered user, I want to be able to Request a head-to-head battle with another user so that I may gain/lose ACS points
   * CoS:
      * Provide an option to request battles with random users
      * Provide an option to request battles with friends
      * Verify that the user receives the battle request
      * Verify that the user can accept or deny the battle request
      * Verify that both users enter the trivia game at the same time
      * Verify that both users are visible on the screen during the match
* YES-50
   * As a registered user, I want to play a solo trivia game, so that I can test my knowledge and increase my ACS
   * CoS:
      * Allow users to choose to play solo
         * Verify that the trivia starts for the user 
      * Verify that user gets ACS based on their score
* YES-51
   * As a registered user, I want to have unique questions in my trivia game, so that I don’t get asked the same questions every game
   * CoS:
      * Verify that once a question is asked then the question will not be asked again until all other questions are asked
* YES-53
   * As a registered user, I want to be able to make daily picks of teams, to make playoff picks before season starts, and to predict which player/team will get the awards, so that I can gain/lose ACS points daily
   * CoS:
      * Daily Picks
         * Provide the user a pick option for every team in any match
         * Provide the user to re-pick any team before the match starts
         * Verify that once the user picks a team in the selected match that their pick is saved
      * Playoffs
         * Verify that the user can view teams in the current season
         * Verify that each team can only be in 1 slot at a time (e.g. team A in 1st slot cannot be in 2nd slot at the same time)
         * Verify that predictions cannot be changed when a season has started
         * Verify that the user gains/loses points based on the accuracy of their predictions
      * Preseason
         * Verify that the user can choose pro players/coaches
         * Verify that the user can save their line up
         * Provide options to the user such as:
         * MVP
         * Defensive player of the year
         * Rookie of the year
         * Coach of the year
* YES-69
   * As a registered user, I want to be able to debate/analyze the question in my tier so that I can gain points.
      * CoS
         * Verify that the user is in their own tier
         * Verify that the user is able to see which tier they are in
         * Verify that the user is rewarded/punished with ACS points post debate
* YES-71
   * As a registered user, I want to be able to agree/disagree on posts so that I can express my opinion on a debate (based on a scale from 1-100)
   * CoS:
      * Verify that users can input opinions in a debate
      * Verify that users can input a score (from 1-100) on opposing opinions
      * Verify that the user is rewarded more for higher scores
* YES-134
   * As a registered user, I want to be able to click on a username and go to their profile.
   * COS
      * Verify clicking profile takes you to their profile page
* YES-135
   * As an admin user, I want an admin page to modify trivia and debate so I can properly moderate the modules
   * COS
      * Verify admins can add and delete posts from the database
      * Verify admins can change trivia questions from the database
* YES-138
   * As a registered user, I want a good user interface for every module to navigate the app smoothly
      * change UI and flow of screens


# Task breakdowns: broken down into multiple subtasks on Jira
* YES-50
   * YES-120: Storyboard the game on Trivia
   * YES-121: Polish the UI
   * YES-130: Implement the UI
   * YES-132: Include front-end calls
   * YES-133: Include back-end calls
* YES-69
   * YES-122: Generate a question based on a user’s ACS tier
   * YES-123: Update requirements for Debate
   * YES-124: Have the question appear on the user’s Debate page and add an analysis textbox for submitting a response
   * YES-126: Storyboard the debate/analysis process on Figma
   * YES-127: Implement UI components based on storyboard
   * YES-128: Integrate the API with the front-end
   * YES-129: Update the UI to match the rest of the application
   * YES-139: Implement back-end for Debates
* YES-71
   * No subtasks.
* YES-134
   * No subtasks.
* YES-35
   * No subtasks.
* YES-47
   * YES-48: As a user, I want to get a notification from the app if my friend invites me to a trivia game so that I know and am alerted.
* YES-51
   * No subtasks.
* YES-53
   * YES-143: Create UI for daily picks
   * YES-144: Create frontend API calls for daily picks
   * YES-145: Create backend API calls for daily picks
   * YES-149: Create UI for playoffs picks
   * YES-150: Create frontend API calls for playoffs picks
   * YES-151: Create backend API calls for playoffs picks
   * YES-152: Create UI for preseason picks
   * YES-153: Create frontend API calls for preseason picks
   * YES-154: Create backend API calls for preseason picks
* YES-134
   * No subtasks.
* YES-135
   * YES-136: create UI for admin trivia page
   * YES-137: Create backend API calls to access and modify question
   * YES-155: Create UI for picks & predictions page
* YES-138
   * No subtasks.