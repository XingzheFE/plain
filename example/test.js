var path = [
    [39.910, 116.404],
    [39.71, 116.5],
    [39.909, 117],
    [39.710, 118]
];
plain._v.setCoordType('GCJ02');
plain.loadMap(key, (e) => {
    console.log('success');

    var map = window.map = plain.Map({
        container: document.getElementById("map"),
        center: [39.910, 116.404],
        zoom: 15
    });

    var icon = plain.Icon({
        url: 'https://cdn.bi-ci.com/vue_static/origin.svg',
        size: [32, 50],
        anchor: [16, 48]
    });
    var markerOpt = {
        icon: icon,
        draggable: true
    };

    var marker = plain.Marker([39.910, 116.404], markerOpt);
    var marker2 = plain.Marker([39.910, 116.39], markerOpt);
    var polyline = plain.Polyline(path, {
        color: "#f00",
        weight: 2,
        opacity: 0.8
    });
    var popup = plain.Popup().setContent("<h1>layer</h1>").setLatLng([39, 115]).mount(map);
    // setTimeout(e => {
    //     console.log(plain.Popup())    
    // }, 0)
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

    // setTimeout(() => {
    //     console.log("remove listener");
    //     marker.off(listener);
    // }, 4000);

    map.fitView(path);
    map.on('rightclick', function (e) {
        console.log(plain.Util.formatEvent.call(this, e));
    });
    document.getElementById("btn-fitview").addEventListener("click", function () {
        map.fitView(path);
    });
    document.getElementById("add-popup").addEventListener("click", function (e) {
        window.popup = plain.Popup({closeBtn: true}).setContent("<p>popup</p>").setLatLng([39.910, 116.404]).mount(map);
        window.layer = plain.Layer({closeBtn: true}).setContent("<p>layer</p>").setLatLng([39.910, 116.404]).mount(map);
    });
    map.on('rightclick', e => {
        e = plain.Util.formatEvent.call(this, e);
        popup.setLatLng(e.p);
    })
});


window.onbeforeunload = function (e) {
    // return '确定离开？';
}
