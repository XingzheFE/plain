import Layer from './layer';
import Size from './size';

interface Icon extends Layer {
    setImageUrl(url: string): void;
    setAnchor(size: Size): void;
    setSize(size: Size): void;
    getImageUrl(): string;
    getAnchor(): Size;
    getSize(): Size;
}

export default Icon;