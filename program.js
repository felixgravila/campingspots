document.getElementById("mapid").style.height = (window.innerHeight - 20) + "px";
document.getElementById("mapid").style.width = (window.innerWidth - 20) + "px";

var mymap = L.map('mapid').setView([56.3, 9.24], 9);
L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

var tso = tentingspots['objects']

var utm = "+proj=utm +zone=32";
var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
// Convert coordinates
for (t of tso) {
  l0 = parseFloat(t.the_geom2.coordinates[0]);
  l1 = parseFloat(t.the_geom2.coordinates[1]);
  coords = proj4(utm, wgs84, [l0, l1]);
  t.coords = [coords[1], coords[0]];
}

var dictionary = {
  "Bålplads": "Fireplace",
  "Drikkevand": "Drinking water",
  "Egnetfor gangbesværede": "Mobility impaired access",
  "Egnet for barnevogne": "Stroller access",
  "Heste tilladt ": "Horses allowed",
  "Hunde i snor tilladt": "Dogs allowed",
  "Kørestolsegnet": "Wheelchair access",
  "Shelter ": "Shelter",
  "Adgang fra vand ": "Access from water",
  "Mulighed for bad": "Bathing facilities",
  "Brænde": "Firewood"
}


var props = {
  "Fireplace": L.layerGroup([]),
  "Drinking water": L.layerGroup([]),
  "Mobility impaired access": L.layerGroup([]),
  "Stroller access": L.layerGroup([]),
  "Horses allowed": L.layerGroup([]),
  "Dogs allowed": L.layerGroup([]),
  "Wheelchair access": L.layerGroup([]),
  "Shelter": L.layerGroup([]),
  "Access from water": L.layerGroup([]),
  "Bathing facilities": L.layerGroup([]),
  "Firewood": L.layerGroup([])
};

for (t of tso) {
  var marker = L.marker([t.coords[0], t.coords[1]]);
  for (a of t.attributes) {
    props[dictionary[a.attributename]].addLayer(marker);
  }
}

L.control.layers(props, []).addTo(mymap);