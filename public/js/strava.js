//Get temporary access code
$("#send").click(function() {
  window.location.replace("https://www.strava.com/oauth/authorize?client_id=9259&response_type=code&redirect_uri=https://g18-benebel.firebaseapp.com");
});

var code = (window.location.href).split('=')[2];

//Send in temporary code to get access token
var stravaPoster = $.ajax({
  url: "https://www.strava.com/oauth/token?client_id=9259&client_secret=e301e742d1c80a96c360e327cb9a978a1cd4c705&code=" + code,
  method: "POST",
});

var token = "";

stravaPoster.done(function(response) {
  token = response.access_token;
});

stravaPoster.fail(function(response) {
  console.log("Error requesting access token");
});

var stravaGetter2 = $.ajax({
  url: "https://www.strava.com/api/v3/athlete/activities?access_token=" + token,
  method: "GET",
  dataType: "json",
});

stravaGetter2.done(function(response) {
  console.log("Strava data loaded successfully!");
  localStorage.setItem("strava", JSON.stringify(response));
});

stravaGetter2.fail(function(response) {
  console.log("Error loading Strava data");
});
