import {FileUtil} from "./utils/file.util";
import CLIInfinityProgress from "cli-infinity-progress";

export function addHtmlIds(progress: CLIInfinityProgress) {
    setTimeout(() => {
        console.table(FileUtil.findComponentFiles('src'));
    }, 2000)
    progress.remove();
}