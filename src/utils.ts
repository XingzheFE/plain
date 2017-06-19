import variable from './var';
export function log(v: any): void {
    if (variable.DEBUG) {
        console.log(v);
    }
}