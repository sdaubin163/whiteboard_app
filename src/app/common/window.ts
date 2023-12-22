import {app,BrowserWindow,IpcMainEvent} from "electron";

export class WindowController {
    // 当前操作窗口
    private _win:BrowserWindow;
    constructor(win: BrowserWindow) {
        this._win = win;
    }

    public minimize():void{
        if (this._win != null) {
            // 只有调用了此方法才管用
            this._win.hide()
            // 在 macOS 上从 Dock 中移除图标
            if (process.platform === 'darwin') {
                app.dock.hide();
                // 这个方法是Mac专用
                app.hide();
            }
        }
    }

    public show():void{
        if (this._win) {
            // if (win.isMinimized()) win.restore();
            this._win.show();
            app.show();
            app.focus();
        }
    }


}

