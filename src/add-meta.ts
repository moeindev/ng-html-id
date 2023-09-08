import {FileUtil} from "./utils/file.util";
import CLIInfinityProgress from "cli-infinity-progress";

export function addHtmlIds(progress: CLIInfinityProgress) {
    setTimeout(() => {
        console.info('\n');
        console.info('\n');
        console.info('Here is the list of components:');
        console.table(FileUtil.findComponentFiles('src'));
    }, 2000)
    progress.remove();
}