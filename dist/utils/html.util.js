"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlUtil = void 0;
const fs = __importStar(require("fs"));
const cheerio_1 = require("cheerio");
class HtmlUtil {
    static addIdsToElements(component, configuration) {
        if (component && component.selector && component.htmlFile && component.componentName) {
            const htmlFileContent = fs.readFileSync(component.htmlFile, 'utf-8');
            const loadedHtml = (0, cheerio_1.load)(htmlFileContent);
            // Find elements without an ID or [id] attribute
            loadedHtml('*:not([id]):not([data-id])').each((index, element) => {
                var _a, _b, _c;
                const elementType = (_b = (_a = loadedHtml(element)) === null || _a === void 0 ? void 0 : _a.prop('tagName')) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                let elementTypeSuffix;
                if (elementType) {
                    elementTypeSuffix = (_c = configuration.elementSuffixes) === null || _c === void 0 ? void 0 : _c[elementType];
                }
                let elementId;
                if (elementTypeSuffix) {
                    elementId = `${configuration === null || configuration === void 0 ? void 0 : configuration.projectName}-${component.selector}-${elementTypeSuffix}`;
                }
                else {
                    elementId = `${configuration === null || configuration === void 0 ? void 0 : configuration.projectName}-${component.selector}-${elementType}`;
                }
                // Check if an element with the generated ID already exists
                let count = 1;
                while (loadedHtml(`#${elementId}`).length > 0) {
                    elementId = `${elementId}-${count}`;
                    count++;
                }
                // Add the ID to the element
                loadedHtml(element).attr('id', elementId);
            });
            // Save the modified HTML file
            const modifiedHtmlFileContent = loadedHtml('body').html();
            fs.writeFileSync(component.htmlFile, modifiedHtmlFileContent !== null && modifiedHtmlFileContent !== void 0 ? modifiedHtmlFileContent : '');
        }
    }
}
exports.HtmlUtil = HtmlUtil;
