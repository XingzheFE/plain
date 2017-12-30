const path = require('path')
module.exports = {
    'AMap test': function (browser) {
        browser
            .url('file://' + path.resolve(__dirname, './../../../example/index.html'))
            .waitForElementVisible('.amap-maps', 4000)
            .assert.elementPresent(".amap-icon")
            .end();
    }
};