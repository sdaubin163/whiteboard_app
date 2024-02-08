
// 这是主窗口使用的

// 定义快捷键
const shortcut = require('./preload_shortcut.js')
shortcut()

// 引入API
// require('./preload_api.js');
import { contextBridge, ipcRenderer } from 'electron'
const api = {
  showMainContentView: (name, url_type, url) => {
    ipcRenderer.send('showMainContentView', name, url_type, url);
  },
  setViewPosition: (x, y, width, height) => {
    ipcRenderer.send('setViewPosition', x, y, width, height);
  }
};

// 使用 contextBridge.exposeInMainWorld 来暴露 api 对象给渲染器进程
contextBridge.exposeInMainWorld('smartboardAPI', api);