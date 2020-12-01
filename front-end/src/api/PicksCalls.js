import { BASE_URL, fetchList, fetchText, fetchJson, fetchOptionsGet, fetchOptionsWithBody, PUT} from './HttpClient.js';

const 
    //get
    GETDAILY = '/picksandpredictions/daily',
    GETPLAYOFFS = '/picksandpredictions/playoffs',
    GETPRESEASON = '/picksandpredictions/preseason',
    //update
    UPDATEUSERDAILY = '/picksandpredictions/update/daily/users',
    UPDATEUSERPLAYOFF = '/picksandpredictions/update/playoffs/users';

//ensure status fields have no overlap with profile in db
const statusDef = { success: false, reason: '' };

export async function getDaily() {
    let newUrl = new URL(BASE_URL + GETDAILY);
    return await fetchList(newUrl, fetchOptionsGet());
  }

export async function getPlayoffs() {
    let newUrl = new URL(BASE_URL + GETPLAYOFFS);
    return await fetchList(newUrl, fetchOptionsGet());
  }

export async function getPreseason() {
    let newUrl = new URL(BASE_URL + GETPRESEASON);
    return await fetchList(newUrl, fetchOptionsGet());
  }

  export async function updateUserDaily(matchid, team) {
    let newUrl = new URL(BASE_URL + UPDATEUSERDAILY);
    const params = { matchid: matchid, team:team };
    newUrl.search = new URLSearchParams(params).toString();
    return await fetchJson(newUrl, fetchOptionsWithBody(PUT, params));
  }

  export async function updateUserPlayoffs(matchid, team) {
    let newUrl = new URL(BASE_URL + UPDATEUSERPLAYOFF);
    const params = { matchid: matchid, team:team };
    newUrl.search = new URLSearchParams(params).toString();
    return await fetchText(newUrl, fetchOptionsWithBody(PUT, params));
  }