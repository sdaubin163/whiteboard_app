<!-- 左侧面板选择区 -->
<script setup lang="ts">
import { ref, computed } from 'vue';

// 传入的参数
const props = defineProps({
  isLeftPanelFold: Boolean
})
// 同步传出的参数
const emit = defineEmits(['fold_status_change']);

// 左侧面板区是否已被折叠，默认展开状态（false）
// let isFold: Boolean = props.isLeftPanelFold;
let isFold = ref(props.isLeftPanelFold);

/* 切换面板折叠状态 */
function togglePanelFoldState() {
  isFold.value = !isFold.value;
  console.log('左侧面板是否已被折叠：', isFold.value);
  // 折叠状态发生改变时，将新的状态值传回App.vue，
  // 以便右侧的主要内容区样式同步进行调整
  emit('fold_status_change', isFold.value);
}

/* 通过计算属性，控制多个元素样式的改变，
直接在<template>写的话，会看起来比较乱 */
  const ribbonStyle = computed(()=>({
    width: isFold.value ? 'var(--left_ribbon-width_hidden)' : 'var(--left_ribbon-width)'
  }))

  // 中间图标区
  const iconPanelStyle = computed(()=>({
      display: isFold.value ? 'none' : '',
      width: isFold.value ? '0' : ''
      }))

  // 右侧隐藏按钮区
  const rightToggleStyle = computed(()=>({
      width: isFold.value ? '100%' : ''
    }))
    

</script>

<template>
  <div id="left_ribbon_div" :style="ribbonStyle" class="absolute flex flex-row-reverse bg-[#a52a2a]">
    <div class="w-1/5 h-full flex items-center justify-center order-1" :style="rightToggleStyle">
      <button id="toggleBtn" @click="togglePanelFoldState">
      <span class="" data-state="closed">
        <div class="flex h-[72px] w-3 items-center justify-center" style="opacity: 0.25;">
          <div class="flex h-6 w-3 flex-col items-center">
            <div class="h-3 w-1 rounded-full bg-token-text-primary" :style="{
              transform: isFold ? 'translateY(0.15rem) rotate(-15deg) translateZ(0px)' : 'translateY(0.15rem) rotate(15deg) translateZ(0px)'
            }"></div>
            <div class="h-3 w-1 rounded-full bg-token-text-primary" :style="{
              transform: isFold ? 'translateY(-0.15rem) rotate(15deg) translateZ(0px)' : 'translateY(-0.15rem) rotate(-15deg) translateZ(0px)'
            }"></div>
          </div>
        </div>
      </span>
    </button>
    </div>
    <div id="iconPanel" class="w-3/5 h-full flex border-solid border-red-900 border order-2" :style="iconPanelStyle">

    </div>
    
    
  </div>
</template>

<style scoped>

#left_ribbon_div {
  /* position: absolute; */
  left: 0px;
  top: var(--title-height);
  border: 1px solid rgb(56, 0, 0);
  width: var(--left_ribbon-width);
  /* 以下算式中得加空格才能被解析 */
  height: calc(100% - var(--title-height));
}

</style>