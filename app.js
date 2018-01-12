//funcionalidad del mapa
var map;
var infowindow; //pines

function initMap()
{
  // Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function(pos) {

  lat = pos.coords.latitude;
  lon = pos.coords.longitude;

  var myLatlng = new google.maps.LatLng(lat, lon);

  var cineLatLng = {lat: -33.420942, lng: -70.640387};

  var mapOptions = {
    center: myLatlng,
    zoom: 16,
  };

  map = new google.maps.Map(document.getElementById("map"),  mapOptions); 

  // Creamos el infowindow que nos dara info del pin
  infowindow = new google.maps.InfoWindow();

  //creamos los pines : "tu estas aqui"(youMarker) & "aqui estan dando"(cineMarker)
  var youMarker = new google.maps.Marker({
  position: myLatlng,
  map: map,
  center : myLatlng,
  });

  var cineMarker = new google.maps.Marker({
  position: cineLatLng,
  map: map,
  });

  //se crean variables con contenido para los pines antes mencionados.
  var content = "<p>aqui estan dando <b>Grease</b><br> <b>Director</b>:Randal Kleiser</p>";
  var scndContent ="<p><b>Tu estas aqui</b></p>";

  //se crea un infoWindow aparte para ambos pines.
  var infoPin = new google.maps.InfoWindow();

  // se crea evento para ver el contenido del pin cineMarker
  google.maps.event.addListener(cineMarker,'click',function(){
    infoPin.setContent(content)
    infoPin.open(map,this);
  });

  //se crea evento para ver el contenido del pin youMarker
  google.maps.event.addListener(youMarker,'click',function(){
    infoPin.setContent(scndContent);
    infoPin.open(map,this);
  });

  // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
  var request = {
    location: myLatlng,
    radius: 5000,
    types: ['museum','park']
  };

  

  // Creamos el servicio PlaceService y enviamos la petición.
  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        crearMarcador(results[i]);
      }
    }
  });


});

}

function crearMarcador(place)
{
  // Creamos un marcador
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

// Asignamos el evento click del marcador para que nos muestre la info
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });



  }

 
