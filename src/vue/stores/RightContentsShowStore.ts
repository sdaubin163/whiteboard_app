import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const rightContentsShowStore = defineStore(
    'rightContentsShowStore',
    ()=>{
      // 计数,初始为0
      const changeTimes : Ref<string> = ref('0')


      // 右侧显示的组件名
      const componentName : Ref<string> = ref('')
      
      // 定义操作函数
      function updateComponentName(name : string) {
          componentName.value = name

          // 每更新一次，加1
          let times =  Number(changeTimes.value) + 1;
          changeTimes.value = times.toString();
      }

      // 暴露
      return { componentName, updateComponentName , changeTimes}

    }
  )