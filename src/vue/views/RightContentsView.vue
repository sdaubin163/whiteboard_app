<!-- 右侧显示内容区 -->
<script setup lang="ts">

    import ChatgptVue from '@/components/rightcontents/Chatgpt.vue';
    import {rightContentsShowStore} from '@/stores/RightContentsShowStore'
    import { computed, onMounted, ref, watchEffect,watch, type Component, onBeforeUnmount, onUpdated, nextTick, reactive } from 'vue';
    const showStore = rightContentsShowStore()

    const dynamicComponent = ref<Component>();
    // 缓存已导入的组件，已经导入过的不再重复导入
    const loadedComponents : {[key: string]: Component| undefined} = {};

    // <ChatgptVue></ChatgptVue> 和 <component></component> 的显示互斥
    const showChatgptFlag = ref<Boolean>(false);
    const componentStyle = computed(() => ({
        display: showChatgptFlag.value ? 'none' : 'block'
    }));
    const chatgptStyle = computed(() => ({
        display: showChatgptFlag.value ? 'block' : 'none'
    }));


    // 通过全局状态获取需要显示的组件名 
    watchEffect(async () => {

        // 此处监控changetimes，主要是有时候实际点击了按钮但是componentName不变的话，并没有触发展示对应的页面。
        // 这是一个优化
        const changetimes = showStore.changeTimes;
        console.log(`更新次数 : ${changetimes}`);
        const componentName = showStore.componentName;
        // 0- 本地文件 1- 网络资源
        let url_type : number = 0;
        let url : string = '';
        if (!componentName) {
          // 首次打开时，为空
          console.log(`页面组件为空 : ${componentName}`);
          return;
        }
      if (componentName === 'Chatgpt') {
        url_type = 1;
        url = 'https://chat.openai.com/'
      } else if (componentName === 'Tldraw') {
        url_type = 0;
        url = 'react/index.html'
      } else if (componentName === 'Mail163') {
        url_type = 1;
        url = 'https://mail.163.com'
      } else if (componentName === 'Porcesson') {
        url_type = 1;
        url = 'https://www.processon.com/diagrams'
      } else if (componentName === 'Claude') {
        url_type = 1;
        url = 'https://claude.ai/'
      } else if (componentName === 'Monaco') {
        url_type = 0;
        url = 'react/index.html'
      }else if (componentName === 'Ollama') {
        url_type = 1;
        url = 'http://127.0.0.1:18999/'
      } 
      console.log('xian shi yemian ');

      window.smartboardAPI.showMainContentView(componentName, url_type, url);
      setMainContentViewPosition(false);
    });

    // 传入的参数
    const props = defineProps({
        isLeftPanelFold: Boolean
    })

    interface IMainContentsType {
        // 距离窗口左侧的定位
        x: number,
        y: number,
        width: number,
        height: number
    };
    const mainContentsSize: IMainContentsType = reactive({
        x: 0,
        y: 0,
        width : 0,
        height: 0
    });


    // 计算 main_contens_div 的样式
    const mainContentsDivStyle = computed(() => ({
        width: props.isLeftPanelFold ? 'calc(100% - var(--left_sidebar-width_hidden))' : 'calc(100% - var(--left_sidebar-width))',
        left: props.isLeftPanelFold ? 'var(--left_sidebar-width_hidden)' : 'var(--left_sidebar-width)'
    }));

let resizeHandler = () => setMainContentViewPosition(true);

onMounted(() => {
  window.addEventListener('resize', resizeHandler);
});


  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });


    // 监听右侧显示区域的变化情况
    const mainContentsDivRef = ref<HTMLElement | null>(null);

  //   reSizeFlag 窗口缩放标志，如果是缩放的，不需要调整左侧边框位置， width、height可以直接获取
  function setMainContentViewPosition(reSizeFlag:boolean) {
      if (mainContentsDivRef.value && mainContentsDivRef.value instanceof HTMLElement) {

          let { x, y, width, height } = mainContentsDivRef.value.getBoundingClientRect();
          console.log(`X: ${x}, Y: ${y}, Width: ${width}, Height: ${height}`);

          let computedStyle = window.getComputedStyle(mainContentsDivRef.value);

          let left:string = computedStyle.left;
            // 默认是展开状态，占3rem
          let leftNumber:number = 48;
          
          // 通过css控制的  
          if(reSizeFlag){
            if(left) {
              left = left.replace('px','');
              leftNumber = Number(left)
            } else {
                leftNumber = 48;
            }  
          } else {
            if (props.isLeftPanelFold) {
                leftNumber = 16;
                width = window.innerWidth - leftNumber;
            }else{
                leftNumber = 48;
                width = window.innerWidth - leftNumber;
            }
          }

          window.smartboardAPI.setViewPosition(leftNumber, y, width, height);
      }
  }

    watch(props, ()=>{
      setMainContentViewPosition(false);
    })

</script>


<template>
    <div  :style="mainContentsDivStyle" ref="mainContentsDivRef"  id="main_contens_div"  >

        <!-- <component :is="dynamicComponent" :style="componentStyle"></component>
        <ChatgptVue class="w-full h-full" :style="chatgptStyle"></ChatgptVue> -->

    </div>
</template>

<style scoped>
    

</style>

