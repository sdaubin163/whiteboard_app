<script setup lang="ts">
import { ref } from 'vue';

const isLeftDivHidden = ref(false);

function toggleDiv() {
  isLeftDivHidden.value = !isLeftDivHidden.value;
  console.log(isLeftDivHidden.value);
}


import LeftRibbonView from './views/LeftRibbonView.vue';
import MainContentsViewVue from './views/MainContentsView.vue';
import TitleView from './views/TitleView.vue'

  // 左侧面板是否被折叠
  const isLeftPanelFold = ref(false)

</script>

<template>
  <div id="all_div">
    <div id="drag_div" class="z-50"></div>
    <TitleView ></TitleView>
    <LeftRibbonView  :isLeftPanelFold="isLeftPanelFold" @fold_status_change="isLeftPanelFold =  $event"></LeftRibbonView>
    <MainContentsViewVue  :isLeftPanelFold="isLeftPanelFold"></MainContentsViewVue>
  </div>
</template>

<style>
.bg-token-text-primary {
  background: black;
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
  border: 1px solid blue;
  width: var(--title-width);
  height: var(--title-height);
  user-select: none;
  -webkit-app-region: drag;
}

#left_ribbon_div {
  position: absolute;
  left: 0px;
  top: var(--title-height);
  border: 1px solid rgb(56, 0, 0);
  width: var(--left_ribbon-width);
  /* 以下算式中得加空格才能被解析 */
  height: calc(100% - var(--title-height));
}

.hidden {
  display: none;
  /* 或者其他隐藏的样式 */
  width: 2rem;
}


#main_contens_div {
  position: absolute;
  width: calc(100% - var(--left_ribbon-width));
  height: calc(100% - var(--title-height));
  border: 1px solid rgb(21, 0, 255);
  top: var(--title-height);
  left: var(--left_ribbon-width);
}
</style>

