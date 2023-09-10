import * as fs from 'fs';
import config from '../default-config.json';
import {Configuration} from "../model/configuration.model";

export class ConfigUtil {
    public static isConfigurationFileExists(path: string): boolean {
        return fs.existsSync(path);
    }

    public static getConfiguration(path?: string): Configuration {
        if (!path) {
            return config;
        }
        try {
            const configFile = fs.readFileSync(path, 'utf-8');
            return JSON.parse(configFile);
        } catch (err) {
            console.error(err);
            process.exit();
        }

    }
}