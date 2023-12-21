



module.exports = function add_shortcut(){
    console.log("加载快捷键-本地快捷键......Start");
    // 在渲染器进程的脚本中，可能是一个 .html 文件内的 <script> 标签
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
        // 触发当按下 Esc 键时您想要执行的动作
        // 例如，发送一个事件到主进程要求最小化窗口
        window.electronApi.minimizeWindow();
        }
    });
    console.log("加载快捷键-本地快捷键......End");

}