function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 39.757837, lng: -105.0073}
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
