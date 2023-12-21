// ipcMain 监听preload 和 主窗口之间的通信

import { BrowserWindow } from "electron";

const { log } = require('console');
const { app, Tray, Menu, nativeImage, globalShortcut, ipcMain } = require('electron');
const path = require('path');

// const {init_dock} = require('./common/tray')


// 热加载，需要单独安装yarn install electron-reload
// require('electron-reload')(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`)
// });


app.on('ready', () => {
    // 设置代理
    const proxy = 'http://127.0.0.1:6152';
    app.commandLine.appendSwitch('proxy-server', proxy);
  
    // 创建浏览器窗口
    createWindow();
  });

// 当应用关闭时取消全局快捷键注册
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});


let lastOptionPressTime = 0;
const doublePressInterval = 300; // 双击间隔时间，例如 300 毫秒
let win: BrowserWindow;

function createWindow () {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      // // 跨域
      // webSecurity: false,
      nodeIntegration: true,
      preload: path.join(__dirname , 'preload', 'preload'),
    }
    
  });

  // 初始设置Dock
  // init_dock();
  
  
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


  // 当应用准备好后，注册 Esc 键为全局快捷键
  app.whenReady().then(() => {
    // globalShortcut.register('Esc', () => {
    //   win.minimize();
    // });

    // 注册全局快捷键
    // CommandOrControl+1
    globalShortcut.register('Command+Shift+Space', () => {
      if (win) {
        // if (win.isMinimized()) win.restore();

        win.show();

        win.focus();
      }
    });


  });

  ipcMain.on('minimize-window', (event) => {

    console.log(process.platform);

    if (win) {
      // win.minimize();
      win.hide();
      // 在 macOS 上从 Dock 中移除图标
       if (process.platform === 'darwin') {
        app.dock.hide();
        console.log(app.dock.isVisible());
        app.hide();
        
       }
    }
  });

// 并加载 chat.openai.com 网站
  // win.loadURL('https://chat.openai.com/')
  let html_path:string ='';
  // html_path = path.join(__dirname, 'windows/views/index.html');
  // html_path = path.join(__dirname, '../vue/index.html');
  html_path = `file://${path.join(__dirname, '../vue/index.html')}`;
  console.log('html_path->', html_path);
  win.loadURL(html_path);

}

// Tray
let tray
app.whenReady().then(()=>{
  const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/tray.png'))
  tray = new Tray(icon)

  // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  
  // tray.setContextMenu(contextMenu)
  tray.setToolTip('This is my application')
  // tray.setTitle('This is my title')

  // 监听托盘图标的点击事件
  tray.on('click', (event) => {
    // tray.popUpContextMenu(contextMenu);
    win.show();
  });
})

