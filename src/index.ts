#!/usr/bin/env node
import {COMMANDER_CONST} from "./general.const";
import {ConfigUtil} from "./utils/config.util";
import figlet from 'figlet';
import {Command} from "commander";

console.log(figlet.textSync(COMMANDER_CONST.name));
const program = new Command();
const command = program
    .version(COMMANDER_CONST.version)
    .description(COMMANDER_CONST.description)
    .option(COMMANDER_CONST.commands[0].command, COMMANDER_CONST.commands[0].description)
    .parse(process.argv);

let configurationPath = command.getOptionValue(COMMANDER_CONST.commands[0].command);
if (!configurationPath) {
    console.info(COMMANDER_CONST.commands[0].error);
    configurationPath = './default-configuration.json';
}

if (ConfigUtil.isConfigurationFileExists(configurationPath)) {
    console.info('Configuration found, proceeding...');
} else {
    console.info('Configuration not found! exiting');
    process.exit();
}

console.log(ConfigUtil.getConfiguration(configurationPath));