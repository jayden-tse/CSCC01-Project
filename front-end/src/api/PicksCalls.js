import { BASE_URL, ORIGIN } from './HttpClient.js';

const
    //key words
    GET = 'GET',
    PUT = 'PUT';

//ensure status fields have no overlap with profile in db
const statusDef = { success: false, reason: '' };

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

async function fetchJson(url, options){
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