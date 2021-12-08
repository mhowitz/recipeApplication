const x = document.getElementById("location");
        
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
        }
        
        function showPosition(position) {
          x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
        };
       
       
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-111.8910474, 40.7607793], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
       