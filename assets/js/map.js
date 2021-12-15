const x = document.getElementById("location");
        
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
        }
        
        function showPosition(position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          generateMap(lat, long);
        };
       
       
        var generateMap = function(lat, long) {
          var mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Grocery.json?limit=5&proximity=${long}%2C${lat}&types=poi&language=en&access_token=pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ`;
          fetch(mapUrl).then(function(response) {
              if(response.ok) {
                  response.json().then(function(data) {
                      console.log(data);
                      createMap(lat,long, data.features);
                  }
                  )} else {
                    console.log("invalid" )
                  }
          })
          .catch(function(error) {
              console.log("network error")
          })
      };
      mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ';
      var createMap = function(lat, long, features) {
        console.log(features);
        var groceryMap = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [long,lat], // starting position [lng, lat]
            zoom:10  // starting zoom
        });
        $(features).each(function(i) {
          console.log(features);
          var featureDetails = new mapboxgl.Popup({offset:25}).setText(features[i].place_name)
          var featureMarker= new mapboxgl.Marker().setLngLat(features[i].geometry.coordinates).addTo(groceryMap).setPopup(featureDetails);
          featureMarker.setOffset([0, 1]);
          
        })
        var locationPopup = new mapboxgl.Popup({offset:25}).setText("Your Current Location")
        var locationMarker = new mapboxgl.Marker({"color":"#ff0000"}).setLngLat([long, lat]).addTo(groceryMap).setPopup(locationPopup);
        locationMarker.setOffset([0, 1]);
      };
      $("#locationBtn").click(getLocation);






