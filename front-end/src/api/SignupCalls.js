import { BASE_URL } from "./HttpClient.js"

/**
 * Creates a new user using the information from the sign up form.
 * Returns an object for the status of the request with the properties:
 * - success: `true` if successful, `false` if there was an error
 * - reason: the reason for the error; one of the following values
 *  - `''` default value for no errors
 *  - `'invalid'` invalid username, email, or password
 *  - `'unexpected'` an unexpected error from the database
 *  - `'network'` a network error
 *  - `'other'` an error that's none of the above
 * 
 * Questions:\
 * q1: Favourite sport?\
 * q2: Age\
 * q3: Highest level of sport play?\
 * q4: What sport would you like to know/learn about?\
 * q5: Favourite sports team?
 */
export async function signUp(username, password, email, phone, q1, q2, q3, q4, q5) {
    // Send the request to the server
    const body = {
        username: username,
        password: password,
        email: email,
        phoneNum: phone,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5
    };
    return fetch(BASE_URL + '/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        // Fetch only rejects on a network error. Response.ok is still true
        // when there's status codes not between 200-299
        if (!response.ok) {
            throw new Error('Network error');
        }
        return response;
    }).then(response => {
        // Convert server response to appropriate return object
        let ret = {
            success: true,
            reason: ''
        };
        switch(response.status) {
            // Sign up successful
            case 200:
                break;
            // Invalid username, email, or password
            case 400:
                ret.success = false;
                ret.reason = 'invalid';
                break;
            // Unexpected error with database
            case 500:
                ret.success = false;
                ret.reason = 'unexpected';
                break;
            // Some other error
            default:
                ret.success = false;
                ret.reason = 'other';
                // DEBUG ONLY
                console.error(
                    `Sign Up fetch had unexpected response code: ${response.status}
                    with status text: ${response.statusText}`
                );
                break;
        }
        return ret;
    }).catch(() => {
        // Fetch rejects with a TypeError when a network error occurs
        return {success: false, reason: 'network'};
    });
}
