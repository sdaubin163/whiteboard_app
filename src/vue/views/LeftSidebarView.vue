<!-- 左侧面板选择区 -->
<script setup lang="ts">
import LeftSidebarComponent from '@/components/LeftSidebarComponent.vue';
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
  const sidebarStyle = computed(()=>({
    width: isFold.value ? 'var(--left_sidebar-width_hidden)' : 'var(--left_sidebar-width)'
  }))

  // 中间图标区
  const iconPanelStyle = computed(()=>({
      display: isFold.value ? 'none' : '',
      width: isFold.value ? '0' : ''
      }))

  // 右侧隐藏按钮区
  const rightToggleStyle = computed(()=>({
      // width: isFold.value ? '' : 'var(--left_sidebar-width)' 
      left: isFold.value ? '' : '2rem'
    }))
    

</script>

<!-- bg-[#a52a2a] -->
<template>
  <div id="left_sidebar_div" :style="sidebarStyle" class="absolute flex justify-center">
    <div id="toggleDiv" class="fixed left-1 top-1/2 z-40 " :style="rightToggleStyle">
        <div class="w-full h-full flex items-center justify-center order-1 " >
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
    </div>
    
    <div id="iconPanel" class="relative w-3/5 h-full flex flex-col justify-center " :style="iconPanelStyle">
      <div class="relative top-4 flex h-[calc(100%-48px)]  flex-col w-full" >
          <div class="flex h-full w-full flex-col items-center justify-between">
            <div>
              <div class="unselect mb-4"><img loading="lazy" width="28" height="28" decoding="async" data-nimg="1" class="mx-auto" src="../public/icons/sidebar_blackboard.svg" style="color: transparent;"></div>

              <LeftSidebarComponent></LeftSidebarComponent>

            </div>
          </div>
      </div>

      
    </div>
    
    
  </div>
</template>

<style scoped>

#left_sidebar_div {
  /* position: absolute; */
  left: 0px;
  top: var(--title-height);
  border-right: 2px solid rgba(255, 255, 255, 0.05);
  width: var(--left_sidebar-width);
  /* 以下算式中得加空格才能被解析 */
  height: calc(100% - var(--title-height));
}

</style>