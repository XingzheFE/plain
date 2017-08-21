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
        url: 'https://cdn.bi-ci.com/static/commonimg/favicon/favicon32.png',
        size: [32, 32],
        anchor: [16, 32],
        labelOrigin: [16, 10]
    });
    var markerOpt = {
        icon: icon,
        draggable: true,
    };

    var marker = plain.Marker([39.920, 116.404], markerOpt);
    var marker2 = plain.Marker([39.910, 116.404], markerOpt).setLabel('12123', {
        zIndex: 1,
        color: '#444',
        fontSize: '20px'
    });
    window.marker2 = marker2;
    marker2.setLabel('label 2', {
        color: '#fff',
        fontSize: '20px',
    });
    console.log(marker2);
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
    var btn = document.createElement('button');
    btn.innerHTML = "popup button";
    plain.Popup({
        closeBtn: true,
        zIndex: 9999,
        offset: [-40, 0]
    }).setContent(btn).setLatLng([39.910, 116.404]).mount(map).hide();
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
        window.popup = plain.Popup({
            closeBtn: true,
            zIndex: 9999,
            offset: [-40, 0]
        }).setContent("<p>popup</p><input type='text' value='123'>").setLatLng([39.910, 116.404]).mount(map);
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
