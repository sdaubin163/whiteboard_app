<!-- 左侧面板选择区 -->
<template>
    <div id="left_ribbon_div" :style="{
      width: isFold ? 'var(--left_ribbon-width_hidden)' : 'var(--left_ribbon-width)'
    }">
        <button id="toggleBtn" @click="togglePanelFoldState">
        <span class="" data-state="closed">
          <div class="flex h-[72px] w-8 items-center justify-center" style="opacity: 0.25;">
            <div class="flex h-6 w-6 flex-col items-center">
              <div class="h-3 w-1 rounded-full bg-token-text-primary"
                style="transform: translateY(0.15rem) rotate(15deg) translateZ(0px); "></div>
              <div class="h-3 w-1 rounded-full bg-token-text-primary"
                style="transform: translateY(-0.15rem) rotate(-15deg) translateZ(0px);"></div>
            </div>
          </div>
        </span>
      </button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    // 传入的参数
    const props = defineProps({
      isLeftPanelFold: Boolean
    })
    // 同步传出的参数
    const emit = defineEmits(['fold_status_change']);

    // 左侧面板区是否已被折叠，默认展开状态（false）
    let isFold :Boolean = props.isLeftPanelFold;

    /* 切换面板折叠状态 */
    function togglePanelFoldState() {
        isFold = !isFold;
        console.log('左侧面板是否已被折叠：', isFold);
        emit('fold_status_change', isFold);
    }
</script>

<style scoped>

</style>