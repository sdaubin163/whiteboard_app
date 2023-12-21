// 在编译时，将Electron的相关资源拷贝至dist目录下
const fs = require('fs-extra');
const path = require('path');

// 需要拷贝的文件或目录列表
const filesToCopy = [
    'src/app/assets',
    'src/app/windows'
    // ...其他文件或目录
];
// 目标路径
const destination = 'dist/app';
// 项目根目录
const rootDir = path.resolve(__dirname, '../')

// 拷贝文件或目录
filesToCopy.forEach(fileOrDir => {
    const srcPath = path.resolve(rootDir, fileOrDir);
    const destPath = path.resolve(rootDir, destination, path.basename(fileOrDir));

    fs.copy(srcPath, destPath, err => {
        if (err) {
            console.error(`无法拷贝 ${srcPath} 到 ${destPath}: ${err}`);
        } else {
            console.log(`成功拷贝 ${srcPath} 到 ${destPath}`);
        }
    });
});

