import {BrowserWindow, Menu, nativeImage, Tray} from "electron";
import path from "path";
import PathUtils from "../../utils/PathUtils";

export function  init_tray(win: BrowserWindow){
    const icon = nativeImage.createFromPath(PathUtils.getAbsolutePath('src/app/assets/tray.png'))
    let tray = new Tray(icon)

    // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    // tray.setContextMenu(contextMenu)
    tray.setToolTip('This is my application')
    // tray.setTitle('This is my title')

    // 监听托盘图标的点击事件
    tray.on('click', (event) => {
        // tray.popUpContextMenu(contextMenu);
        win.show();
    });
}