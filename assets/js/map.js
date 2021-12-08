const x = document.getElementById("location");
        
        function getLocation(lat, long) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(lat, long);
           
            console.log(lat, long);
          } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
        }
        
        function showPosition(lat, long) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
        };
       

       
        var generateMap = function(lat, long) {
          var mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Grocery.json?limit=6&proximity=${long}%2C${lat}&types=poi&language=en&access_token=pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ`;
          fetch(mapUrl).then(function(response) {
              if(response.ok) {
                  response.json().then(function(data) {
                      console.log(data);
                      showPosition(lat, long);
                      mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ';
                      const map = new mapboxgl.Map({
                          container: 'map', // container ID
                          style: 'mapbox://styles/mapbox/streets-v11', // style URL
                          center: [lat, long], // starting position [lng, lat]
                          zoom: 9 // starting zoom
                      });

                  }
                  )} else {
                    console.log("invalid" )
                  }
          })
          .catch(function(error) {
              console.log("network error")
          })
      };
      console.log(generateMap(lat, long));