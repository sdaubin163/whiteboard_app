<!-- tldraw 在vue 中的展示页面 -->

<script setup lang="ts">
    // const { ipcRenderer } = require('electron');

    // // 接收来自子页面的消息
    // window.addEventListener('message', (event) => {
    // // 确保安全性和正确的来源
    // // if (event.origin === '信任的来源') {
    //     ipcRenderer.send('getContentsFromFile', event.data);
    // // }
    // });

    // // 接收来自主进程的消息并传递给子页面
    // ipcRenderer.on('getContentsFromFile', (event, data) => {
    //     document.getElementById('your-iframe-id').contentWindow.postMessage(data, '*');
    // });

</script>
<template>
    <div id="tldraw" class="w-full h-full">
        <!-- <iframe src="../react/index.html" class="h-full w-full" ></iframe> -->
        <!-- nodeintegration nodeintegrationinsubframes allowpopups disablewebsecurity -->
        <!-- <webview src="../react/index.html" class="h-full w-full" preload="../app/preload/preload.js" ></webview> -->
        <!-- 因为引入的页面中使用了Electron的ipc，因而此处使用Electron独有的webview标签，可以解决ipc的问题
        webview是Electron独有的标签，需要在主window中开启webview标签 -->
        <webview src="../react/index.html" class="h-full w-full" preload="../app/preload/preload.js" ></webview>

    </div>
</template>

<style scoped>

</style>