var path = require('path')
module.exports = {
    "src_folders": [
        "test/e2e"
    ],
    "output_folder": "reports",
    "custom_commands_path": "",
    "custom_assertions_path": "",
    "page_objects_path": "",
    "globals_path": "",
    "selenium": {
        "start_process": true,
        "server_path": require('selenium-server').path,
        "host" : "127.0.0.1",
        "log_path": "",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": require('chromedriver').path,
        }
    },
    "test_settings": {
        "default": {
            "launch_url": "http://www.baidu.com",//'file://' + path.resolve(__dirname, './example'), //"http://localhost:3339",
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "silent": true,
            "screenshots": {
                "enabled": false,
                "path": ""
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "marionette": true
            }
        },
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome"
            }
        },
        "edge": {
            "desiredCapabilities": {
                "browserName": "MicrosoftEdge"
            }
        }
    }
}