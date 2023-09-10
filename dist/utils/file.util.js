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
exports.FileUtil = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class FileUtil {
    static findComponentFiles(directory) {
        const files = fs.readdirSync(directory);
        const componentFiles = [];
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const fileStat = fs.statSync(filePath);
            if (fileStat.isDirectory()) {
                const subdirectoryFiles = this.findComponentFiles(filePath); // Recursively call the function for subdirectories
                componentFiles.push(...subdirectoryFiles);
            }
            else if (file.endsWith('.component.ts')) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const selectorRegex = /@Component\(\s*{\s*selector:\s*'(.*)'/;
                const match = fileContent.match(selectorRegex);
                if (match && match[1]) {
                    const selector = match[1];
                    const htmlFileName = file.replace('.component.ts', '.component.html');
                    const htmlFilePath = path.join(directory, htmlFileName);
                    if (fs.existsSync(htmlFilePath)) {
                        const componentName = file.replace('.component.ts', '');
                        componentFiles.push({
                            selector: selector,
                            htmlFile: htmlFilePath,
                            componentName: componentName,
                        });
                    }
                }
            }
        });
        return componentFiles;
    }
}
exports.FileUtil = FileUtil;
