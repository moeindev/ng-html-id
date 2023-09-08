#!/usr/bin/env node
import {COMMANDER_CONST} from "./general.const";
import {ConfigUtil} from "./utils/config.util";
import figlet from 'figlet';
import {Command} from "commander";
import {addHtmlIds} from "./add-meta";
import CLIInfinityProgress from "cli-infinity-progress";

console.log(figlet.textSync(COMMANDER_CONST.name));
console.info('\n');
console.info('\n');

const program = new Command();
const command = program
    .version(COMMANDER_CONST.version)
    .description(COMMANDER_CONST.description)
    .option(COMMANDER_CONST.commands[0].command, COMMANDER_CONST.commands[0].description)
    .parse(process.argv);

let configurationPath = command.getOptionValue(COMMANDER_CONST.commands[0].command);

console.info('\n');
console.info('\n');
if (ConfigUtil.isConfigurationFileExists(configurationPath)) {
    console.info('Configuration found, proceeding...');
} else {
    console.info(COMMANDER_CONST.commands[0].error);
}


const progress = new CLIInfinityProgress().setHeader('Finding components');


addHtmlIds(progress);