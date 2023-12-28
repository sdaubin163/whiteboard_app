import {BrowserWindow} from "electron";
import {LOADING_RESOURCE_TYPE} from "../enum/CommonEnum";

export abstract class AbsWindow {
    // 默认窗口
    protected _window: BrowserWindow | null = null;
    protected _url : string = '';
    protected _url_type : LOADING_RESOURCE_TYPE  = LOADING_RESOURCE_TYPE.file;

    // 默认构造方法
    constructor(){
        // 创建窗口
        this._window = this.create();
        // 给窗口添加监听事件
        this.addListeners();
    }

    // 创建窗口
    abstract create() : BrowserWindow;

    // 添加监听
    abstract addListeners() :void;

    public abstract show():void;
    public abstract minimize():void;

    // 获取窗口对象
    get window(): BrowserWindow | null {
        return this._window;
    }

    // 窗口关闭时，销毁窗口
    dispose():void{
        if (this._window) {
            // 主动释放
            this._window = null;
        }
    }

}