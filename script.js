import { groupedData } from "./users.js";

let geojson;
const accessToken =
  "pk.eyJ1IjoiZW50YWZhemFsaSIsImEiOiJja3l1NDY0MTQxazNsMnhsZXlpYWI2ZmtlIn0.SAhzICYQFTFT8jLaZzObdg";
let map = L.map("map").setView([12.975, 77.62], 11);
let info = L.control();
let tiles = L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken,
  }
).addTo(map);

function getColor(d) {
  return d >= 300
    ? "#e0f7fa"
    : d >= 290
    ? "#b2ebf2"
    : d >= 280
    ? "#80deea"
    : d >= 270
    ? "#4dd0e1"
    : d >= 260
    ? "#800026"
    : d >= 250
    ? "#26c6da"
    : d >= 240
    ? "#E31A1C"
    : d >= 230
    ? "#FC4E2A"
    : d >= 220
    ? "#FD8D3C"
    : d >= 210
    ? "#FEB24C"
    : d >= 200
    ? "#FED976"
    : "#FFEDA0";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.area_id),
    weight: 2,
    opacity: 1,
    color: "black",
    dashArray: "3.5",
    fillOpacity: 0.75,
  };
}

function highlightFeature(e) {
  let layer = e.target;
  layer.setStyle({
    weight: 3,
    color: "#000",
    dashArray: "1",
    fillOpacity: 0.95,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(
    layer.feature.properties,
    groupedData[layer.feature.properties.area_id]
  );
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
}

geojson = L.geoJson(data, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);

info.onAdd = function (map) {
  this.element = L.DomUtil.create("div", "info");
  this.update();
  return this.element;
};

info.update = function (props, userInfo) {
  this.element.innerHTML =
    "<div><b>Kyupid users data</b></div>" +
    (props
      ? "<strong>Location: " +
        props.name +
        "</strong><br />" +
        "<strong>Pin code: " +
        props.pin_code +
        "</strong><br />" +
        "<strong>Male user: " +
        userInfo.maleCount +
        "</strong><br />" +
        "<strong>Female user: " +
        userInfo.femaleCount +
        "</strong><br />" +
        "<strong>Pro user: " +
        userInfo.pro_user +
        "</strong><br />"
      : "Hover over a area to see user data");
};

info.addTo(map);
