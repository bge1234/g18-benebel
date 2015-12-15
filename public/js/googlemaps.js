$(window).load(function() {
  //Create map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 39.757785, lng: -105.007142}
  });

  //Mark starting position for reference
  var marker = new google.maps.Marker({
    position: {lat: 39.757785, lng: -105.007142},
    map: map,
    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
  });

  //Display rides from polylines
  // var stravaStored = JSON.parse(localStorage.getItem ("strava"));
  // console.log(stravaStored);
  // for(var i = 0; i < stravaStored.length; i++) {
  for(var i = 0; i < stravaData.length; i++) {
    var decodedPath = google.maps.geometry.encoding.decodePath(stravaData[i]["map"]["summary_polyline"]);
    // var decodedPath = google.maps.geometry.encoding.decodePath(stravaStored[i]["map"]["summary_polyline"]);
    var decodedLevels = decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    var setRegion = new google.maps.Polyline({
      path: decodedPath,
      levels: decodedLevels,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    });
  }

  //Display markers at CCDB points
  for(var i = 0; i < ccdbData.length; i++) {
    getColor(ccdbData[i]["date"]);
    var marker = new google.maps.Marker({
      position: {lat: ccdbData[i]["latitude"], lng: ccdbData[i]["longitude"]},
      map: map,
      icon: getColor(ccdbData[i]["date"])
    });
  }

  var geocoder = new google.maps.Geocoder();

  document.getElementById('send').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
});

function decodeLevels(encodedLevelsString) {
  var decodedLevels = [];

  for (var i = 0; i < encodedLevelsString.length; ++i) {
      var level = encodedLevelsString.charCodeAt(i) - 63;
      decodedLevels.push(level);
  }
  return decodedLevels;
}

function getColor(date) {
  var currentDate = getYearMonth();

  if(date.indexOf("2015-12") > -1)
    return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  else if (date.indexOf("2015-11") > -1 || date.indexOf("2015-10") > -1 || date.indexOf("2015-09") > -1)
    return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
  else if (date.indexOf("2015-08") > -1 || date.indexOf("2015-07") > -1 || date.indexOf("2015-06") > -1)
    return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
  else
    return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  // if(date.indexOf("2015-12") > -1)
  //   return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  // else if (date.indexOf("2015-11") > -1 || date.indexOf("2015-10") > -1 || date.indexOf("2015-09") > -1)
  //   return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
  // else if (date.indexOf("2015-08") > -1 || date.indexOf("2015-07") > -1 || date.indexOf("2015-06") > -1)
  //   return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
  // else
  //   return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
}

function getYearMonth() {
  var current = new Date();
  var dateArray = (current.toString()).split(' ');

  var month = "";
  if (dateArray[1] === "Jan")
    month = 01;
  else if (dateArray[1] === "Feb")
    month = 02;
  else if (dateArray[1] === "Mar")
    month = 03;
  else if (dateArray[1] === "Apr")
    month = 04;
  else if (dateArray[1] === "May")
    month = 05;
  else if (dateArray[1] === "Jun")
    month = 06;
  else if (dateArray[1] === "Jul")
    month = 07;
  else if (dateArray[1] === "Aug")
    month = 08;
  else if (dateArray[1] === "Sep")
    month = 09;
  else if (dateArray[1] === "Oct")
    month = 10;
  else if (dateArray[1] === "Nov")
    month = 11;
  else if (dateArray[1] === "Dec")
    month = 12;

  var yearMonthString = dateArray[3] + '-' + month + '-' + dateArray[2];
  return yearMonthString;
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('location').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    }
    else
      alert('Geocode was not successful for the following reason: ' + status);
  });
}
