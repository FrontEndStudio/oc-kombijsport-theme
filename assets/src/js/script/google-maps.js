// google-maps.js

var geocoder;
var infowindow;
var code_address;

var i = '1';
var latlng;

var map_zoom = 17;

var name = 'Kombijsport Atletiek';
var address = '29 Dahliastraat, Badhoevedorp';

var html = address.split(",",2);
html = name + '<br />' + 'Dahliastraat 30' + '<br />' + html[1] + '<br />';

var map_directions = 'Route:';
var map_to_here = 'Hier naartoe';
var map_from_here = 'Hier vandaan';
var map_start = 'Vertrekpunt: (adres, plaats/provincie)';
var map_end = 'Aankomstpunt: (adres, plaats/provincie)';
var map_excecute = 'Opzoeken';

function initialize_map() {

  geocoder = new google.maps.Geocoder();

  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      latlng = results[0].geometry.location;

      var new_latlng = new google.maps.LatLng(52.344516, 4.770618);

      var options_map = {
        streetViewControl: false,
        zoom: map_zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      var map = new google.maps.Map(document.getElementsByClassName("google_map_wide")[0], options_map);

      var marker = new google.maps.Marker({
        position: new_latlng,
        map: map
      });

      var corrected_latlng = new google.maps.LatLng(52.343616, 4.770618000000013);

      map.panTo(corrected_latlng);
      map.setCenter(corrected_latlng);

      var directions_string = '<div class="contactform"><span style="font-size: 11px;">'+ html + '<br />'+ map_directions +' <a href="javascript:MapToHere('+i+')">'+ map_to_here +'</a> - <a href="javascript:MapFromHere('+i+')">'+ map_from_here +'</a></span></div>';

      var options_infowindow = ({
        content: directions_string
      });

      infowindow = new google.maps.InfoWindow(options_infowindow);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(directions_string);
        infowindow.open(map, marker);
      });

    } // status

  }); // geocoder.geocode

}

// address_to_latlng('straatnaam huisnummer, post_code woonplaats');
function address_to_latlng(address) {
  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var code_address = results[0].geometry.location;
      alert(code_address);
    }
  });
}

// latlng_to_address('52.305169, 4.634184')
function latlng_to_address(latlng) {

  var lat_lng_string = latlng.split(",",2);
  var lat = parseFloat(lat_lng_string[0]);
  var lng = parseFloat(lat_lng_string[1]);
  var lat_lng = new google.maps.LatLng(lat, lng);

  geocoder.geocode({'latLng': lat_lng }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        var formated_address = results[0].formatted_address;
        alert(formated_address);
      }
    }
  });

}

function MapToHere(i) {

  var to_here_string = '<div class="contactform"><span style="font-size: 11px;">'+ html + '<br />'+ map_directions +' <strong>'+ map_to_here +'</strong> - <a href="javascript:MapFromHere(' + i + ')">'+ map_from_here +'</a>' +
  '<br />'+ map_start +'<form action="http://maps.google.com/maps" method="get" target="_blank">' +
  '<input type="text" size="30" maxlength="40" name="saddr" id="saddr" value="" /><br />' +
  '<input value="'+ map_excecute +'" type="submit" class="submit">' +
  '<input type="hidden" name="hl" value="nl" />' +
  '<input type="hidden" name="daddr" value="' + address +
  "(" + name + ")" +
  '"/></span></div></form>';

  infowindow.setContent(to_here_string);

}

function MapFromHere(i) {

  var from_here_string = '<div class="contactform"><span style="font-size: 11px;">'+ html + '<br />'+ map_directions +' <a href="javascript:MapToHere(' + i + ')">'+ map_to_here +'</a> - <strong>'+ map_from_here +'</strong>' +
  '<br />'+ map_end +'<form action="http://maps.google.com/maps" method="get"" target="_blank">' +
  '<input type="text" size="30" maxlength="40" name="daddr" id="daddr" value="" /><br />' +
  '<input value="'+ map_excecute +'" type="submit" class="submit">' +
  '<input type="hidden" name="hl" value="nl" />' +
  '<input type="hidden" name="saddr" value="' + address +
  "(" + name + ")" +
  '"/></span></div></form>';

  infowindow.setContent(from_here_string);

}

if ($('.google_map_wide').length !== 0) {
  initialize_map();
}

//
// EOF
//
