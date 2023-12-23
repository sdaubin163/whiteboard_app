// ipcMain 监听preload 和 主窗口之间的通信

import { BrowserWindow } from "electron";
import { init_dock } from './common/dock'

const { log } = require('console');

import {app, Tray, Menu, nativeImage, globalShortcut, ipcMain} from 'electron'


import {init_tray} from "./common/tray";
import {shortcut_register, shortcut_unregister} from "./common/shortcut";
import PathUtils from "../utils/PathUtils";



// 主窗口
let mainWindow: BrowserWindow ;

// 加载loading页面窗口
let loadingWindow:BrowserWindow ;


function showWindow(loading:BrowserWindow, main: BrowserWindow, url: string) {
  // 用于创建圆角窗口的 CSS

  loading.once("show", ()=>{
    console.log("showMainWindow start2......")

    setTimeout(() => {
      main.loadURL(url);  // 模拟启动准备时间
      console.log("showMainWindow start3......")

    }, 5000);
    main.once("ready-to-show", () => {
      console.log("showMainWindow start4......")

      loading.hide();
      loading.close();
      main.show();
    });
    console.log("showMainWindow start5......")

  });
  loading.loadFile(PathUtils.getAbsolutePath('src/app/html/views/loading.html'));

  // loading.show();
  loading.on('ready-to-show', () => {
    loading.show();
    loading.webContents.insertCSS(`
      body {
        border-radius: 150px;
        overflow: hidden;
      }
    `);
  });
};

function initMainWindow () : BrowserWindow {
  let win : BrowserWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: PathUtils.getAbsolutePath('src/app/assets/icon.png'),
    webPreferences: {
      // // 跨域
      // webSecurity: false,
      nodeIntegration: true,
      // preload: PathUtils.getAbsolutePath('src/app/preload/preload.ts'),
    },
    show: false,
    // 设置背景颜色为黑色
    backgroundColor: '#000000'

  });

  // 右键菜单打开开发者工具
  win.webContents.on('context-menu', (e, params) => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Inspect element',
        click: () => {
          win.webContents.inspectElement(params.x, params.y);
        }
      },
      {
        label: 'Open DevTools',
        click: () => {
          win.webContents.openDevTools();
        }
      }
    ]);
    contextMenu.popup();
  });

  return win;


// 并加载 chat.openai.com 网站
  // mainWindow.loadURL('https://chat.openai.com/')
  // let html_path:string ='';
  // html_path = `file://${path.join(__dirname, '../vue/index.html')}`;
  // console.log('html_path->', html_path);
  // mainWindow.loadURL(html_path);


  // // 加载一个带有“加载中”提示的初始页面或HTML内容
  // // mainWindow.loadFile(path.join(__dirname, './html/views/loading.html'));
  // console.log(path.join(__dirname, './html/views/loading.html'))
  // // 监听加载完成事件
  // mainWindow.webContents.once('did-finish-load', () => {
  //   // 网页加载完毕，加载实际的网页
  //   mainWindow.loadURL('http://localhost:5420/develop');
  // });

}
function initLoadingWindow(): BrowserWindow{
  // return  new BrowserWindow({
  //   show: false,
  //   frame: false, // 无边框（窗口、工具栏等），只包含网页内容
  //   width: 300,
  //   height: 300,
  //   resizable: false,
  //   transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
  // });

  // const win = new BrowserWindow({
  //   show: false,
  //   frame: false, // 无边框（窗口、工具栏等），只包含网页内容
  //   width: 300,
  //   height: 300,
  //   resizable: false,
  //   transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
  //   webPreferences: {
  //     backgroundThrottling: false // 确保即使在后台也能继续执行动画
  //   }
  // });
  //
  // // 设置窗口为圆形
  // win.setShape([
  //   { x: 0, y: 0, width: 300, height: 300 }
  // ]);

  return new BrowserWindow({
    maximizable: false,
    minimizable: false,
    resizable: false,
    fullscreenable: false,
    frame:false, // 无边框（窗口、工具栏等），只包含网页内容
    transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
    hasShadow:false,
    show: false,
    width: 140,
    height: 140,
  });
}
app.on('ready', ()=>{
  console.log("ready  dock 是否可见000：" + app.dock.isVisible())

  // 在开发中发现
  // 虽然 on ready 和 whenReady 差别不大，但是如果将init_dock()放到whenReady
  // 在dock上会先显示Electron的默认图标，然后再显示自定义图标，显示效果不好
  // 初始设置Dock
  init_dock();
})
console.log("dock 是否可见000：" + app.dock.isVisible())
app.whenReady().then(() => {

  // 初始窗口
  loadingWindow = initLoadingWindow();
  mainWindow = initMainWindow();

  //
  // 设置代理
  // const proxy = 'http://127.0.0.1:6152';
  // app.commandLine.appendSwitch('proxy-server', proxy);
  showWindow(loadingWindow, mainWindow, 'http://localhost:5420/develop');

  // 初始化Tray
  init_tray(mainWindow);

  // 注册快捷键
  shortcut_register(mainWindow);

})

// 当应用关闭时取消全局快捷键注册
app.on('will-quit', () => {
  shortcut_unregister(mainWindow);
});