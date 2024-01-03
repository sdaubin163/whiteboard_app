<!-- 右侧显示内容区 -->
<template>
    <div id="main_contens_div" :style="{
      width: props.isLeftPanelFold ? 'calc(100% - var(--left_ribbon-width_hidden))' : 'calc(100% - var(--left_ribbon-width))',
      left: props.isLeftPanelFold ? 'var(--left_ribbon-width_hidden)' : 'var(--left_ribbon-width)'
    }">

    </div>
</template>

<script setup lang="ts">
    // 传入的参数
    const props = defineProps({
        isLeftPanelFold: Boolean
    })
    // 左侧面板区是否已被折叠，默认展开状态（false）
    // let isFold: Boolean = props.isLeftPanelFold;

</script>

<style scoped>


</style>