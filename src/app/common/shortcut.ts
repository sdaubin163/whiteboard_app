import {globalShortcut} from "electron";
import {MainWindow} from "../window/MainWindow";
const electronLocalshortcut = require('electron-localshortcut');

const DEFINE_WITEBOARD_SHOW :string = 'Alt+Escape';
// 在有些页面中，如果页面已经定义了Escape快捷键，此处定义的快捷键会失效，因此修改为通过全局快捷键控制app的显示和隐藏
// const DEFINE_WITHBOARD_HIDE :string = 'Escape';




export function shortcut_register(win: MainWindow){
// 注册快捷键
    // 注册全局快捷键
    globalShortcut.register(DEFINE_WITEBOARD_SHOW, ()=>win.showOrHide());
    // 本地快捷键，只有在当前窗口处于激活状态时才有效
    // electronLocalshortcut.register(win.window, DEFINE_WITHBOARD_HIDE, ()=>win.minimize());
}

export function shortcut_unregister(win: MainWindow){
    globalShortcut.unregisterAll();
    if (win.window) {
        // electronLocalshortcut.unregister(win.window, DEFINE_WITHBOARD_HIDE)
    }
    console.log("取消注册快捷键执行成功")
}