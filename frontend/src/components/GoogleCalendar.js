const gapi = window.gapi
const CLIENT_ID = "716910601283-b3lhnv6lj93f01c4hmagk7ibo84064u9.apps.googleusercontent.com"
const DISCOVERY_DOCS = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
const SCOPES = "https://www.googleapis.com/auth/calendar"

/*global google*/
var token_client;
var client_loaded = false;

async function initClients() {

  if (!client_loaded) {
    await gapi.load("client")
    await gapi.client.init({})
    console.log("Loaded and initialised gapi client")
    await gapi.client.load(DISCOVERY_DOCS)
    //await gapi.client.setApiKey(API_KEY)
    console.log('Loaded Calendar')
      
    token_client = await google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      prompt: "consent",
      callback: "",
    })
    console.log("Initialised token client")
    client_loaded = true;
  }
  return "yeet"
}

// gets new access token if it has expired
async function getToken(err) {
  if ((err.result.error.code === 401 || err.result.error.code === 403) &&
      (err.result.error.status === "UNAUTHENTICATED")) {
    // The access token is missing, invalid, or expired, prompt for user consent to obtain one.
    await new Promise((resolve, reject) => {
      try {
        // Settle this promise in the response callback for requestAccessToken()
        token_client.callback = (resp) => {
          if (resp.error !== undefined) {
            reject(resp);
          }
          // GIS has automatically updated gapi.client with the newly issued access token.
          console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
          
          resolve(resp);
        };
        token_client.requestAccessToken();
      } catch (err) {
        console.log(err)
      }
    });
    } else {
    // Errors unrelated to authorization: server errors, exceeding quota, bad requests, and so on.
    throw new Error(err);
  }
}

// gets eventID with same matching name
// can be updated for more correctness later
async function getEventID(name) {

  let res = await authRequest(gapi.client.calendar.events.list, {
    "calendarId": "primary"
  })

  for (const item of res.result.items) {
    if (item.summary === name) {
      return item.id
    }
  }

  return "failed to get Event ID"
}


// attempts to make input request and reauthenticates if 
// previous token has expired
// takes in the request function and body
// returns the response
async function authRequest(requestFunction, requestBody) {
  var res;
  try {
    res = await requestFunction(requestBody)
  } catch (err) {
    await getToken(err);
    res = await requestFunction(requestBody)
  }
  return res
}

// ======= Functions which do stuff ====================
// NOTE: events are currently ID-ed by their name which is obviously bad
// but I cbf changing this rn
// might change later to id based on name + description + dueDate


// req start datetime
// take in summary, description

export async function addEvent(title, description="", startTime, priority) {

  console.log(title, description)
  await initClients()
  
  var event = {
    'summary': title,
    'description': description,
    'start': {
      'dateTime': '2022-04-10T09:00:00-07:00',
      'timeZone': 'Australia/Sydney'
    },
    "end": {
      'dateTime': '2022-04-10T09:00:00-07:00',
      'timeZone': 'Australia/Sydney'
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        //{'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 30},
      ]
    }
  }


  try {
    await authRequest(await gapi.client.calendar.events.insert,{
      'calendarId': 'primary',
      'resource': event,
    })
    alert("Added Event to calendar.")
  } catch (err) {
    console.log(err)
    alert("Failed to add event to calendar.")
  }


  // await editEvent(title, {
  //   "description": "this is very pog man"
  // })
  //await removeEvent(title)

}

// edits events based on input
// pass in changes as an object with new params to be changed
export async function editEvent(name, changes) {
  await initClients()

  let eventID = await getEventID(name)

  try{
    await authRequest(gapi.client.calendar.events.patch,{
      "calendarId": "primary",
      "eventId": eventID,
      "resource": changes
    })
    alert("Event has been successfully updated in calendar.")
  } catch (err) {
    console.log(err)
    alert("Failed to update event in calendar")
  }


}




// event removes based on task name
export async function removeEvent(name) {
  await initClients()
  let eventID = await getEventID(name)

  try {
    await authRequest(gapi.client.calendar.events.delete,{
      "calendarId": "primary",
      "eventId": eventID
    })

    alert("Event successfully deleted from calendar")
  } catch (err) {
    console.log(err)
    alert("Unable to delete event from Calendar")
  }
    
}

