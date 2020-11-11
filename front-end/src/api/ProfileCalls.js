import { BASE_URL, ORIGIN } from './HttpClient.js';
//get
const 
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PROFILE = '/profile',
    //update
    UPDATEPICTURE = '/profile/update/picture',
    UPDATEABOUT = '/profile/update/about',
    UPDATESTATUS = '/profile/update/status',
    UPDATEPICKS = '/profile/update/picks',
    UPDATETRACKER = '/profile/update/tracker',
    DELETETRACKER = '/profile/delete/tracker';

/*Profile Full*/
export function getProfile(username) {
    let newUrl = new URL(BASE_URL + PROFILE);
    const params = { username: username };
    newUrl.search = new URLSearchParams(params).toString();
    return fetch(newUrl, fetchOptionsGet())
      .then((res) => {
      const status = statusCatcher(res.status);
      if (status.success){
       //expect a json body with wanted information
        return res.json();
      //return{ACS:111,ACSChange:0} //debug: expected within profile
      } else {
      //on failure, (debug)
          console.log(status.reason);
          return {error:true};
      }
      }).catch((error) => {
        console.log('Error connecting to backend service: ' + error);
      });
  }

/*ABOUT*/
export async function updateUserAbout(about) {
    let newUrl = new URL(BASE_URL + UPDATEABOUT);
    const params = { about: about };
    return fetch(newUrl, fetchOptionsWithBody(PUT, params))
      .then(async(res) => {
      const status = statusCatcher(res.status);
      if (status.success){
       //expect text in body with backend message
       status.text = await res.text();
       return status;
      } else {
      //on failure, (debug)
          console.log(status.reason);
          return status;
      }
      }).catch((error) => {
        console.log('Error connecting to backend service: ' + error);
      });
}

/*ACS*/

/*Profile Picture*/
export function updateUserPicture(username, src) {
  return '';
}

/*Radar*/
export async function addProfileTracker(){

}

export async function deleteProfileTracker(){

}

/*Social*/

/*Status*/
export async function updateUserStatus(message) {
    //user stored in backend
    const newUrl = BASE_URL + UPDATESTATUS;
        var params = { about: message };
    var fetchOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    };
    return fetch(newUrl, fetchOptions)
        .then((res) => {
            return res;
        })
        .catch((error) => {
        console.log('Error connecting to backend service: ' + error);
        });
}

function fetchOptionsGet(){
    return {
        method: GET,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': ORIGIN,
        },
        withCredentials: true,
        credentials: 'include',
      };
}

function fetchOptionsWithBody(method, body){
    return {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': ORIGIN,
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(body),
      };
}

function statusCatcher(resStatus){
    // Convert server response to appropriate status object
    let status = {
        success: false,
        reason: ''
    };
    switch(resStatus) {
        // Call successful
        case 200:
            status.success = true;
            break;
        // Not authenticated
        case 401:
            status.reason = 'Not Authenticated';
            break;
        // Unexpected error with database
        case 500:
            status.reason = 'Unexpected Database Failure';
            break;
        // Some other error
        default:
            status.reason = 'other';
            // DEBUG ONLY
            // console.error(
            //     `Sign Up fetch had unexpected response code: ${response.status}
            //     with status text: ${response.statusText}`
            // );
            break;
    }
    return status;
}
