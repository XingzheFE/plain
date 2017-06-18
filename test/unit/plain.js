let path = require('path');
let should = require('should');
let _ = path.resolve(__dirname, '../../dist');
let Plain = require(_ + '/plain.js');

describe('src/plain', () => {
    let p = new Plain({}).use({
        Map () {
            return {};
        },
        Marker () {
            let marker = {};
            marker.prototype = {
                getLatLng() {},
                setLatLng() {}
            }
            return marker;
        },
        Polyline () {
            return {};
        }
    });
    let marker = p.Marker({});
    let polyline = p.Polyline({});

    before( done => {
        done();
    });
    it('has methods', (done) => {
        p.should.be.an.Object();
        p.should.have.property('Map').which.is.a.Function();
        p.should.have.property('Marker').which.is.a.Function();
        p.should.have.property('Polyline').which.is.a.Function();
        done();
    });
    it('layer has _id', done => {
        marker.should.have.property('_id').which.is.a.String();
        polyline.should.have.property('_id').which.is.a.String();
        done();
    });
});
