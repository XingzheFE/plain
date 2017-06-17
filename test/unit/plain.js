let path = require('path');
let should = require('should');
let _ = path.resolve(__dirname, '../../dist');
let Plain = require(_ + '/plain.js');
console.log(Plain);

describe('src/plain', () => {
    let p = new Plain({});
    before( done => {
        done();
    });
    it('has methods', (done) => {
        p.should.be.an.Object();
        p.should.have.property('createMap').which.is.a.Function();
        p.should.have.property('createMarker').which.is.a.Function();
        p.should.have.property('createPolyline').which.is.a.Function();
        done();
    });
});
