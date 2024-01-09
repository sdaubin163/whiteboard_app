import {Menu, nativeImage, Tray} from "electron";
import PathUtils from "../../utils/PathUtils";
import {MainWindow} from "../window/MainWindow";
import path from "path";

export function  init_tray(win: MainWindow){
    const icon = nativeImage.createFromPath(PathUtils.getAbsolutePath('app/assets/tray.png'))
    // const icon = nativeImage.createFromPath(path.join(__dirname, '../assets/tray.png'))

    let tray = new Tray(icon)

    // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    // tray.setContextMenu(contextMenu)
    tray.setToolTip('smartboard')
    // tray.setTitle('This is my title')

    // 监听托盘图标的点击事件
    tray.on('click', (event) => {
        // tray.popUpContextMenu(contextMenu);
        win.show();
    });
}