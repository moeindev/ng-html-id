import * as fs from 'fs';
import * as path from 'path';
import {ComponentModel} from "../model/component.model";

export class FileUtil {
    public static findComponentFiles(directory: string): ComponentModel[] {
        const files = fs.readdirSync(directory);
        const componentFiles: ComponentModel[] = [];

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const fileStat = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                const subdirectoryFiles = this.findComponentFiles(filePath); // Recursively call the function for subdirectories
                componentFiles.push(...subdirectoryFiles);
            } else if (file.endsWith('.component.ts')) {
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
