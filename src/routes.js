const express = require("express");
const cors = require("cors");
const router = express.Router();
//const router = express();
const validateUser = require("./validator");

const signupController = require("./back-end/controller/SignupController");
const loginController = require("./back-end/controller/LoginController");
const profileController = require("./back-end/controller/ProfileController");
const pickspredictionsController = require("./back-end/controller/PicksPredictionsController");
const debateController = require("./back-end/controller/DebateController");
const thezoneController = require("./back-end/controller/TheZoneController");
const triviaController = require("./back-end/controller/TriviaController");

/* USER */

// Create user
router.put("/user", validateUser.validateUser, signupController.user_put);

// Get user
router.get("/user", signupController.user_get);

// Update user password
router.put("/user/update/password", signupController.user_update_password_put);

// Update user email
router.put("/user/update/email", signupController.user_update_email_put);

// Update user phone number
router.put(
  "/user/update/phonenumber",
  signupController.user_update_phone_number_put
);

// Delete user
router.delete("/user", signupController.user_del);

/* LOGIN */

// Get login authentication
router.get("/login", cors(), loginController.auth_get);

// Logout
router.put("/logout", loginController.auth_put);

/* PROFILE */

// Create profile
router.put("/profile", profileController.profile_put);

// Get profile
router.get("/profile", profileController.profile_get);

// Get profile picks
router.get("/profile/picks", profileController.profile_picks_get);

// Update profile picture
router.put(
  "/profile/update/picture",
  profileController.profile_update_picture_put
);

// Update profile about
router.put("/profile/update/about", profileController.profile_update_about_put);

// Update profile status
router.put(
  "/profile/update/status",
  profileController.profile_update_status_put
);

// Update profile ACS
router.put("/profile/update/ACS", profileController.profile_update_ACS_put);

// Delete profile
router.delete("/profile", profileController.profile_del);

/* TRIVIA */

// Create questions
router.put("/trivia", triviaController.questions_put);

// Get questions
router.get("/trivia", triviaController.questions_get);

// Update questions
router.put("/trivia", triviaController.questions_update_put);

// Delete questions
router.delete("/trivia", triviaController.questions_del);

/* PICKS & PREDICTIONS */

// Create matches
router.put("/picksandpredictions", pickspredictionsController.matches_put);

// Get matches
router.get("/picksandpredictions", pickspredictionsController.matches_get);

// Update matches
router.put(
  "/picksandpredictions",
  pickspredictionsController.matches_update_put
);

// Delete matches
router.delete("/picksandpredictions", pickspredictionsController.matches_del);

/* DEBATE */

// Create debate topics
router.put("/debates", debateController.debate_topics_put);

// Create debate submission
router.put("/debates/submission", debateController.debate_submission_put);

// Get debate topics
router.get("/debates", debateController.debate_topics_get);

// Get debate submission
router.get("/debates/submission", debateController.debate_submission_get);

// Get debate submission time limit
router.get(
  "/debates/submission/time",
  debateController.debate_submission_time_limit_get
);

// Update debate topics
router.put("/debates", debateController.debate_update_topics_put);

// Update debate submission score
router.put(
  "/debates/submission/score",
  debateController.debate_submission_update_score_put
);

// Delete debate topics
router.delete("/debates", debateController.debate_topics_del);

/* OPEN COURT */

// Create the zone post
router.put("/thezone", thezoneController.the_zone_post_put);

// Get the zone post
router.get("/thezone", thezoneController.the_zone_post_get);

// Update the zone post
router.put("/thezone", thezoneController.the_zone_update_post_put);

// Update the zone post likes
router.put("/thezone/likes", thezoneController.the_zone_update_likes_put);

// Delete the zone post
router.delete("/thezone", thezoneController.the_zone_post_del);

module.exports = router;
