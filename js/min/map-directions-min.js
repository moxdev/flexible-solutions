function initialize(){var e=new google.maps.LatLng(39.130103,-76.792478),o=[];directionsDisplay=new google.maps.DirectionsRenderer;var t={scrollwheel:!1,streetViewControl:!1,maxZoom:18,center:e,mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN,google.maps.MapTypeId.SATELLITE]},mapTypeId:google.maps.MapTypeId.ROADMAP},a=new google.maps.Map(document.getElementById("side-map-canvas"),t);directionsDisplay.setMap(a),directionsDisplay.setPanel(document.getElementById("directions-panel"));var n=new google.maps.LatLngBounds,i,r,s="";for(r=0;r<locations.length;r++)i=new google.maps.Marker({position:new google.maps.LatLng(locations[r][1],locations[r][2]),map:a,title:locations[r][0]}),o.push(i),n.extend(i.getPosition());a.fitBounds(n)}function calcRoute(){var e=document.getElementById("start").value,o=document.getElementById("end").value,t={origin:e,destination:o,travelMode:google.maps.DirectionsTravelMode.DRIVING};return directionsService.route(t,function(e,o){o==google.maps.DirectionsStatus.OK?(directionsDisplay.setDirections(e),jQuery("#map-error").hide(),jQuery("#directions-panel").fadeIn(1e3)):(html="Starting address not found. Please check that you have entered it correctly.",jQuery("#map-error").append(html),jQuery("#map-error").fadeIn(1e3))}),!1}var directionDisplay,directionsService=new google.maps.DirectionsService;google.maps.event.addDomListener(window,"load",initialize);