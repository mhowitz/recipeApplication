


//  Determine current location       
function showPosition(position) {
  var latlon = position.coords.latitude + "," + position.coords.longitude;

  var img_url = "https://api.mapbox.com/styles/v1/chelseao86/ckwv8wnqv0vww15oe26f2wa7c/draft.html?
	title=false&access_token=pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ&zoomwheel=false#12/48.8665/2.3176" title="Basic" 
	style="border:none;";

  document.getElementById(“iframe”).innerHTML = "<img src='"+img_url+"'>";
}
    

  
  // Send a map request using  Type of “grocery” and Proximity equal to HTML position function
  
  $ curl "https://api.mapbox.com/styles/v1/chelseao86/ckwv8wnqv0vww15oe26f2wa7c/draft.html?
      title=false&access_token=pk.eyJ1IjoiY2hlbHNlYW84NiIsImEiOiJja3d2OGlpN3EwM2Y1MnZzZXJ6NGhubmkyIn0.3AK1uWnQqg3Mq8Y2JJE0HQ&zoomwheel=false#12/48.8665/2.3176" title="Basic" 
      style="border:none;"
  
  