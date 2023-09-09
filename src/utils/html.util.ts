import * as fs from 'fs';
import {ComponentModel} from "../model/component.model";
import {Configuration} from "../model/configuration.model";
import { load } from "cheerio";

export class HtmlUtil {
    public static addIdsToElements(component: ComponentModel, configuration: Configuration) {
        if (component && component.selector && component.htmlFile && component.componentName) {
            const htmlFileContent = fs.readFileSync(component.htmlFile, 'utf-8');
            const loadedHtml = load(htmlFileContent);

            // Find elements without an ID or [id] attribute
            loadedHtml('*:not([id]):not([data-id])').each((index, element) => {
                const elementType = loadedHtml(element)?.prop('tagName')?.toLowerCase();
                let elementTypeSuffix;
                if (elementType) {
                    elementTypeSuffix = configuration.elementSuffixes?.[elementType];
                }
                let elementId;
                if (elementTypeSuffix) {
                    elementId = `${configuration?.projectName}-${component.selector}-${elementTypeSuffix}`;
                } else {
                    elementId = `${configuration?.projectName}-${component.selector}-${elementType}`;
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

            fs.writeFileSync(component.htmlFile, modifiedHtmlFileContent ?? '');
        }
    }
}