import {app, BrowserWindow, Menu} from "electron";
import PathUtils from "../../utils/PathUtils";
import {init_tray} from "../common/tray";
import {shortcut_register, shortcut_unregister} from "../common/shortcut";
import {AbsWindow} from "./AbsWindow";
import * as Electron from "electron";

export class MainWindow extends AbsWindow{

    constructor(loadURL:string) {
        super();
        this._url = loadURL;
    }

    addListeners(): void {
        if (!this._window) return;
        // 右键菜单打开开发者工具
        this._window.webContents.on('context-menu', (e, params) => {
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        if (!this._window) return;
                        this._window.webContents.inspectElement(params.x, params.y);
                    }
                },
                {
                    label: 'Open DevTools',
                    click: () => {
                        if (!this._window) return;
                        this._window.webContents.openDevTools();
                    }
                }
            ]);
            contextMenu.popup();
        });
    }

    create(): BrowserWindow {
        let win : BrowserWindow = new BrowserWindow({
            width: 1024,
            height: 768,
            icon: PathUtils.getAbsolutePath('src/app/assets/icon.png'),
            webPreferences: {
                // // 跨域
                // webSecurity: false,
                nodeIntegration: false,
                // preload: PathUtils.getAbsolutePath('src/app/preload/preload.ts'),
            },
            show: false,
            // 设置背景颜色为黑色
            backgroundColor: '#000000'

        });

        return win;
    }

    public show(): void {
        if (this._window) {
            // if (win.isMinimized()) win.restore();
            this._window.show();
            app.show();
            app.focus();
        }
    }

    public minimize():void{
        if (this._window) {
            // 只有调用了此方法才管用
            this._window.hide()
            // 在 macOS 上从 Dock 中移除图标
            if (process.platform === 'darwin') {
                app.dock.hide();
                // 这个方法是Mac专用
                app.hide();
            }
        }
    }

    ready2Show(listener: Function): BrowserWindow | undefined {
        return this._window?.once('ready-to-show', listener);
    }

    loadURL():void{
        this._window?.loadURL(this._url);
    }

    public quit(){
        if (!this._window) return;
        shortcut_unregister(this);
    }

}