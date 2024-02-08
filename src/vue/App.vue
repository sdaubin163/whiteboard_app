<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';

import LeftSidebarView from './views/LeftSidebarView.vue';
import RightContentsView from './views/RightContentsView.vue';
import TitleView from './views/TitleView.vue'

  // 左侧面板是否被折叠
  const isLeftPanelFold = ref(false)



</script>

<template>
  <div id="all_div">
    <div id="drag_div" class="z-50"></div>
    <TitleView ></TitleView>
    <LeftSidebarView  :isLeftPanelFold="isLeftPanelFold" @fold_status_change="isLeftPanelFold =  $event"></LeftSidebarView>

    <RightContentsView :isLeftPanelFold="isLeftPanelFold"></RightContentsView>
  </div>
</template>

<style>
.bg-token-text-primary {
  background: white;
}


#all_div {
  display: flex;
  position: relative;
  /* width 和 height 必须设置*/
  width: 100%;
  height: 100%;
}

#drag_div {
  position: absolute;
  left: 0;
  top: 0;
  /* border: 1px solid blue; */
  width: var(--title-width);
  height: var(--title-height);
  user-select: none;
  -webkit-app-region: drag;
}


.hidden {
  display: none;
  /* 或者其他隐藏的样式 */
  width: 2rem;
}


#main_contens_div {
  position: absolute;
  width: calc(100% - var(--left_sidebar-width));
  height: calc(100% - var(--title-height));
  /* border: 1px solid rgb(21, 0, 255); */
  top: var(--title-height);
  left: var(--left_sidebar-width);
}
</style>

