declare module BMap {
    export class Map {
        constructor(container: string | HTMLDivElement);
        getZoom(): number;
        setZoom(zoom: number): void;
        setCenter(center: Point| string): void;
        panTo(center: Point, opts: PanOptions): void;
        addOverlay(l: object): void;
        centerAndZoom(center: Point, zoom: number): void;
        enableScrollWheelZoom(): void;
    }

    export class Marker {
        constructor(point: Point, opts: MarkerOptions);
    }

    export class Polyline {
        getPath?(): Point[];
        setPath?(points: Point[]): void;
    }

    export class Point {
        constructor(lng: number, lat: number);
    }

    export class Size {
        constructor(width: number, height: number);
    }

    export class Icon {
        constructor(url: string, size: Size, opts: IconOptions);

    }
    export class MapType {
        getName(): string;
        getTileLayer(): TileLayer;
        getMinZoom(): number;
        getMaxZoom(): number;
        getProjection(): Projection;
        getTextColor(): string;
        getTips(): string;
    }

    export class TileLayer {}

    export class Projection {}

    export interface Overlay {
        initialize: HTMLElement;
        isVisible(): boolean;
        draw(): void;
        show(): void;
        hide(): void;
    }
    export interface MapOptions {
        minZoom: number;
        maxZoom: number;
        mapType: MapType;
    }

    export interface PanOptions {
        noAnimation: boolean;
    }

    export interface Viewport {
        center: Point;
        zoom: number;
    }

    export interface ViewportOptions {
        enableAnimation: boolean;
        margins: number[];
        zoomFactor: number;
    }

    export interface MarkerOptions {
        offset: Size;
        icon: Icon;
        enableMassClear: boolean;
        enableDragging: boolean;
        enableClicking: boolean;
        raiseOnDrag: boolean;
        draggingCursor: string;
        rotation: number;
        shadow: Icon;
        title: string;
    }

    export interface IconOptions {
        anchor: Size;
        imageOffset: Size;
        infoWindowAnchor: Size;
        printImageUrl: string;
    }
}
