import {FileUtil} from "./utils/file.util";
import CLIInfinityProgress from "cli-infinity-progress";
import {ConfigUtil} from "./utils/config.util";
import {Component} from "./model/component.model";
import {HtmlUtil} from "./utils/html.util";


export function addHtmlIds(configurationPath: string, progress: CLIInfinityProgress) {
    const components = FileUtil.findComponentFiles('src');
    showComponentsInfo(components);
    progress.remove();
    const config = ConfigUtil.getConfiguration(configurationPath);
    if (components && components.length > 0) {
        components.forEach(component => {
            HtmlUtil.addIdsToElements(component, config);
        });
    } else {
        console.info('\n')
        console.info('No components found, closing');
        process.exit();
    }
}


export function showComponentsInfo(components: Component[]) {
    setTimeout(() => {
        console.info('\n');
        console.info('\n');
        console.info('Here is the list of components:');
        console.table(components);
    }, 2000);
}