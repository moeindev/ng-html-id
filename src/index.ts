import * as commander from 'commander';
import {COMMANDER_CONST} from "./general.const";
import {ConfigUtil} from "./utils/config.util";

const command = commander.createCommand(COMMANDER_CONST.name)
    .version(COMMANDER_CONST.version)
    .description(COMMANDER_CONST.description)
    .option(COMMANDER_CONST.commands[0].command, COMMANDER_CONST.commands[0].description)
    .parse(process.argv);

let configurationPath = command.getOptionValue(COMMANDER_CONST.commands[0].command);
if (!configurationPath) {
    command.error(COMMANDER_CONST.commands[0].error);
    console.info(COMMANDER_CONST.commands[0].error);
    configurationPath = './default-configuration.json';
}

if (ConfigUtil.isConfigurationFileExists(configurationPath)) {
    console.info('Configuration found, proceeding...');
} else {
    console.error('Configuration not found! exiting');
    process.exit();
}

console.log(ConfigUtil.getConfiguration(configurationPath));