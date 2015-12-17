console.log("Make sure to install and enable the CORS Chrome extension: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi");

var count = 0;
var endTimeLast = Date.now();

//Get temporary access code
$("#strava").click(function() {
  window.location.replace("https://www.strava.com/oauth/authorize?client_id=9259&response_type=code&redirect_uri=https://g18-benebel.firebaseapp.com");
});

  var code = (window.location.href).split('=')[2];
  console.log("Temporary code: " + code);

  //Send in temporary code to get access token
  var stravaPoster = $.ajax({
    url: "https://www.strava.com/oauth/token?client_id=9259&client_secret=e301e742d1c80a96c360e327cb9a978a1cd4c705&code=" + code,
    method: "POST"
  });


  stravaPoster.done(function(response) {
    console.log("Succesful post! Access token: " + response.access_token);
    var token = response.access_token;

    var stravaGetter = $.ajax({
      url: "https://www.strava.com/api/v3/athlete/activities?access_token=" + token,
      method: "GET",
      dataType: "json"
    });

    stravaGetter.done(function(response) {
      console.log("Strava data loaded successfully!");
      localStorage.setItem("strava" + count, JSON.stringify(response));

      //Have to make multiple calls since the number of returned results is limited
      nextResponse(token, response);
    });

    stravaGetter.fail(function(response) {
      console.log("Error loading Strava data");
    });

    stravaPoster.fail(function(response) {
      console.log("Error requesting access token");
    });
  });

function nextResponse(token, response) {
  var endTime = Date.parse((response[response.length - 1]["start_date"]).split('T')[0] + " 00:00:00 GMT") / 1000 + 86400;

  if(endTime !== endTimeLast) {
    count++;
    endTimeLast = endTime;

    var stravaGetter2 = $.ajax({
      url: "https://www.strava.com/api/v3/athlete/activities?access_token=" + token + "&before=" + endTime,
      method: "GET",
      dataType: "json"
    });

    stravaGetter2.done(function(response2) {
      console.log("Strava data loaded successfully!");
      localStorage.setItem("strava" + count, JSON.stringify(response));

      //Have to make multiple calls since the number of returned results is limited
      nextResponse(token, response2);
    });

    stravaGetter2.fail(function(response2) {
      console.log("Error loading Strava data");
    });
  }
  else {
    initMap();
  }
}
