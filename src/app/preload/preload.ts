// 当有多个 preload js文件时，采用以下方法实现

// require('./preload-part1.js');
// require('./preload-part2.js');
// console.log("preload...");
// const shortcut = require('./preload_shortcut.js')

// shortcut()


const { contextBridge, ipcRenderer } = require('electron');

console.log("加载快捷键-本地快捷键......Start");
    // 在渲染器进程的脚本中，可能是一个 .html 文件内的 <script> 标签
    // document.addEventListener('keydown', (e) => {
    //     if (e.key === 'Escape') {
    //     // 触发当按下 Esc 键时您想要执行的动作
    //     // 例如，发送一个事件到主进程要求最小化窗口
    //     window.electronApi.minimizeWindow();
    //     }
    // });
    console.log("加载快捷键-本地快捷键......End");

contextBridge.exposeInMainWorld('electronApi', {
  minimizeWindow: () => ipcRenderer.send('minimize-window')
});
