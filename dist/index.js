#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_const_1 = require("./general.const");
const config_util_1 = require("./utils/config.util");
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const add_meta_1 = require("./add-meta");
const cli_infinity_progress_1 = __importDefault(require("cli-infinity-progress"));
console.log(figlet_1.default.textSync(general_const_1.COMMANDER_CONST.name));
const program = new commander_1.Command();
const command = program
    .version(general_const_1.COMMANDER_CONST.version)
    .description(general_const_1.COMMANDER_CONST.description)
    .option(general_const_1.COMMANDER_CONST.commands[0].command, general_const_1.COMMANDER_CONST.commands[0].description)
    .parse(process.argv);
let configurationPath = command.getOptionValue(general_const_1.COMMANDER_CONST.commands[0].command);
if (config_util_1.ConfigUtil.isConfigurationFileExists(configurationPath)) {
    console.info('Configuration found, proceeding...');
}
else {
    console.info(general_const_1.COMMANDER_CONST.commands[0].error);
}
const progress = new cli_infinity_progress_1.default().setHeader('Finding components');
(0, add_meta_1.addHtmlIds)(progress);
