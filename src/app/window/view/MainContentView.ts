import { BrowserView, BrowserViewConstructorOptions, BrowserWindow, Menu, MenuItem } from 'electron';
import PathUtils from "../../../utils/PathUtils";
import * as Electron from 'electron'
import { MainContentViewPosition } from './MainContentViewPosition'


export class MainContentView {
    // 毫秒
    private _VIEW_ALIVE_TIME : number = 60*60*1000;

    private _instance : BrowserView |null = null;
    // 该view的名字
    // 可以通过view的名字做一些特殊处理，如对chatgpt的处理等
    private _name: string | null = null;

    // 该view 是否仍有效
    // 定时关闭view
    private _isDisplay : boolean = false;
    
    // 构造方法
    constructor(viewName: string) {
        this._isDisplay = true;
        
        this._name = viewName;

        this._instance = new BrowserView({
            webPreferences : {
                // 通过设置以下两个配置，实现页面中可以使用const { ipcRenderer } = require('electron');
                // 否则会报错，但是更推荐使用preload.js 去实现。但是preload.js 实现可能复杂了。。。
                // nodeIntegration: true,
                // contextIsolation: false,
                // 必须指定编译后的js文件才可以
                preload: PathUtils.getAbsolutePath('app/preload/preload_mainview.js'),
            }
        });

        this._instance.setAutoResize({
            width: true,
            height: true,
            horizontal: true,
            vertical: true
        });

        // 设置背景(chatgpt 网站为light模式时，如果不设置此项，会显示BrowserWindow的页面样式)
        this._instance.setBackgroundColor("#ffffff")

        // 开发工具
        // 添加上下文菜单
        // 只有view加载了html之后，右键才会显示开发工具
        this._instance.webContents.on('context-menu', (event, params) => {
            // const menu = new Menu();
            // // 添加一个菜单项来打开开发者工具
            // menu.append(new MenuItem({
            //     label: '开发工具',
            //     click: () => {
            //         this._instance.webContents.openDevTools();
            //     }
            // }));
            // // 显示上下文菜单
            // menu.popup();

            const contextMenu = Menu.buildFromTemplate([
                {
                    label: '打开开发工具',
                    click: () => {
                        if (!this._instance) return;
                        this._instance.webContents.openDevTools();
                    }
                },
                {
                    label: '刷新页面', // 添加刷新页面的菜单项
                    click: () => {
                        if (!this._instance) return;
                        this._instance.webContents.reload(); // 调用 reload 方法刷新页面-> 主页面
                    }
                }
            ]);
            contextMenu.popup();
        });


        this.invalidateAfterTimeout(this._VIEW_ALIVE_TIME)
    }

    get instance(): BrowserView |null {
        return this._instance
    }

    get name(): string | null{
        return this._name
    }

    // 设置view的位置并显示
    public setViewPosition(viewPosition: MainContentViewPosition){

        let verticalMargin = 4;
        // 设置窗口的右边距
        let rightMargin = 4;
        // 根据设置的宽度判断是否需要设置边距
        let width: number = viewPosition.width > rightMargin? viewPosition.width - rightMargin : viewPosition.width;
        let height : number = viewPosition.height > verticalMargin ? viewPosition.height-verticalMargin : viewPosition.height;

        console.log(`X: ${viewPosition.x}, Y: ${viewPosition.y}, Width: ${width}, Height: ${height}`);
        console.log(`viewPosition.width: ${viewPosition.width}, viewPosition.height: ${viewPosition.height}`);

        this._instance?.setBounds({
            x: viewPosition.x,
            y: viewPosition.y,
            width: width,
            height: height
        });
    }


    // 
    public loadView(url:string, url_type : number) {
        console.log('view1 开始加载', url);
        console.log('view1 开始加载' , url_type);

        // 0- 本地文件 1-网络资源
        if (url_type === 0) {
            // this._instance.webContents.loadFile(PathUtils.getAbsolutePath('app/html/content.html'));
            this._instance?.webContents.loadFile(PathUtils.getAbsolutePath(url));

        }else {
            this._instance?.webContents.loadURL(url);
        }

        // this._window?.setTopBrowserView(this.view1)
        console.log('view1 完成加载', url);
    }

    
    public hideView() {
        this._instance?.setBounds({ x: 0, y: 0, width: 0, height: 0 });
    }

    // 设置视图在指定时间后失效
    public invalidateAfterTimeout(timeout: number): void {
        setTimeout(() => {

            // 是否仍在显示中
            // 如果显示中，继续设置生存时间
            if (this._isDisplay) {
                console.log(`${this._name} 仍在使用中。。。`);
                console.log(`能取到这个值吗？  ---> ${timeout}`);
                
                this.invalidateAfterTimeout(timeout)
                return
            }
            // 如果需要，这里可以添加其他清理逻辑
            console.log(`${this._name} view is now invalidated`);

            this._isDisplay = false;
            this._instance = null;
            this._name = null;

            // 示例：可以在这里发出一个事件或调用一个回调函数，通知外部视图已经失效
        }, timeout);
    }


    // 设置不可见（隐藏）
    public setInvisible(window : BrowserWindow) :void {
        // 
        window.removeBrowserView(this._instance!)
        // 设为无效
        this._isDisplay = false;
    }

    // public showView() {
    //     this._instance.setBounds({ x: 100, y: 100, width: 500, height: 500 });
    // }

}