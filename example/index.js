var plain = new Plain();
var p = {
    lat: 39.908012,
    lng: 116.399348,
}
plain._v.setCoordType('GCJ02');
var path = [
    [39.910, 116.404],
    [39.910, 116.5],
    [39.910, 117],
    [39.910, 118]
];
let bmap = setMap('bmap', 'BMAP');
let gmap = setMap('gmap', 'GMAP');
let amap = setMap('amap', 'AMAP');

document.getElementById('btn-fitview').addEventListener('click', e => {
    bmap.fitView(path); 
    amap.fitView(path); 
    gmap.fitView(path); 
});

function setMap (container, type) {
    plain.use(type);
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
        container: document.getElementById(container),
        center: [p.lat, p.lng],
        zoom: 15
    });
    var polyline = plain.Polyline(path, {
        color: "#f00",
        weight: 2,
        opacity: 0.8
    });
    var marker = plain.Marker([p.lat, p.lng], markerOpt);
    console.log(polyline.getPath());
    console.log(marker.getLatLng());
    map.addLayer(polyline);
    map.addLayer(marker);
    return map;
}

