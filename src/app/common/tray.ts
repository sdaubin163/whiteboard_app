import {app, Menu, MenuItemConstructorOptions, nativeImage, Tray} from "electron";
import PathUtils from "../../utils/PathUtils";
import {MainWindow} from "../window/MainWindow";
import path from "path";


function initMenuItem_ShowWindow(win: MainWindow) : MenuItemConstructorOptions{
    const showWindow : MenuItemConstructorOptions = {
        label: '显示主窗口（⌥ Esc）', 
        type: 'normal',
        click : () => {
            // 显示主窗口
            win.show()
        }
    };
    return showWindow;
}

function initMenuItem_Quit() : MenuItemConstructorOptions{
    const quitWindow : MenuItemConstructorOptions = {
        label: '退出（⌘ Q）', 
        type: 'normal',
        click : () => {
            app.quit();
        }
    };
    return quitWindow;
}

// ms: 微秒，如2000代表2秒
function startTrayTimer(trayTimer: string | number | NodeJS.Timeout | null, 
    callback: () => void, ms: number | undefined) {
    // 清除现有定时器
    if (trayTimer) {
        clearTimeout(trayTimer);
    }
    // 设置定时器
    trayTimer = setTimeout(()=>{
        // 清除定时器
        if (trayTimer) {
            clearTimeout(trayTimer);
            trayTimer = null;
        }

        callback();
        
    }, ms); 
}


function createTray(win: MainWindow) : Tray{
    const icon = nativeImage.createFromPath(PathUtils.getAbsolutePath('app/assets/tray.png'))

    let tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        initMenuItem_ShowWindow(win),
        initMenuItem_Quit(),
        { label: '', type: 'separator' },
        { label: '设置(开发中)', type: 'normal' },
    ])
    // 此处设置contextMenu后，Electron会自动控制contextMenu的显示
    // 为了更好的通过click控制，此处不设置
    tray.setContextMenu(contextMenu)
    tray.setToolTip('smartboard')

    return tray;
}


export function  init_tray(win: MainWindow){
    let trayTimer: string | number | NodeJS.Timeout | null = null;


    let tray = createTray(win);

    


    const handleTrayClick = () => {
        console.log('销毁前置。。');
        // tray.popUpContextMenu(contextMenu);

        // 某些场景，光标已经离开tray，但是点击鼠标的时候，有可能还会对tray产生影响（例如触发tray的动作）
        // 以下方法可能会解决这个问题，跟踪看看
        startTrayTimer(trayTimer,
            ()=>{
            // console.log('销毁开始。。');
            // tray.removeListener('click', handleTrayClick);
            // console.log('销毁完成。。');
            // tray.addListener('click', handleTrayClick);

            console.log('销毁开始。。');
            tray.closeContextMenu();
            console.log('销毁完成。。');

        }, 3000);
    };

   // 监听托盘图标的点击事件
   if (tray) {
        tray.removeListener('click', handleTrayClick);
    }
//    tray.on('click', handleTrayClick);
   tray.addListener('click', handleTrayClick);
}