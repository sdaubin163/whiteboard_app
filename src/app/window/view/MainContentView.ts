import { BrowserView, BrowserViewConstructorOptions, BrowserWindow, Menu, MenuItem , shell } from 'electron';
import PathUtils from "../../../utils/PathUtils";
import * as Electron from 'electron'
import { MainContentViewPosition } from './MainContentViewPosition'
import * as electron from 'electron'


export class MainContentView {
    // 毫秒
    // 默认：12小时后关闭
    private _VIEW_ALIVE_TIME : number = 60*60*1000*12;

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
                contextIsolation: true,
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
                    label: '复制',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: '粘贴',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                { type: 'separator' }, // 添加分割线
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

                        // 监听页面加载完成的事件
                        this._instance.webContents.once('did-finish-load', () => {
                            // 页面加载完成后显示弹框
                            electron.dialog.showMessageBox({
                                type: 'info',
                                title: '页面刷新',
                                message: '页面已成功刷新。',
                                buttons: ['确定']
                            });
                        });

                        this._instance.webContents.reload(); // 调用 reload 方法刷新页面-> 主页面
                    }
                },
                { type: 'separator' }, // 添加分割线
                {
                    label: '清除缓存', // 清除缓存
                    click: () => {
                        if (!this._instance) return;
                        this._instance.webContents.session.clearCache().then(() => {
                            console.log('缓存已清理');
                        });

                        this._instance.webContents.session.clearStorageData({
                            // 指定要清理的数据类型
                            storages: ['cookies', 'localstorage', 'indexdb', 'cachestorage'],
                            // 可以指定更多选项...
                        }).then(() => {
                            console.log('存储数据已清理');
                        });

                    //     清理完缓存后，重新加载页面
                        // 监听页面加载完成的事件
                        this._instance.webContents.once('did-finish-load', () => {
                            // 页面加载完成后显示弹框
                            electron.dialog.showMessageBox({
                                type: 'info',
                                title: '清除完成ok',
                                message: '清除完成ok。',
                                buttons: ['确定']
                            });
                        });

                        this._instance.webContents.reload(); // 调用 reload 方法刷新页面-> 主页面

                    }
                }
            ]);

            if (params.linkURL) {
                contextMenu.append(new MenuItem({
                    label: '在默认浏览器中打开链接',
                    click: () => {
                        shell.openExternal(params.linkURL).catch(err => {
                            console.error('Failed to open external link:', err);
                        });
                    }
                }));
            }
            // 如果文本选中，则显示“复制”选项
            // if (params.selectionText) {
            //     contextMenu.insert(0, new MenuItem({ label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' }))
            // }


            contextMenu.popup();
        });

        // 设置指定时间后，view自动失效
        // this.invalidateAfterTimeout(this._VIEW_ALIVE_TIME)
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

        // 如果该页面仍在显示，设置不丢失焦点
        if (height > 0 || width > 0) {
            this._instance?.webContents.focus();
        }
    }


    // 
    // public loadView(url:string, url_type : number) {
    //     console.log('view1 开始加载', url);
    //     console.log('view1 开始加载' , url_type);
    //
    //     // 0- 本地文件 1-网络资源
    //     if (url_type === 0) {
    //         // this._instance.webContents.loadFile(PathUtils.getAbsolutePath('app/html/content.html'));
    //         this._instance?.webContents.loadFile(PathUtils.getAbsolutePath(url));
    //
    //     }else {
    //         this._instance?.webContents.loadURL(url);
    //     }
    //
    //     // this._window?.setTopBrowserView(this.view1)
    //     console.log('view1 完成加载', url);
    // }

    public async loadView(url: string, url_type: number) {
        console.log('view1 开始加载', url);
        console.log('view1 开始加载', url_type);

        try {
            // 0- 本地文件 1- 网络资源
            if (url_type === 0) {
                // 使用绝对路径加载本地文件
                await this._instance?.webContents.loadFile(PathUtils.getAbsolutePath(url));
            } else {
                // 加载网络资源
                await this._instance?.webContents.loadURL(url);
            }
            console.log('view1 完成加载', url);
        } catch (error) {
            // 错误处理逻辑
            console.error('加载页面失败:', error);
            // 这里可以加入一些错误处理的逻辑，比如显示错误信息，加载备用页面等
        }
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

            // 关闭资源
            this._instance?.webContents.close();

            this._isDisplay = false;

            // 隐藏view 
            let hidePosition: MainContentViewPosition = new MainContentViewPosition();
            hidePosition.set(0, 0, 0, 0);
            this.setViewPosition(hidePosition);

            this._instance = null;
            console.log(`${this._name} view is now invalidated 222`);
            this._name = null;



            // 示例：可以在这里发出一个事件或调用一个回调函数，通知外部视图已经失效
        }, timeout);
    }


    // 设置不可见（隐藏）
    public setInvisible(window : BrowserWindow) :void {

        if (!this._instance) {
            // 如果this._instance 为空，则直接返回
            return;
        }
        // 
        window.removeBrowserView(this._instance!)
        // 设为无效
        this._isDisplay = false;
    }

    // public showView() {
    //     this._instance.setBounds({ x: 100, y: 100, width: 500, height: 500 });
    // }

    // 默认浏览器打开页面链接
    private createLinkContextMenu(params: Electron.ContextMenuParams): void {
        if (params.linkURL) {
            const menu = new Menu();
            menu.append(new MenuItem({
                label: '在默认浏览器中打开链接',
                click: () => {
                    shell.openExternal(params.linkURL).catch(err => {
                        console.error('Failed to open external link:', err);
                    });
                }
            }));
    
            menu.popup();
        }
    }

}