<!-- 右侧显示内容区 -->
<script setup lang="ts">

    import {rightContentsShowStore} from '@/stores/RightContentsShowStore'
    import { computed, ref, watchEffect, type Component } from 'vue';
    const showStore = rightContentsShowStore()

    const dynamicComponent = ref<Component>();
    // 缓存已导入的组件，已经导入过的不再重复导入
    const loadedComponents : {[key: string]: Component| undefined} = {};

    watchEffect(async () => {
        const componentName = showStore.componentName;
        if (componentName) {
            // 检查组件是否已经加载过
            if (!loadedComponents[componentName]) {
            // 如果没有加载过，则动态导入组件
            loadedComponents[componentName] = (await import(`@/components/rightcontents/${componentName}.vue`)).default;
            }
            // 设置或更新动态组件
            dynamicComponent.value = loadedComponents[componentName];
        }
    });

    // // 使用计算属性来获取动态组件 
    // const dynamicComponentName = computed(() => {
    // switch (showStore.componentName) {
    //     case 'Tldraw':
    //         return Tldraw;
    //     case 'Chatgpt':
    //         return Chatgpt;
    //     default:
    //         return Chatgpt;
    // }
    // });

    // 传入的参数
    const props = defineProps({
        isLeftPanelFold: Boolean
    })
    // 左侧面板区是否已被折叠，默认展开状态（false）
    // let isFold: Boolean = props.isLeftPanelFold;

</script>


<template>
    <div id="main_contens_div" :style="{
      width: props.isLeftPanelFold ? 'calc(100% - var(--left_sidebar-width_hidden))' : 'calc(100% - var(--left_sidebar-width))',
      left: props.isLeftPanelFold ? 'var(--left_sidebar-width_hidden)' : 'var(--left_sidebar-width)'
    }">

        <component :is="dynamicComponent"></component>

    <!-- <iframe src="../react/index.html" width="100%" height="100%" sandbox="allow-scripts allow-same-origin"></iframe> -->
    
        <!-- <Tldraw></Tldraw> -->

    </div>
</template>

<style scoped>
    

</style>

