import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const rightContentsShowStore = defineStore(
    'rightContentsShowStore',
    ()=>{
      // 右侧显示的组件名
      const componentName : Ref<string> = ref('')
      
      // 定义操作函数
      function updateComponentName(name : string) {
          componentName.value = name
      }

      // 暴露
      return { componentName, updateComponentName }

    }
  )