// 当有多个 preload js文件时，采用以下方法实现

// require('./preload-part1.js');
// require('./preload-part2.js');
// console.log("preload...");
// const shortcut = require('./preload_shortcut.js')

// shortcut()


    const { contextBridge, ipcRenderer } = require('electron');

    // 定义需要暴露的接口
    // 当画板内容发生变化后，自动保存到本地文件中
    contextBridge.exposeInMainWorld('whiteboardAPI', {
        autoSaveContentsToFile: (content:string) => ipcRenderer.send('autoSaveContentsToFile', content),
        // 获取本地文件中保存的画板内容
        // 需要同步等待返回
        getContentsFromFile: async ()=> {
            return await ipcRenderer.invoke('getContentsFromFile');
        }
    });

    // // 获取本地文件中保存的画板内容
    // // 需要同步等待返回
    // contextBridge.exposeInMainWorld('whiteboardAPI', {
    //     getContentsFromFile: async ()=> {
    //         return await ipcRenderer.send('getContentsFromFile');
    //     }
    // });
