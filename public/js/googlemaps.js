$(window).load(function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 39.757785, lng: -105.007142}
  });

  var marker = new google.maps.Marker({
    position: {lat: 39.757785, lng: -105.007142},
    map: map
  });

  for(var i = 0; i < stravaData.length; i++) {
    var decodedPath = google.maps.geometry.encoding.decodePath(stravaData[i]["map"]["summary_polyline"]);
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

// function initMap() {
//     var myLatlng = new google.maps.LatLng(39.757785, -105.007142);
//     var myOptions = {
//         zoom: 11,
//         center: myLatlng,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     }
//     var map = new google.maps.Map(document.getElementById("map"), myOptions);
//
//     var decodedPath = google.maps.geometry.encoding.decodePath("{nsqFbqa`S`sAg}EriAiw@fP_YvPeQvX}k@`EcXHi_@}U?wBsCk\\?QcuCceACDg_AqIb@nTO@vMuh@g@oA}Is@rJeU}@HgnLwu@AaB|@JvDAwFuQ_A{DpF_MrAc~Eb@VnhKlA|KfAfAfAwCf@zBJsAi@|GeJ|Z_SpQsHZ}HpDkN~UaHdXiEdIeCp@qGoCkIzPmCuCkc@sCoSgEsGb@uCmDcLdDDj^qBhQFjIzBfRfYny@jCrb@UlMnCbA~GlSnHtLTxH{F~WeG_IoI`@gAmPq[}@}BjG`@iCoAmAa[M_H|@kJ|McXhOoIImHgIoA~DXrH`BvCbDmJnMz@jWyNtIgMlHgAtbFt@bnA`PpBvECvLcAWfAhC|@|lAfl@u@XmEvxA[~BhEdD\\`ShXv^kh@uAuB_BdB_C_Bw[_c@|BfF{ItQlCfEkHnHzNtS`@lCzFrFrObG~M~b@X`oBmQv@");
//     var decodedLevels = decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
//
//     var setRegion = new google.maps.Polyline({
//         path: decodedPath,
//         levels: decodedLevels,
//         strokeColor: "#FF0000",
//         strokeOpacity: 1.0,
//         strokeWeight: 2,
//         map: map
//     });
// }
//
// function decodeLevels(encodedLevelsString) {
//     var decodedLevels = [];
//
//     for (var i = 0; i < encodedLevelsString.length; ++i) {
//         var level = encodedLevelsString.charCodeAt(i) - 63;
//         decodedLevels.push(level);
//     }
//     console.log(decodedLevels);
//     return decodedLevels;
// }
