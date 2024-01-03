// ipcMain 监听preload 和 主窗口之间的通信
import {app, ipcMain} from 'electron'
import { init_dock } from './common/dock'
import {LoadingWindow} from "./window/LoadingWindow";
import {MainWindow} from "./window/MainWindow";
import {init_tray} from "./common/tray";
import {shortcut_register} from "./common/shortcut";
import PathUtils from "../utils/PathUtils";
import {LOADING_RESOURCE_TYPE} from "./enum/CommonEnum";

import * as fs from 'fs';
import fs_promises from 'fs/promises';

// 主窗口
let mainWindow: MainWindow ;
// 加载loading页面窗口
let loadingWindow:LoadingWindow ;

function setProxy(){
  // 设置代理
  const proxy = 'http://127.0.0.1:6152';
  app.commandLine.appendSwitch('proxy-server', proxy);
}

app.on('ready', ()=>{
  console.log("ready  dock 是否可见000：" + app.dock.isVisible())

  // 在开发中发现
  // 虽然 on ready 和 whenReady 差别不大，但是如果将init_dock()放到whenReady
  // 在dock上会先显示Electron的默认图标，然后再显示自定义图标，显示效果不好
  // 初始设置Dock
  init_dock();
})
// console.log("dock 是否可见000：" + app.dock.isVisible())
app.whenReady().then(() => {
  // 设置代理
  setProxy();

  // 初始窗口
  // mainWindow = new MainWindow('http://localhost:5420/develop');
  // mainWindow = new MainWindow(PathUtils.getAbsolutePath('dist/react/index.html'), LOADING_RESOURCE_TYPE.file);
  // mainWindow = new MainWindow("https://chat.openai.com/", LOADING_RESOURCE_TYPE.url);
  mainWindow = new MainWindow(PathUtils.getAbsolutePath('dist/vue/index.html'), LOADING_RESOURCE_TYPE.file);

  if (mainWindow) {
    // 初始化Tray
    init_tray(mainWindow);
    // 注册快捷键
    shortcut_register(mainWindow);
  }
  loadingWindow = new LoadingWindow("src/app/html/loading.html", mainWindow);

  try {
    loadingWindow.show()
  }catch (e) {
    console.log(e)
  }

  console.log("前面的步骤中有异步执行的")

})

// 当应用关闭时取消全局快捷键注册
app.on('will-quit', () => {
  // 取消快捷键注册等
  mainWindow.quit()
});


ipcMain.on('autoSaveContentsToFile', (event, arg) => {

  console.log('11111');
  console.log(arg);
  console.log(arg[0]);

  console.log('2222');
  fs.writeFile('/Users/sunbin/temp/tldraw.json', arg, (err) => {
    if (err) {
      // 处理错误
      return;
    }
    // // 可选地向渲染进程发送响应
    // event.reply('file-saved', { status: 'success' });
  });
});

let idx = 0;
ipcMain.handle('getContentsFromFile', async (event) => {
  console.log("getContentsFromFile被调用了:", idx)
  idx++
  try {
    const result: string = await fs_promises.readFile('/Users/sunbin/temp/tldraw.json', 'utf8');
    return result;
  } catch (err) {
    console.error('读取文件出错:', err);
    throw err; // 在主进程中抛出的错误会被传递到调用 `invoke` 的渲染进程
  }
});