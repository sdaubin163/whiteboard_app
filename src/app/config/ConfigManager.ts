import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';

class ConfigManager {
    // 配置文件（config.yaml）
    private _configFilePath: string;
    // 配置路径
    private _configDir: string;
  
    constructor() {
      const homeDir = os.homedir();

      this._configDir = path.join(homeDir, '.config', 'smartboard')

      if (!fs.existsSync(this._configDir)) {
        fs.mkdirSync(this._configDir);
      }
  
      this._configFilePath = path.join(this._configDir, 'config.yaml');
    }


    get configFilePath(): string {
        return this._configFilePath;
    }

    get configDir(): string {
        return this._configDir;
    }

  // 获取 YAML 文件中的配置
  getConfigValue(key: string): any {
    try {
      const fileContents = fs.readFileSync(this._configFilePath, 'utf8');
      const data = yaml.load(fileContents) as Record<string, any>;
      return key.split('.').reduce((obj, key) => obj && obj[key], data);
    } catch (e) {
      console.error("Could not read from YAML config file", e);
      return null;
    }
  }
}

export default ConfigManager;