# creator
```javascript
let p = new P(<plainOption>).use(<Factory>);;
let map = p.Map(<MapOption>);
let marker = p.Marker(<MarkerOption>);
```

# Plain
1. P.Map(container: String | HTMLElement, options: MapOption)
2. P.Marker(MarkerOption)
3. P.Polyline(PolylineOption)

4. P.Icon(IconOption)
5. P.Popup(PopupOption)
6. P.Point(pointOption)

# map
1. map.setZoom();
2. map.getZoom();
3. map.getMaxZoom(); [optional]
3. map.getMinZoom(); [optional]
3. map.open(popup | label); // open layer
4. map.close();
5. map.removeLayer(<layers>);
6. map.setCenter([lat, lng]);
7. map.fitView(<points>)
8. map.addLayer([layer,])
9. map.clearLayers()

# layer
1. layer.getMap()                   return <Map>
2. layer.getOriginal()              return <OriginalLayer>

# marker (extends layer)
1. marker.eventList <Array> // ?
1. marker.setLatLng([lat, lng])
2. marker.getLatLng()
3. marker.setIcon(<Icon>)
4. marker.on(<eventName>, <callbackFunction>)

# path (extends Layer)
1. path.setPath(<points>)
2. path.getPath()
3. path.getBounds()

# polyline (extends Path)
1. polyline.eventList <Array> ? 是否需要


# popup (extends Layer)
1. popup.setContent(<PopupContent>)
2. popup.getContent()               return String|HTMLElement


# info
1. P.MAP_TYPE

## use Factory
```javascript
Plain.use(Factory)
```
