import { app, nativeImage } from 'electron';
import path from 'path';

export function init_dock(): void {
    // 在 macOS 上动态设置 Dock 图标
    if (process.platform === 'darwin') {
        const iconPath = path.join(__dirname, '../assets/icon.png');
        const icon = nativeImage.createFromPath(iconPath);

        if (!icon.isEmpty()) {
            app.dock.setIcon(icon);
            app.dock.bounce();
        }
    }
}


