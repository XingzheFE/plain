<p align="center">
    <a href="https://github.com/XingzheFE/plain">
        <img width="140" src="https://user-images.githubusercontent.com/10026019/68386171-705bad80-0196-11ea-9e64-e98ea602ce56.png" alt="">
        <br/>
    </a>
    </br>
    Create your map application with same code, get rid of different Map library API ✨.
</p>
<p align="center">
    <a href="https://www.npmjs.com/package/plain-js">
        <img src="https://img.shields.io/npm/v/plain-js.svg">
    </a>
    <a href="https://travis-ci.org/XingzheFE/plain">
        <img src="https://travis-ci.org/XingzheFE/plain.svg?branch=master" alt="">
    </a>
    <a href="https://www.npmjs.com/package/plain-js">
        <img src="https://img.shields.io/npm/dt/plain-js.svg" alt="">
    </a>
    <a href="/Dafrok/vue-baidu-map/blob/master">
        <img src="https://img.shields.io/github/license/XingzheFE/plain.svg">
    </a>
</p>

<hr/>

[English](./README.md) | [简体中文](./README.zh.md)

![example](./images/example.png)


# Features
1. [Layers](#layers)
    1. [Marker](#add-marker)
    2. [Polyline](#add-polyline)
    3. [Popup](#custom-layer-&-popup)
2. [Map Controls](#map-controls)
    1. [Zoom](#zoom-control)
    2. [FitView](#fitview)
    3. [PanTo](#panTo)
3. [Evented](#evented)
4. [Utils](#utils)
    1. [GetBound](#getBound)
    2. [Locate](#locate)
    3. [Coordinate Translate](#coordinate-translate)

# How to use plain?

## Install
Install `plain-js` via `npm`, you also could load `plain.min.js` in html file.

`$ npm install plain-js`

## Create Map
It is simple, use following code after install `plain`:
```javascript
// create a plain Object
let plain = new Plain();

// Set the default coordinate system,
// if not, all the map will using the default coordinate system:
// Google and Gaode using GCJ02 in mainland of China, baidu map using BD09.
// we suggest 'GCJ02'.
plain.setCoordType('GCJ02');

// Tell plain which map you want use，
// eg: Google Map 'GMAP'， GaodeMap 'AMAP'， BaiduMap 'BMAP'
plain.use('GMAP');

// Create a Google map object
let map = plain.Map({
    container: "#map",          // or DivElement
    center: [39.908012, 116.399348],
    zoom: 15
});
```
By the way, you can create map in the callback function
```javascript
let plain = new Plain().use('GMAP');
let key = "[your access key]";
plain.loadMap(key, () => {
    let map = window.map = plain.Map({
        container: document.getElementById("map"),
        center: [39.910, 116.404],
        zoom: 15
    });
}, err => {
    // TODO:
};

```

## Layers
### Add Marker
```javascript
let marker = plain.Marker([39.910, 116.404]);
map.addLayer(marker);   // or <Array>Marker
```
Wanna create a special Marker ? Just set second param:
```javascript
// Create icon
let icon = plain.Icon({
    url: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
    size: [25, 40],
    anchor: [12.5, 40]
});

// Marker configure option
let markerOpt = {
    icon: icon,
    draggable: true
};
let marker2 = plain.Marker([39.910, 116.404], markerOpt);
map.addLayer(marker2);
// Try to remove marker from map,
// But we will not destroy this marker
map.removeLayer(marker);
```

### Add Polyline
There is a path Object before create Polyline, array item should be an array like this: `[lat: Number, lng: Number]`
```javascript
let path = [
    [39.910, 116.404],
    [39.71, 116.5],
    [39.909, 117],
    [39.710, 118]
];
let polyline = plain.Polyline(path, {
    color: "#f00",
    weight: 2,
    opacity: 0.8
});
map.addLayer(polyline);
```

### Custom Layer & Popup
```javascript
let layer = plain.Layer()
    .setContent('text or HTMLElement')
    .setLatLng([31, 116])
    .mount(map) // add to map
    .show()     // set style.display to 'none'
    .hide()     // set style.display to 'block'
    .unmount(); // remove from map
let popup = plain.Popup({closeBtn: false})  // goto popupOptions
    .setContent(document.createElement('button'))
    .setLatLng([31, 116])
    .mount(map)
    .show()
    .hide()
    .unmount();
```
`popupOptions`:
```javascript
{
    closeBtn: false,    // use close btn, default: false
    offset: [-40, 0],   // CSS margin attribute
    zIndex: 999,        // CSS z-index attribute
}
```

## Map Controls

### Zoom control

You can set zoom paramter just as:

```javascript
let map = plain.Map({
    container: "#map",
    center: [39.908012, 116.399348],
    zoom: 15
});
```

Or use methods:

| method | description |
|---|---|
| setZoom(zoom: number) | Set zoom level, it's dependent on Map instance. Most of theme are at 1-15. |
| getZoom(): number | Get zoom level. |
| zoomIn() | Set zoom level++. |
| zoomOut() | Set zoom level--. |

### FitView

| method | description |
|---|---|
| fitView(latlngs: LatLng[], opt?: ViewportOption) | Set map viewport. |

```javascript
interface ViewportOption {
    margins: number[];
}
interface LatLng extends Array<number> {
    [index: number]: number;
}
```

### PanTo

| method | description |
|---|---|
| panTo(latlng: LatLng) | Change the center point of the map to a given point. |

## Evented

So far, we have been able to create a map which shows the basic information, then we are going to addEventListenr.Plain method provides a tool for formatting the incoming event object, the value returned format is as follows

```typescript
class Event {
    e: any;             // original event Object
    p: F.LatLng;        // coordinate [lat: number, lng: number]
    target: F.Layer;    // could be Plain's Marker or Map
    type: string;       // event name
}
```

`p` should be a coordinate which use same coordinate system with `plain.setCoordType('GCJ02');`.

```javascript
let listener = map.on('rightclick', function (e) {
    console.log(plain.Util.formatEvent.call(this, e));
    // fit map viewport
    map.fitView(path);
});
```

Cancel eventListener:

```javascript
map.off(listener);
```

## Utils

### Get bound

| method | description |
|---|---|
| getBound(latlngs: LatLng[]): LatLng[]| Return a rectangle that cover all points. |

### Locate

| method | description |
|---|---|
| locate(success?: Function, error?: Function): void | Map location. |

### Coordinate Translate

| method | description |
|---|---|
| b2g(latlngs: LatLng[]): LatLng[] | BD09 to GCJ02. |
| w2g(latlngs: LatLng[]): LatLng[] | WGS84 to BD09. |
| g2w(latlngs: LatLng[]): LatLng[] | GCJ02 to WGS84. |
| w2b(latlngs: LatLng[]): LatLng[] | WGS84 to BD09. |
| b2w(latlngs: LatLng[]): LatLng[] | BD09 to WGS84. |
| g2b(latlngs: LatLng[]): LatLng[] | GCJ02 to BD09. |

## License

plain is [MIT](./LICENSE) licensed.
