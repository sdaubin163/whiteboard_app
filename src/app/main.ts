// ipcMain 监听preload 和 主窗口之间的通信
import {app, ipcMain} from 'electron'
import { init_dock } from './common/dock'
import {LoadingWindow} from "./window/LoadingWindow";
import {MainWindow} from "./window/MainWindow";
import {init_tray} from "./common/tray";
import {shortcut_register} from "./common/shortcut";
import PathUtils from "../utils/PathUtils";
import {LOADING_RESOURCE_TYPE} from "./enum/CommonEnum";
import { setupHandlers } from './listener/IpcMainListener';
import { log } from 'console';
import ConfigManager from './config/ConfigManager'

// 主窗口
let mainWindow: MainWindow ;
// 加载loading页面窗口
let loadingWindow:LoadingWindow ;

function setProxy(){
  // 设置代理   export SMARTBOARD_PROXY="http://192.168.100.223:7890"
  // const smartboardProxy = 'http://127.0.0.1:6152';

  // 获取环境变量，如果不存在则默认为空字符串
  // const smartboardProxy = process.env.SMARTBOARD_PROXY || 'http://127.0.0.1:6152';
  // console.log(`代理地址：${smartboardProxy}`);

  // 配置文件：
  // /Users/sunbin/.config/smartboard/config.yaml
  const config = new ConfigManager();
  const smartboardProxy:string = config.getConfigValue('smartboard.proxy');
  console.log(`代理地址：${smartboardProxy}`);

  app.commandLine.appendSwitch('proxy-server', smartboardProxy);
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
  // mainWindow = new MainWindow(PathUtils.getAbsolutePath('react/index.html'), LOADING_RESOURCE_TYPE.file);
  // mainWindow = new MainWindow("https://chat.openai.com/", LOADING_RESOURCE_TYPE.url);
  // mainWindow = new MainWindow("https://www.baidu.com/", LOADING_RESOURCE_TYPE.url);
  mainWindow = new MainWindow(PathUtils.getAbsolutePath('vue/index.html'), LOADING_RESOURCE_TYPE.file);

  // 下边的是一组，同时注释，同时启用
  // mainWindow = new MainWindow(PathUtils.getAbsolutePath('app/html/index2.html'), LOADING_RESOURCE_TYPE.file);
  // mainWindow.initView();



  if (mainWindow) {
    // 初始化Tray
    init_tray(mainWindow);
    // 注册快捷键
    shortcut_register(mainWindow);

     // 注册监听处理函数
    setupHandlers(mainWindow);
  }
  loadingWindow = new LoadingWindow("app/html/loading.html", mainWindow);

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


// ipcMain.on('testCommunication', (event, msg)=>{
//
//   console.log('消息已经发送到main.ts', msg);
//
//   mainWindow.getView().webContents.send('message-to-view', msg)
//   console.log('消息已经发送完成');
//
// })

