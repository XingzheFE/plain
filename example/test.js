var path = [
    [39.910, 116.404],
    [39.71, 116.5],
    [39.909, 117],
    [39.710, 118]
];
var map = plain.Map({
    container: "map",
    center: [39.910, 116.404],
    zoom: 15
});
var icon = plain.Icon({
    url: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
    size: [25, 40],
    anchor: [12.5, 40]
});
var markerOpt = {
    icon: icon,
    draggable: true
};
var marker = plain.Marker([39.910, 116.404], markerOpt);
var marker2 = plain.Marker([39.910, 116.402], markerOpt);
var polyline = plain.Polyline(path, {
    color: "#f00",
    weight: 2,
    opacity: 0.8
});
map.addLayer([marker, marker2]);
map.addLayer(polyline);

var listener = marker.on('click', function eventHandler (e) {
    console.log(plain.Util.formatEvent.call(this, e));
});
marker.on('dragend', function (e) {
    let event = plain.Util.formatEvent.call(this, e);
    let point = event.target.getLatLng();
    path[0] = point;
    polyline.setPath(path);
    console.log(event);
});

setTimeout(() => {
    console.log("remove listener");
    marker.off(listener);            
}, 4000);