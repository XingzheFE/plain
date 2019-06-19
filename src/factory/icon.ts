import Layer from './layer';
import Size from './size';

interface Icon extends Layer {
    readonly _id: string;            // Unique layer id
    _original: any;      // Original map layer object
    imageUrl: string;
    size: Size;
    anchor: Size;
    setImageUrl(url: string): void;
    setAnchor(size: Size): void;
    setSize(size: Size): void;
    getImageUrl(): string;
    getAnchor(): Size;
    getSize(): Size;
}

export default Icon;
