interface Coordtransform {
    gcj02tobd09: Function;
    bd09togcj02: Function,
    wgs84togcj02: Function,
    gcj02towgs84: Function
}
declare var coordtransform2: Coordtransform;

declare module 'coordtransform2' {
    export = coordtransform2;
}