declare namespace BMap {
    export class Overlay {
        initialize(map: Map): HTMLElement;
        isVisible(): boolean;
        draw(): void;
        show(): void;
        hide(): void;
    }

    export class Map {
        constructor(container: string | HTMLDivElement);
        getZoom(): number;
        setZoom(zoom: number): void;
        zoomIn(): void;
        zoomOut(): void;
        setCenter(center: Point| string): void;
        getCenter(): Point;
        panTo(center: Point, opts?: PanOptions): void;
        addOverlay(l: Overlay): void;
        removeOverlay(l: Overlay): void;
        centerAndZoom(center: Point, zoom: number): void;
        enableScrollWheelZoom(): void;
        clearOverlays(): void;
        setViewport(points: Point[], viewportOptions?: ViewportOptions): void;
        addEventListener(event: string, handler: Function): void;
        removeEventListener(event: string, handler: Function): void;
        setMapType(type: string): void;
        getPanes(): any;
    }

    export class Marker extends Overlay {
        constructor(point: Point, opts?: MarkerOptions);
        getPosition(): Point;
        setPosition(point: Point): void;
        setIcon(icon: Icon): void;
        getIcon(): Icon;
        getOffset(): Size;
        setOffset(offset: Size): void;
        getLabel(): Label;
        setLabel(label: Label): void;
        addEventListener(event: string, handler: Function): void;
        removeEventListener(event: string, handler: Function): void;
        disableDragging(): void;
        enableDragging(): void;
    }

    export class Polyline extends Overlay {
        constructor(points: Point[], opts?: PolylineOptions);
        getPath?(): Point[];
        setPath?(points: Point[]): void;
        addEventListener(event: string, handler: Function): void;
        removeEventListener(event: string, handler: Function): void;
        setStrokeColor(color: string): void;
        setStrokeWeight(weight: number): void;
        setStrokeOpacity(opacity: number): void;
    }

    export class Point {
        constructor(lng: number, lat: number);
        lat: number;
        lng: number;
    }

    export class Size {
        constructor(width: number, height: number);
    }

    export class Icon {
        constructor(url: string, size: Size, opts: IconOptions);
        setImageSize(size: Size): void;
    }
    export class MapType {
        constructor(name: string, layers: TileLayer| Array<TileLayer>, options: MapTypeOptions);
        getName(): string;
        getTileLayer(): TileLayer;
        getMinZoom(): number;
        getMaxZoom(): number;
        getProjection(): Projection;
        getTextColor(): string;
        getTips(): string;
    }

    export class Label {
        constructor(content: string, opts?: LabelOptions);
        setStyle(style: object): void;
        setContent(content: string): void;
        getContent(): string;
        setPosition(position: Point): void;
        getPosition(): Point;
        setOffset(offset: Size): void;
        getOffset(): Size;
        setTitle(title: string): void;
        getTitle(): string;
        setZIndex(index: number): void;
    }

    export class LocalSearch {
        constructor(location: Map | Point | string, opt?: LocalSearchOptions);
        search(keyword: string | string[], opt?: Object): void;
        searchInBounds(keyword: String | Array<String>, bounds?: Bounds, option?: Object): void;getResults(): LocalResult| Array<LocalResult>;
        clearResults(): void;
        setSearchCompleteCallback(cb: Function): void;
    }

    export class LocalResult {
        keyword: string;
        center: LocalResultPoi;
        radius: number;
        bounds: Bounds;
        city: string;
        moreResultsUrl: string;
        province: String;
        suggestions: string[];
        getPoi(i?: number): LocalResultPoi;
        getCurrentNumPois(): number;
        getNumPois(): number;
        getNumPages(): number;
        getPageIndex(): number;
        getCityList(): Object[];
    }

    export interface LocalResultPoi {
        title?: string;
        point?: Point;
        url?: string;
        address?: string;
        city?: string;
        phoneNumber?: string;
        postcode?: string;
        type?: PoiType;
        isAccurate?: boolean;
        province?: string;
        tags?: string[];
        detailUrl?: string;
    }

    export interface PoiType {

    }

    export interface Bounds {

    }

    export interface LocalSearchOptions {

    }

    export class TileLayer {}

    export class Projection {}

    export interface MapOptions {
        minZoom?: number;
        maxZoom?: number;
        mapType?: MapType;
    }

    export interface PanOptions {
        noAnimation?: boolean;
    }

    export interface Viewport {
        center?: Point;
        zoom?: number;
    }

    export interface ViewportOptions {
        enableAnimation?: boolean;
        margins?: number[];
        zoomFactor?: number;
    }

    export interface MarkerOptions {
        offset?: Size;
        icon?: Icon;
        enableMassClear?: boolean;
        enableDragging?: boolean;
        enableClicking?: boolean;
        raiseOnDrag?: boolean;
        draggingCursor?: string;
        rotation?: number;
        shadow?: Icon;
        title?: string;
    }

    export interface IconOptions {
        anchor?: Size;
        imageOffset?: Size;
        infoWindowAnchor?: Size;
        printImageUrl?: string;
    }

    export interface LabelOptions {
        offset?: Size;
        position?: Point;
        enableMassClear?: boolean;
    }

    export interface MapTypeOptions {
        minZoom?: number;
        maxZoom?: number;
        errorImageUrl?: string;
        textColor?: number;
        tips?: string;
    }

    export interface PolylineOptions {
        strokeColor?: string;
        strokeWeight?: number;
        strokeOpacity?: number;
        strokeStyle?: string;
        enableMassClear?: boolean;
        enableEditing?: boolean;
        enableClicking?: boolean;
    }

    export interface Event {
        type: string;
        target?: any;
    }
}
