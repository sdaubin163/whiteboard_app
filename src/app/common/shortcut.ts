import {WindowController} from "./window";
import {BrowserWindow, globalShortcut} from "electron";
const electronLocalshortcut = require('electron-localshortcut');

const DEFINE_WITEBOARD_SHOW :string = 'Alt+Escape';
const DEFINE_WITHBOARD_HIDE :string = 'Escape';

export function shortcut_register(win: BrowserWindow){
// 注册快捷键
    let windowCtler : WindowController = new WindowController(win)
    // 注册全局快捷键
    globalShortcut.register(DEFINE_WITEBOARD_SHOW, ()=>windowCtler.show());
    // 本地快捷键，只有在当前窗口处于激活状态时才有效
    electronLocalshortcut.register(win, DEFINE_WITHBOARD_HIDE, ()=>windowCtler.minimize());
}

export function shortcut_unregister(win: BrowserWindow){
    globalShortcut.unregisterAll();
    if (win != null) {
        // electronLocalshortcut.unregisterAll(win);
        electronLocalshortcut.unregister(win,DEFINE_WITHBOARD_HIDE)
    }
    console.log("取消注册快捷键执行成功")
}