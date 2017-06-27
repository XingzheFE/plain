declare namespace AMap {
    /******* base Overlayer ********/
    export class Overlayer {
        hide(): void;
        show(): void;
        setMap(map: Map): void;
        getMap(): Map;
        toString(): string;
        on(eventName: string, handler: Function, context: object): EventListener;
        off(eventName: string, handler: Function, context: object): void;
        setExtData(ext: any): void;
        getExtData(): any; 
    }
    
    /****** Pixel ******/
    export class Pixel {
        constructor(x: number, y: number);
        getX(): number;
        getY(): number;
        equals(point: Pixel): boolean;
        toString(): string;
    }
    
    /****** Size *******/
    export class Size {
        constructor(width: number, height: number);
        getWidth(): number;
        getHeight(): number;
        toString(): string;
    }
    
    /****** LngLat ******/
    export class LngLat {
        constructor(lng: number, lat: number);
        offset(w: number, s: number): LngLat;
        distance(lnglat: LngLat | LngLat[]): number;
        getLng(): number;
        getLat(): number;
        equals(lnglat: LngLat): boolean;
        toString(): string;
    }
    
    /******* Bounds ********/
    export class Bounds {
        constructor(southWest: LngLat, northEast: LngLat);
        contains(point: LngLat): boolean;
        getCenter(): LngLat;
        getSouthWest(): LngLat;
        getNorthEast(): LngLat;
        toString(): string;
    }
    
    /****** Map *******/
    export class Map {
        constructor(container: string|HTMLDivElement, opts: MapOptions);
        poiOnAMAP(obj: object): void;
        detailOnAMAP(obj: object): void;
        getZoom(): number:
        getLayers(): any[];         // TODO: Layer[]
        getCenter(): LngLat;
        getContainer(): HTMLDivElement;
        getCity(): any;
        getBounds(): Bounds;
        getlabelzIndex(): number;
        getLimitBounds(): number;
        getLang(): string;
        getSize(): Size;
        getRotation(): number;
        getStatus(): Object;
        getDefaultCursor(): string;
        getScale(dpi: number): number;
        setZoom(zoom: number): void;
        setlabelzIndex(index: number): void;
        setLayers(layers: Layers[]): void;
        add(overlayers: Overlayer[]): void;
        remove(overlayers: Overlayer[]);
        setAllOverlays(type: any): Overlayer[]; // TODO:
        setCenter(position: LngLat): void;
        setZoomAndCenter(zoom: number, center: LngLat): void;
        clearLimitBounds(): void;
        setLang(lang: string): void;
        setRotation(rotation: number): void;
        setStatus(status: object): void;
        setDefaultCursor(cursor: string): void;
        zoomIn(): void;
        zoomOut(): void;
        panTo(position: LngLat): void;
        panBy(x: number, y: number): void;
        setFitView(overlayers: Overlayer[]): void;
        clearMap(): void;
        destroy(): void;
        plugin(name: string|stringp[], callback: Function): void;
        addControl(obj: object): void;
        removeControl(obj: object): void;
        clearInfoWindow(): void;
        pixelToLngLat(pixel: Pixel, level: number): Pixel;
        lnglatToPixel(lnglat: LngLat, level: number): LngLat;
        lngLatToContainer(lnglat: LngLat): Pixel;
        setMapStyle(style: string): void;
        getMapStyle(): string;
        setFeatures(features: array): void;
        getFeatures(): array;
        setDefaultLayer(layer: TIleLayer): void;
    }
    export interface MapOptions {
        view?: View2D;
        zoom?: number;           // []
        zooms?: number[];        // pc[3,18], mobile[3,19]
        center?: LngLat;
        layers?: any[];
        labelzIndex?: number;
        lang?: string;
        cursor?: string;
        crs?: string;
        animateEnable?: boolean;
        isHotspot?: boolean;
        dragEnable?: boolean;
        zoomEnable?: boolean;
        doubleClickZoom?: boolean;
        jogEnable?: boolean;
        scrollWheel?: boolean;
        touchZoom?: boolean;
        showBuildingBlock?: boolean;
        features?: any[];
        mapStyle?: string;
        showBuildingBlock?: boolean; 
    }
    
    /******** View2D ********/
    export class View2D {
        constructor(opt: View2DOptions);
    }
    
    export interface View2DOptions {
        center: LngLat;
        rotation: number;
        zoom: number;
        crs: string;
    }
    
    /******* event *******/
    export class event {
        addDomListener(instance: Element, eventName: string, handler: Function, context: object): EventListener;
        addListenerOnce(instance: Element, eventName: string, handler: Function, context: object): EventListener;
        removeListener(listener: EventListener): void;
        trigger(instance: any, eventName: string, extArgs: any): void;
    }
    
    export interface EventListener {
        // TODO: No description
    }
    
    export interface MapsEvent {
        lnglat: LngLat;
        pixel: Pixel;
        type: string;
        target: object;
    }
    
    /****** TileLayer *******/
    export class TileLayer {
        constructor(tileOpt: TileLayerOptions);
        setOpacity(alpha: number): void;
        show(): void;
        hide(): void;
        getTiles(): any[];
        reload(): void;
        setTileUrl(url: string): void;
        getZooms(): any[];
        setzIndex(index: number): void;
        setMap(map: Map): void;
    }
    
    export interface TileLayerOptions {
        map: Map;
        titleSize: number;
        tileUrl: string;
        errorUrl: string;
        getTileUrl: string | Function(x: number, y: number, z: number);
        zIndex: number;
        opacity: number;
        zooms: number[];
        detectRetina: boolean;
    }
    
    /******* Marker *******/
    export class Marker extends Overlayer {
        constructor(opt: MarkerOptions);
        markerOnAMAP(obj: object): void;
        getOffset(): Pixel;
        setOffset(offset: Pixel): void;
        getAnimation(): string;
        setAnimation(animation: string): void;
        setClickable(clickable: boolean): void;
        getClickable(): boolean;
        getPosition(): LngLat;
        setPosition(lnglat: LngLat): void;
        setAngle(angle: number): void;
        setLabel(label: object): void;
        getLabel(): object;
        getAngle(): number;
        setzIndex(index: number): void;
        getzIndex(): number;
        setIcon(content: string | Icon): void;
        getIcon(): string | Icon;
        setDraggable(draggable: boolean): void;
        getDraggable(): boolean;
        setCursor(cursor: string): string;
        setContent(html: string | Element): void;
        moveAlong(path: LngLat[], speed: number, f: Function, circlable: boolean): void;
        moveTo(lnglat: LngLat, speed: Number, f: Function): void;
        stopMove(): void;
        pauseMove(): void;
        resumeMove(): void;;
        setTitle(title: string): void;
        setTop(isTop: boolean): void;
        getTop(): boolean;
        setShadow(icon: Icon): void;
        getShadow(): Icon;
        setShape(shape: MarkerShape): void;
        getShape(): MarkerShape;
        
    }
    
    export interface MarkerOptions {
        map?: Map;
        position?: LngLat;
        offset?: Pixel;
        icon?: string | Icon;
        content?: string | object;
        topWhenClick?: boolean;
        bubble?: boolean;
        draggable?: boolean;
        raiseOnDrag?: boolean;
        cursor?: string;
        visible?: boolean;
        zIndex?: number;
        angle?: number;
        autoRotation?: boolean;
        animation?: string;
        shadow?: Icon;
        title?: string;
        clickable?: boolean;
        shape?: MarkerShape;
        extData?: any;
        label: {content: string | Element, offset: number[]};
    }
    
    export class MarkerShape {
        constructor(opt: MarkerShapeOptions);
    }
    
    export interface MarkerShapeOptions {
        coords: number[],
        type: string
    }
    
    /******* Icon ********/
    export class Icon {
        constructor(opt: IconOptions);
        getImageSize(): Size;
        setImageSize(size: Size): void;
    }
    
    export interface IconOptions {
        // You'd better set size to new AMap.Size(19, 31)
        // Because AMap.Icon can not set offset
        size: Size;
        imageOffset: Pixel;
        image: string;
        imageOffset: Size;
    }
    
    /******* Polyline ********/
    export class Polyline extends Overlayer {
        constructor(opt: PolylineOptions);
        getPath(): LngLat[];
        setPath(lnglats: LngLat[]): void;
        setOptions(opt: PolylineOptions): void;
        getOptions(): PolylineOptions;
        getLength(): number;                // m
        getBounds(): Bounds;
    }
    export interface PolylineOptions {
        
    }
}