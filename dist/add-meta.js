"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHtmlIds = void 0;
const file_util_1 = require("./utils/file.util");
function addHtmlIds(progress) {
    setTimeout(() => {
        console.table(file_util_1.FileUtil.findComponentFiles('src'));
    }, 2000);
    progress.remove();
}
exports.addHtmlIds = addHtmlIds;
