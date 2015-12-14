function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 39.757785, lng: -105.007142}
  });

  var marker = new google.maps.Marker({
    position: {lat: 39.757785, lng: -105.007142},
    map: map
  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById('send').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
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
