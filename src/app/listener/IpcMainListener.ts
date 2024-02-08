import { ipcMain } from "electron";
import fs from 'fs'
import fs_promises from 'fs/promises';
import ConfigManager from '../config/ConfigManager'
import path from "path";
import { MainWindow } from "../window/MainWindow";

export function setupHandlers(mainwindow: MainWindow) {

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
    

    ipcMain.on('setViewPosition', (event, x, y, width, height) => {
      // console.log("x:" ,x);
      // console.log("y:" ,y);
      // console.log("width:" ,width);
      // console.log("height:" ,height);


      mainwindow.setViewPosition(x, y, width, height);
      // console.log('set view ok');
      
    });

    // 设置view显示页面
    ipcMain.on('showMainContentView', (event, name, url_type , url)=>{
      mainwindow.showMainContentView(name ,url_type,url)
    })

    ipcMain.on('minimizeWindow', ()=>{
      console.log('最小化start')
      mainwindow.minimize()
      console.log('最小化end')

    })
}