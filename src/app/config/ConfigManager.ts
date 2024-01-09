import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

class ConfigManager {
    // 配置文件（config.json）
    private _configFilePath: string;
    // 配置路径
    private _configDir: string;
  
    constructor() {
      const homeDir = os.homedir();

      this._configDir = path.join(homeDir, '.config', 'smartboard')

      if (!fs.existsSync(this._configDir)) {
        fs.mkdirSync(this._configDir);
      }
  
      this._configFilePath = path.join(this._configDir, 'config.json');
    }


    get configFilePath(): string {
        return this._configFilePath;
    }

    get configDir(): string {
        return this._configDir;
    }
}

export default ConfigManager;