  var map;

  $(document).ready(function(){
    map = new L.Map('map'); 
    var mapnik = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/{z}/{x}/{y}.png', {maxZoom: 18, attribution: ""});
    var earth = new L.LatLng(51.505, -0.09);
    map.setView(earth, 2).addLayer(mapnik);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateError);
    } else {
      alert('Your browser doesn\'t support Geolocation');
    }
    
  });
  
  
  
  function geolocateSuccess(position) {
    var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);
    map.setView(latlng, 13);
    var marker = new L.GeolocateMarker(latlng, map, {});
    
    if ($.browser.mozilla) {
      var popupContent = '<p>You are in '+position.address.city+', '+position.address.country+'<br />'+position.address.street+', '+position.address.streetNumber+'</p>';
    } else {
      var popupContent = '<p>You are in latitude: '+position.coords.latitude+',<br/> longitude: '+position.coords.longitude+'</p>';
    }
    
    var popup = new L.Popup();
    popup.setLatLng(latlng);
    popup.setContent(popupContent);
    map.openPopup(popup);

  }


  function geolocateError(error) {
    alert('Geolocation error, try again :S');
  }