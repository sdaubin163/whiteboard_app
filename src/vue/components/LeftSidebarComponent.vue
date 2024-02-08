<!-- 左侧的图标现实组件 -->

<script setup lang="ts">
import { rightContentsShowStore } from '@/stores/RightContentsShowStore'
const showStore = rightContentsShowStore()

// // 同步传出的参数
// const emit = defineEmits(['show_commponent_name']);

function emitComponentChange(componentName: string) {
    // emit('show_commponent_name', componentName);
    console.log('设置显示的组件名：', componentName);
    showStore.updateComponentName(componentName);
    console.log('设置显示的组件名：', componentName, '---> 成功');
}

</script>
<template>
    <div >
        <!-- <div class="mt-4 w-8 h-8 flex ">
            <div class="gizmo-shadow-stroke overflow-hidden rounded-full">
                <img src="@/public/icons/blackboard_256.svg" alt="My Icon">
            </div>
            
        </div>

        <div class="mt-4 w-8 h-8 flex ">
            <div class="gizmo-shadow-stroke overflow-hidden rounded-full w-8 h-8 bg-white">
                <img src="@/public/icons/hostgator.svg" alt="My Icon" class="h-full w-full max-w-full max-h-full object-contain bg-token-surface-secondary " >
            </div>
        </div> -->


        <div class="mt-4 w-8 h-8 flex">
            <button @click="emitComponentChange('Tldraw')">
                <div class="h-8 w-8 ">
                    <div class="gizmo-shadow-stroke overflow-hidden rounded-full">
                        <img src="@/public/tldraw_24X24.png.png" class="h-full w-full bg-token-surface-secondary "  alt="tldraw" width="24" height="24">
                    </div>
                </div>
            </button>
        </div>

        <div class="mt-4 w-8 h-8 flex">
            <button @click="emitComponentChange('Mail163')">
                <div class="h-8 w-8 ">
                    <div class="h-full w-full relative flex items-center justify-center rounded-full  bg-white ">
        <!-- class="h-full w-full bg-token-surface-secondary " -->
                        <img src="@/public/163.png" width="32" height="32" alt="163" >
                    </div>
                </div>
            </button>
        </div>

        <!-- 这个是标准布局样式 -->
        <div class="mt-4 w-8 h-8 flex">
            <button @click="emitComponentChange('Chatgpt')">
                <div class="w-8 h-8 ">
                    <div class="h-full w-full relative flex  items-center justify-center rounded-full bg-[#00ffff] ">
                        <img src="@/public/svg/chatgpt.svg" width="24" height="24" />
                    </div>
                </div>
            </button>
        </div>

        <!-- 这个是标准布局样式 -->
<!--        <div class="mt-4 w-8 h-8 flex">-->
<!--            <button @click="emitComponentChange('Monaco')">-->
<!--                <div class="w-8 h-8 ">-->
<!--                    <div class="h-full w-full relative flex  items-center justify-center rounded-full bg-[#00ffff] ">-->
<!--                        <img src="@/public/svg/chatgpt.svg" width="24" height="24" />-->
<!--                    </div>-->
<!--                </div>-->
<!--            </button>-->
<!--        </div>-->

        

    </div>
</template>

<style scoped></style>