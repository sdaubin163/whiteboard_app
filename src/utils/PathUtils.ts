// 获取项目路径
// 注意 ：
// 因为是通过__dirname获取项目根据路径
// 因此，此代码所在位置的不同，getRootPath() 需要做相应调整

import * as path from 'path';

class PathUtils {
    // 获取项目根目录
    public static getRootPath(): string {
        return path.join(__dirname, '../..');
    }

    // // 获取配置文件目录
    // static getConfigPath(): string {
    //     return path.join(this.getRootPath(), 'config');
    // }
    //
    // // 获取日志文件目录
    // static getLogsPath(): string {
    //     return path.join(this.getRootPath(), 'logs');
    // }

    // // 获取静态资源目录
    // static getAssetsPath(): string {
    //     return path.join(this.getRootPath(), 'assets');
    // }

    // 根据传入的相对路径获取绝对路径
    // relativePath  相对于项目根路径的路径，如src/app/vue等
    public static getAbsolutePath(relativePath: string): string {
        // 如果路径以 "./" 开头，去除这个前缀
        const normalizedPath = relativePath.startsWith('./')
            ? relativePath.substring(2)
            : relativePath;

        return path.join(this.getRootPath(), normalizedPath);
    }
}

export default PathUtils;
