/**
 * Contains common information for making HTTP requests to the backend server.
 */

/** The URL of the server */
export const BASE_URL = 'http://localhost:8080';
export const ORIGIN = 'http://localhost:3000';

export const 
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE';

//ensure status fields have no overlap with profile in db
const statusDef = { success: false, reason: '' };

export function fetchOptionsGet(){
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

export function fetchOptionsWithBody(method, body){
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
        // Not authenticated
        case 404:
            status.reason = 'Not Found';
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

export async function fetchJson(url, options){
    //handle calls that return json
    return await fetch(url, options)
    .then(async(res) => {
    let status = statusCatcher(res.status);
    if (status.success){
    //expect a json body with wanted information, merge with status
    Object.assign(status, await res.json());
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

export async function fetchText(url, options){
    //handle calls that return text rather than json
    // console.log(url);
    // console.log(options);
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

export async function fetchList(url, options){
    //handle calls that return list
    return await fetch(url, options)
    .then(async(res) => {
    let status = statusCatcher(res.status);
    if (status.success){
    //expect a list body with wanted information, merge with status
    //push json list into list
    var result = [];
    var json_data = await res.json();
    for(var i in json_data)
        result.push(json_data [i]);
    status.list = result;
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