export default {
    DEBUG: true,
    name: 'plain',
    coordType: 'DEFAULT',
    setCoordType(type: string): void {
        this.coordType = type;
    }
}