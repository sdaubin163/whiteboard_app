// 关于view的js代码，现在看是必须放在该js文件中，不能拆分出去
// 如果拆分出去的话，会出问题，具体什么原因，还没有调查清楚



import { contextBridge, ipcRenderer } from 'electron'
const api = {

  // tldraw 的自动保存
  autoSaveContentsToFile: (content) => ipcRenderer.send('autoSaveContentsToFile', content),
  getContentsFromFile: async () => await ipcRenderer.invoke('getContentsFromFile'),
};
// 使用 contextBridge.exposeInMainWorld 来暴露 api 对象给渲染器进程
contextBridge.exposeInMainWorld('smartboardAPI', api);

//---------------------------------------------------------
//   上面的代码是暴露的API接口
//---------------------------------------------------------



//---------------------------------------------------------
//   快捷键
//   有些html页面包含自定义的快捷键，此处注册可以将其屏蔽掉，例如Tldraw的Esc
//---------------------------------------------------------
function add_shortcut(){
  console.log("加载快捷键-本地快捷键......Start");
  // 在渲染器进程的脚本中，可能是一个 .html 文件内的 <script> 标签
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {

          // console.log('触发了Esc')
          // 触发当按下 Esc 键时您想要执行的动作
          // 例如，发送一个事件到主进程要求最小化窗口
          // window.electronApi.minimizeWindow();

          ipcRenderer.send('minimizeWindow')
      }
  });
  console.log("加载快捷键-本地快捷键......End");

}

add_shortcut()



//---------------------------------------------------------
//   下面的代码是ChatGPT相关代码
//---------------------------------------------------------
// 定义一个函数来替换元素中的 "ChatGPT" 文本
function replaceChatGPTInElement(element) {

  // Node.TEXT_NODE（3） 元素或者属性中实际的文本。
  if (element.nodeType === 3 && element.textContent.includes('ChatGPT')) { // 文本节点
    element.textContent = element.textContent.replace(/ChatGPT/g, '');
  } else if (element.nodeType === 1) { // 元素节点
    // 递归处理子节点
    element.childNodes.forEach(replaceChatGPTInElement);
  }
}

// 通过class等属性判断是否为目标Div
function isTargetDiv(node) {
  // class 列表
  let classNameArray = [
    'group',
    'flex',
    'cursor-pointer',
    'items-center',
    'gap-1',
    'rounded-xl',
    'py-2',
    'px-3',
    'text-lg',
    'font-medium',
    'hover:bg-gray-50',
    'radix-state-open:bg-gray-50',
    'dark:hover:bg-black/10',
    'dark:radix-state-open:bg-black/20']


  // 判断id规则是否满足
  if (!node.id.startsWith('radix-')) return false;
  if (!(node.getAttribute('type') === 'button')) return false;
  for (let i = 0; i < classNameArray.length; i++) {
    if (!node.classList.contains(classNameArray[i])) {
      return false;
    }
  }

  return true;
}

// 创建一个新的 MutationObserver 实例来监听 DOM 变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      // 检查每个新增的节点，如果是元素节点，则处理其文本内容
      // 一个元素节点，例如 <p> 和 <div>。

      // console.log(node.innerHTML)

      if (node.nodeType === 1) {

        // 假设 node 是您已有的某个 DOM 节点
        let buttonsWithDataTestid = node.querySelectorAll('button[data-testid="send-button"]');

        // 遍历找到的元素
        buttonsWithDataTestid.forEach(button => {
          // 检查按钮是否已经添加了监听器
          if (!button.hasAttribute('data-click-listener-added')) {
            button.addEventListener('click', () => {
              let txtelement = node.querySelector('textarea[id="prompt-textarea"]');
              console.log('输入的内容：');
              console.log( txtelement.textContent)
            });

            // 标记按钮，表明已经添加了监听器
            button.setAttribute('data-click-listener-added', 'true');
          }
        });




        let elementsWithRadixId = node.querySelectorAll('[id^="radix-"]');

        // 以下代码是在首次加载时起作用，根据调试找到的
        if ((elementsWithRadixId.length === 0) && (node.textContent.includes('ChatGPT'))) {
          elementsWithRadixId = node.parentNode.querySelectorAll('[id^="radix-"]');
        }

        // 遍历找到的元素
        elementsWithRadixId.forEach(element => {
          // 在这里可以对每个找到的元素进行进一步的操作
          if (element.nodeType === 1 && isTargetDiv(element)) { // 元素节点
            element.textContent = element.textContent.replace(/ChatGPT/g, '');
          }
        });
      }

    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // https://chat.openai.com/auth/login

  let currentUrl = window.location.href;
  console.log('当前页面 URL:', window.location.href);
  if (currentUrl.includes('chat.openai.com')) {
    // console.log('gpt 页面')
    // console.log(document.body.innerHTML)

    // 开始监听 <main class="relative h-full w-full flex-1 overflow-auto transition-width"></main> 及其子元素的变化
    // 配置 observer 监听的内容：子节点的增加
    // 使用 querySelector 方法从 document.body 中查找 <main> 标签
    const mainElement = document.body.querySelector('main');
    // 检查是否成功找到 <main> 元素
    if (!mainElement) {
      console.log('页面中没有 <main> 元素');
      return
    }

    // 持续监测main的变化
    observer.observe(mainElement, { childList: true, subtree: true });
  }
});

