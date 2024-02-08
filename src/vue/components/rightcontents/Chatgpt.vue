<!-- 控制显示chatgpt页面 -->

<!-- <script setup lang="ts">
    console.log('开始加载chatgpt页面');
    
</script>
<template>
    <div class="w-full h-full  bg-white opacity-100">
        <webview src="https://chat.openai.com/" class="h-full w-full" preload="../app/preload/preload_api.js" ></webview>
    </div>
</template>

<style scoped>

</style> -->

<template>
    <div class="w-full h-full bg-white opacity-100">
      <webview id="chatgptWebview"
        src="https://chat.openai.com/" 
        class="h-full w-full"
        preload="../app/preload/preload_chatgpt.js"
        @did-start-loading="startLoading"
        @did-stop-loading="stopLoading">
      </webview>
      <div v-if="isLoading" class="loading-overlay">
        加载中，请稍候...
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const isLoading = ref(false);

  function startLoading() {
    isLoading.value = true;
  }
  
  function stopLoading() {
    isLoading.value = false;
  }


console.log('11111111111');

  </script>
  
  <style scoped>
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
  }
  </style>
  