import variable from './var';
import LatLng from './factory/latlng';
import coordtransform from './coordtransform';

export default {
    // Print infomation
    log(v: any): void {
        if (v instanceof Error) {
            console.error(v);
        } else if(variable.DEBUG) {
            console.log(`[${variable.name}] `, v);
        }
    },
    
    // Return a rectangle that cover all points
    getBound(latlngs: LatLng[]): LatLng[] {
        let rectangle;
        let minLat = latlngs[0][0],
            minLng = latlngs[0][1],
            maxLat = minLat,
            maxLng = minLng;
        latlngs.map(latlng => {
            if (latlng[0] < minLat) {
                minLat = latlng[0];
            } else if (latlng[0] > maxLat) {
                maxLat = latlng[0];
            }
            if (latlng[1] < minLng) {
                minLng = latlng[1];
            } else if (latlng[1] > maxLng) {
                maxLng = latlng[1];
            }
        });
        return [[minLat, minLng], [maxLat, maxLng]];
    },
    
    // Object property assign
    // TODO: ...obj[]
    objectAssign (target: {[key: string]: any}, source: {[key: string]: any}): object {
        if ((<any>Object).assign) {
            (<any>Object).assign(target, source);
        } else {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    },
    
    // GCJ02 to BD09
    g2b (latlngs: LatLng[]): LatLng[] {
        if (!(latlngs[0] instanceof Array)) {
            return coordtransform.gcj02tobd09(latlngs[0], latlngs[1]);
        }
        return latlngs.map(latlng => {
            return coordtransform.gcj02tobd09(latlng[0], latlng[1]);
        });
    },
    
    // BD09 to GCJ02
    b2g (latlngs: LatLng[]): LatLng[] {
        if (!(latlngs[0] instanceof Array)) {
            return coordtransform.bd09togcj02(latlngs[0], latlngs[1]);
        }
        return latlngs.map(latlng => {
            return coordtransform.bd09togcj02(latlng[0], latlng[1]);
        });
    },
    
    w2g (latlngs: LatLng[]): LatLng[] {
        if (!(latlngs[0] instanceof Array)) {
            return coordtransform.wgs84togcj02(latlngs[0], latlngs[1]);
        }
        return latlngs.map(latlng => {
            return coordtransform.wgs84togcj02(latlng[0], latlng[1]);
        });
    },
    
    g2w (latlngs: LatLng[]): LatLng[] {
        if (!(latlngs[0] instanceof Array)) {
            return coordtransform.gcj02towgs84(latlngs[0], latlngs[1]);
        }
        return latlngs.map(latlng => {
            return coordtransform.gcj02towgs84(latlng[0], latlng[1]);
        });
    },
    
    w2b (latlngs: LatLng[]): LatLng[] {
        if (!(latlngs[0] instanceof Array)) {
            let coor = coordtransform.wgs84togcj02(latlngs[0], latlngs[1]);
            return coordtransform.gcj02tobd09(coor[0], coor[1]);
        }
        let coords = latlngs.map(latlng => {
            return coordtransform.wgs84togcj02(latlng[0], latlng[1]);
        });
        return coords.map(latlng => {
            return coordtransform.gcj02tobd09(latlng[0], latlng[1]);
        });
    },
    
    b2w (latlngs: LatLng[]): LatLng[] {
        if (!(latlngs[0] instanceof Array)) {
            let coor = coordtransform.bd09togcj02(latlngs[0], latlngs[1]);
            return coordtransform.gcj02towgs84(coor[0], coor[1]);
        }
        let coords = latlngs.map(latlng => {
            return coordtransform.bd09togcj02(latlng[0], latlng[1]);
        });
        return coords.map(latlng => {
            return coordtransform.gcj02towgs84(latlng[0], latlng[1]);
        });
    },
    
    locate(success?: Function, error?: Function): void {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                success && success(position.coords.latitude, position.coords.longitude);
            }, function(e) {
                error && error(e);
            });
        } else {
            error && error(new Error('Geolocation is not supported by your browser'));
        }
    },
}