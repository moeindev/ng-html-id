import * as fs from 'fs';
import config from '../default-config.json';

export class ConfigUtil {
    public static isConfigurationFileExists(path: string): boolean {
        return fs.existsSync(path);
    }

    public static getConfiguration(path?: string): any {
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

        return undefined;
    }
}