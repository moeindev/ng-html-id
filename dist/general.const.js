"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMANDER_CONST = void 0;
exports.COMMANDER_CONST = {
    name: 'Angular HTML id generator',
    description: 'An helpful HTML id generator for angular projects :) enjoy! by @moeindeveloper',
    version: '1.0.0',
    commands: [
        {
            command: '-config',
            description: '-config <path> Define the project name for the prefix, default value is => ng-html-id',
            error: 'No config passed here! using default configuration'
        }
    ]
};
