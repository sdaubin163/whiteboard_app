import { BrowserWindow } from "electron";
import PathUtils from "../../utils/PathUtils";
import {AbsWindow} from "./AbsWindow";
import {MainWindow} from "./MainWindow";

export class LoadingWindow extends AbsWindow{

    private _mainWindow :MainWindow ;

    constructor(loadingFile:string, mainWindow : MainWindow) {
        super();
        this._url = loadingFile;
        this._mainWindow = mainWindow;
    }


    create(): BrowserWindow {
        const tmpWindow : BrowserWindow = new BrowserWindow({
            show: false, /* 创建窗口时，不显示，这点很重要 */
            maximizable: false,
            minimizable: false,
            resizable: false,
            fullscreenable: false,
            frame:false, // 无边框（窗口、工具栏等），只包含网页内容
            transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
            hasShadow:false,
            width: 280,
            height: 160,
        });

        return tmpWindow;
    }

    addListeners(): void {
        if (this._window) {
            // 添加关闭后的处理
            this._window.addListener('closed', ()=>{
                console.log("窗口已经关闭。");

                this.dispose();
            })
        }
    }

    // 窗口展示
    public show() {

        // 用于创建圆角窗口的 CSS
        console.log("loading show")
        if (!this._window) return;
        // 加载
        this._window.loadFile(PathUtils.getAbsolutePath(this._url));

        console.log("loading show22")

        this._window.once("show", ()=>{

            setTimeout(() => {
                this._mainWindow.loadURL();
            }, 2000);

            this._mainWindow.ready2Show(() => {
                // 先显示主窗口，再关闭加载窗口
                this._mainWindow.show();
                if (this._window != null){
                    this._window.hide();
                    this._window.close();
                }
            });
        });

        console.log("loading show 44")

        // loading.show();
        this._window.on('ready-to-show', () => {
            console.log("loading show 00")

            if (this._window != null) {
                console.log("loading show 33")
                this._window.show();
            }
        });
    };

    minimize(): void {
    }

}
