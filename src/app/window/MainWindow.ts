import {app, BrowserWindow, Menu} from "electron";
import PathUtils from "../../utils/PathUtils";
import {shortcut_unregister} from "../common/shortcut";
import {AbsWindow} from "./AbsWindow";
import {LOADING_RESOURCE_TYPE} from "../enum/CommonEnum";

export class MainWindow extends AbsWindow{

    constructor( loadURL:string, url_type ?: LOADING_RESOURCE_TYPE) {
        super();
        this._url = loadURL;
        if (url_type) {
            this._url_type = url_type;
        }
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
            show: false,  // 控制显示很重要，为了客户体验，最开始不显示，因为显示的话，有可能出现白板
            width: 1024,
            height: 768,
            center: true, // 是否出现在屏幕居中的位置
            title: '白板-记事板', // 默认窗口标题
            icon: PathUtils.getAbsolutePath('src/app/assets/icon.png'),
            webPreferences: {
                // // 跨域
                // webSecurity: false,
                nodeIntegration: false,
                // preload: PathUtils.getAbsolutePath('src/app/preload/preload.ts'),
            },

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
        console.log(this._url)
        console.log(this._url_type)

        if (this._url_type === LOADING_RESOURCE_TYPE.url){
            this._window?.loadURL(this._url);
        } else {
            this._window?.loadFile(this._url);
        }
    }

    public quit(){
        if (!this._window) return;
        shortcut_unregister(this);
    }

}