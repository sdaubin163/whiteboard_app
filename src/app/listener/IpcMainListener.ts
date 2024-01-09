import { ipcMain } from "electron";
import fs from 'fs'
import fs_promises from 'fs/promises';
import ConfigManager from '../config/ConfigManager'
import path from "path";

export function setupHandlers() {

    // Tldraw 配置文件

    const configManager = new ConfigManager();
    const tldrawConfigFile : string = path.join(configManager.configDir, 'tldraw.json');


    ipcMain.on('autoSaveContentsToFile', (event, arg) => {

        fs.writeFile(tldrawConfigFile, arg, (err) => {
          if (err) {
            // 处理错误
            return;
          }
          // // 可选地向渲染进程发送响应
          // event.reply('file-saved', { status: 'success' });
        });
      });
      
    ipcMain.handle('getContentsFromFile', async (event) => {
        if (!fs.existsSync(tldrawConfigFile)) {
            fs.writeFileSync(tldrawConfigFile, '');
        }

        try {
            const result: string = await fs_promises.readFile(tldrawConfigFile, 'utf8');
            return result;
        } catch (err) {
            console.error('读取文件出错:', err);
            throw err; // 在主进程中抛出的错误会被传递到调用 `invoke` 的渲染进程
        }
    });
}