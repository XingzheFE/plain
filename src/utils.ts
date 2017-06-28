import variable from './var';
import LatLng from './factory/latlng';

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
            } else if (latlng[0] > maxLng) {
                maxLng = latlng[1];
            }
        });
        return [[minLat, minLng], [maxLat, maxLng]];
    },
    
    // Object property assign
    // TODO: ...obj[]
    objectAssign<T> (target: T, source: T): T {
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
    }
}