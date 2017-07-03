var plain = new Plain();
var p = {
    lat: 39.908012,
    lng: 116.399348,
}
plain._v.setCoordType('GCJ02');


plain.use('AMAP');
var icon = plain.Icon({
    url: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
    size: [25, 40],
    anchor: [12.5, 40]
});
var markerOpt = {
    icon: icon,
    draggable: true
};
var map = plain.Map({
    container: document.getElementById("amap"),
    center: [p.lat, p.lng],
    zoom: 15
});
var marker = plain.Marker([p.lat, p.lng], markerOpt);
marker.on('click', function(e) {
    console.log(plain.Util.formatEvent.call(this, e));
});
map.addLayer(marker);

plain.use('BMAP');
var icon = plain.Icon({
    url: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
    size: [25, 40],
    anchor: [12.5, 40]
});
var markerOpt = {
    icon: icon,
    draggable: true
};
var map = plain.Map({
    container: document.getElementById("bmap"),
    center: [p.lat, p.lng],
    zoom: 15
});
map.addLayer(plain.Marker([p.lat, p.lng], markerOpt));

plain.use('GMAP');
var icon = plain.Icon({
    url: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
    size: [25, 40],
    anchor: [12.5, 40]
});
var markerOpt = {
    icon: icon,
    draggable: true
};
var map = plain.Map({
    container: document.getElementById("gmap"),
    center: [p.lat, p.lng],
    zoom: 15
});
map.addLayer(plain.Marker([p.lat, p.lng], markerOpt));
