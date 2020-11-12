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

const statusDef = { success: false, reason: '' };

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
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

/*ACS*/

/*Profile Picture*/
export async function updateUserPicture(src) {
    let newUrl = new URL(BASE_URL + UPDATEPICTURE);
    const params = { picture: src };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
}

/*Radar*/
export async function addProfileTracker(){

}

export async function deleteProfileTracker(){

}

/*Social*/

/*Status*/
export async function updateUserStatus(status) {
    let newUrl = new URL(BASE_URL + UPDATESTATUS);
    const params = { status: status };
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
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
    let status = {...statusDef};
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

async function fetchText(url, options){
    //handle calls that return text rather than json
    return await fetch(url, options)
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
        return {...statusDef};
      });
}