# smartboard_app
Mac白板，记录一些常用但是记不住的命令等。通过快捷键快速唤醒，Esc快速隐藏等。




## Project Setup
1、安装electron依赖
```
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
npm install electron --save-dev
```


```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## 打包Mac应用

```sh
npm run pack-mac
```


## Thanks to
### 1、[electron-localshortcut](https://github.com/parro-it/electron-localshortcut/)
A module to register/unregister a keyboard shortcut locally to a BrowserWindow instance, without using a Menu.
### 2、loading style css
[loading 样式参考](https://codepen.io/kenchen/pen/vYwvbZ)
### 3、icon
+ [icon 搜索](https://www.flaticon.com/free-icon/blackboard_3875469?related_id=3875469&origin=search)
+ [png2svg 转换](https://www.freeconvert.com/png-to-svg/download)
+ [svg 调整尺寸大小](https://products.aspose.app/pdf/zh/resize/svg)
### 4、Ts工具类
#### 4.1 lodash
一个广泛使用的 JavaScript 实用程序库，提供了许多有助于处理数组、数字、对象、字符串等的函数。
安装：`npm install lodash @types/lodash`
#### 4.1 date-fns
现代 JavaScript 日期实用工具库，提供了最全面、简单和一致的工具集。
安装：`npm install date-fns`