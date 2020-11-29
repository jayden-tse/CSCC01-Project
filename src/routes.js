const express = require('express');
const cors = require('cors');
const router = express.Router();
const validateUser = require('./validator');

const userController = require('./back-end/controller/UserController');
const signupController = require('./back-end/controller/SignupController');
const loginController = require('./back-end/controller/LoginController');
const profileController = require('./back-end/controller/ProfileController');
const pickspredictionsController = require('./back-end/controller/PicksPredictionsController');
const debateController = require('./back-end/controller/DebateController');
const thezoneController = require('./back-end/controller/TheZoneController');
const triviaController = require('./back-end/controller/TriviaController');

//cors necessary for calling from different port/url
router.use(cors());

/* USER */

// Check existing username
router.put('/user/check/username', userController.user_check_username_get);

// Check existing email address
router.put('/user/check/email', userController.user_check_email_get);

// Check existing phone number
router.put('/user/check/phonenum', userController.user_check_phonenum_get);

// Update user password
router.put('/user/update/password', userController.user_update_password_put);

// Update user email
router.put('/user/update/email', userController.user_update_email_put);

// Update user phone number
router.put('/user/update/phonenum', userController.user_update_phonenum_put);

// Send user password recovery email
router.put(
  '/user/send/password',
  userController.user_send_new_password_recovery_email
);

// Send user new email confirmation email
router.put(
  '/user/send/email',
  userController.user_send_new_email_confirmation_email
);

// Send user new phone number sms
router.put(
  '/user/send/phonenum',
  userController.user_send_new_phonenum_confirmation_sms
);

/* SIGNUP */

// Signup user
router.put('/signup', validateUser.validateUser, signupController.user_put);

/* LOGIN */

// Get login authentication
router.put('/login', loginController.auth);

// Logout
router.put('/logout', loginController.deauth);

/* PROFILE */

// Add match to profile picks
router.put('/profile/add/picks', profileController.profile_add_picks_put);

// Add user to profile tracker
router.put('/profile/add/tracker', profileController.profile_add_user_tracker_put);

// Get profile
router.get('/profile', profileController.profile_get);

// Get profile picks
router.get('/profile/picks', profileController.profile_picks_get);

// Get profile tracker
router.get('/profile/tracker', profileController.profile_tracker_get);

// Get profile picture
router.get('/profile/picture', profileController.profile_picture_get);

// Get profile's links
router.get('/profile/links', profileController.profile_links_get);

// Update profile picture
router.put(
  '/profile/update/picture',
  profileController.profile_update_picture_put
);

// Update profile about
router.put('/profile/update/about', profileController.profile_update_about_put);

// Update profile status
router.put(
  '/profile/update/status',
  profileController.profile_update_status_put
);

// Update profile tracker
router.put(
  '/profile/update/tracker',
  profileController.profile_update_tracker_put
);

// Update profile ACS
router.put('/profile/update/ACS', profileController.profile_update_ACS_put);

// Update profile link for facebook
router.put('/profile/update/links/facebook', profileController.profile_update_links_facebook_put);

// Update profile link for twitter
router.put('/profile/update/links/twitter', profileController.profile_update_links_twitter_put);

// Update profile link for instagram
router.put('/profile/update/links/instagram', profileController.profile_update_links_instagram_put);

// Delete profile tracker
router.delete('/profile/delete/tracker', profileController.profile_tracker_del);

/* TRIVIA */

// Create questions
router.put('/trivia/create/question', triviaController.questions_put);

// Get questions
router.get('/trivia/question', triviaController.questions_get);

// Update questions
router.put('/trivia/update/question', triviaController.questions_update_put);

// Delete questions
router.delete('/trivia/delete/question', triviaController.questions_del);

/* PICKS & PREDICTIONS */

// Create matches for daily picks
router.put('/picksandpredictions/create/daily', pickspredictionsController.matches_daily_picks_put);

// Create matches for playoffs picks
router.put('/picksandpredictions/create/playoffs', pickspredictionsController.matches_playoffs_picks_put);

// Create matches for preseason picks
// router.put('/picksandpredictions/create/preseason', pickspredictionsController.matches_preseason_picks_put);

// Get matches from daily picks
router.get('/picksandpredictions/daily', pickspredictionsController.matches_daily_picks_get);

// Get matches from playoffs picks
router.get('/picksandpredictions/playoffs', pickspredictionsController.matches_playoffs_picks_get);

// Get matches from preseason picks
// router.get('/picksandpredictions/preseason', pickspredictionsController.matches_preseason_picks_get);

// Update matches for daily picks
router.put('/picksandpredictions/update/daily', pickspredictionsController.matches_update_daily_picks_put);

// Update matches for playoffs picks
router.put('/picksandpredictions/update/playoffs', pickspredictionsController.matches_update_playoffs_picks_put);

// Update matches for preseason picks
// router.put('/picksandpredictions/update/preseason', pickspredictionsController.matches_update_preseason_picks_put);

// Delete a match in daily picks
router.delete('/picksandpredictions/delete/daily/match', pickspredictionsController.matches_daily_picks_del);

// Delete all matches in daily picks
router.delete('/picksandpredictions/delete/daily/all', pickspredictionsController.matches_daily_picks_all_del);

// Delete all matches in playoffs picks
router.delete('/picksandpredictions/delete/playoffs', pickspredictionsController.matches_playoffs_picks_all_del);

// Delete all matches in preseason picks
// router.delete('/picksandpredictions/delete/preseason', pickspredictionsController.matches_preseason_picks_all_del);


/* DEBATE */

// Create debate topics
router.put('/debates/create/topic', debateController.debate_topics_put);

// Create debate submission
router.put(
  '/debates/create/submission',
  debateController.debate_submission_put
);

// Get debate topics
router.get('/debates/topic', debateController.debate_topics_get);

// Get debate submission
router.get('/debates/submission', debateController.debate_submission_get);

// Get debate submission time limit
router.get(
  '/debates/submission/time',
  debateController.debate_submission_time_limit_get
);

// Update debate topics
router.put('/debates/update/topic', debateController.debate_update_topics_put);

// Update debate submission score
router.put(
  '/debates/submission/update/score',
  debateController.debate_submission_update_score_put
);

// Delete debate topics
router.delete('/debates/delete/topic', debateController.debate_topics_del);

/* THE ZONE */

// Create the zone post
router.put('/thezone/create/post', thezoneController.the_zone_post_put);

// Get the zone post
router.get('/thezone/post', thezoneController.the_zone_post_get); // PUT request to accept input

// Get all zone posts
router.get('/thezone/post/all', thezoneController.the_zone_all_posts_get);

// Get all comments on a post
router.get('/thezone/post/comments', thezoneController.the_zone_post_comments_get);

// Update the zone post
router.put('/thezone/update/post', thezoneController.the_zone_update_post_put);

// Update the zone post votes
router.put('/thezone/update/vote', thezoneController.the_zone_update_vote_put);

// Update the zone post's comment
router.put('/thezone/update/post/comment', thezoneController.the_zone_comment_put);

// Update the zone post comment's vote
router.put('/thezone/update/post/comment/vote', thezoneController.the_zone_update_comment_vote_put)

// Delete the zone post
router.delete('/thezone/delete/post', thezoneController.the_zone_post_del);

// Delete the zone comment
router.delete('/thezone/delete/comment', thezoneController.the_zone_comment_del);
module.exports = router;
