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
                    label: '检查元素',
                    click: () => {
                        if (!this._window) return;
                        this._window.webContents.inspectElement(params.x, params.y);
                    }
                },
                {
                    label: '打开开发工具',
                    click: () => {
                        if (!this._window) return;
                        this._window.webContents.openDevTools();
                    }
                },
                {
                    label: '刷新页面', // 添加刷新页面的菜单项
                    click: () => {
                        if (!this._window) return;
                        this._window.webContents.reload(); // 调用 reload 方法刷新页面-> 主页面

                        // 先获取view数组，再逐个刷新view
                        // views.forEach(view => {
                        //     view.webContents.reload();
                        // });
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
                // webSecurity: false, //将 webSecurity 设置为 false 允许从本地加载文件
                nodeIntegration: false,
                // contextIsolation: true, // 如果您使用了 nodeIntegration: false，通常应该开启 contextIsolation
                // 必须指定编译后的js文件才可以
                preload: PathUtils.getAbsolutePath('dist/app/preload/preload.js'),

                // nodeIntegrationInSubFrames: true, //放开权限
                webviewTag: true // 启用 <webview> 标签
            },

            // 设置背景颜色为黑色
            // backgroundColor: '#000000',
            trafficLightPosition: {
                x: 10,
                y: 15,
              },
            //   隐藏标准的标题栏，但保留窗口控制按钮（如关闭、最小化、最大化），这些按钮会被嵌入到窗口的顶部。这种样式在 macOS 上效果最好
              titleBarStyle: 'hiddenInset',
                //   它会应用一种特定的模糊风格，这在 macOS 上很常见，用于侧边栏等元素。这有助于窗口更好地融入系统的整体外观。
              vibrancy: 'sidebar',

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