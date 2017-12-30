const path = require('path')
module.exports = {
    'AMap test': function (browser) {
        browser
            .url(path.resolve(__dirname, './example/index.html'))
            .waitForElementVisible('.amap-maps', 4000)
            .expect.element('.amap-icon').to.be.present.before(1000)
            .end();
    }
};