"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showComponentsInfo = exports.addHtmlIds = void 0;
const file_util_1 = require("./utils/file.util");
const config_util_1 = require("./utils/config.util");
const html_util_1 = require("./utils/html.util");
function addHtmlIds(configurationPath, progress) {
    const components = file_util_1.FileUtil.findComponentFiles('src');
    showComponentsInfo(components);
    progress.remove();
    const config = config_util_1.ConfigUtil.getConfiguration(configurationPath);
    if (components && components.length > 0) {
        components.forEach(component => {
            html_util_1.HtmlUtil.addIdsToElements(component, config);
        });
    }
    else {
        console.info('\n');
        console.info('No components found, closing');
        process.exit();
    }
}
exports.addHtmlIds = addHtmlIds;
function showComponentsInfo(components) {
    setTimeout(() => {
        console.info('\n');
        console.info('\n');
        console.info('Here is the list of components:');
        console.table(components);
    }, 2000);
}
exports.showComponentsInfo = showComponentsInfo;
