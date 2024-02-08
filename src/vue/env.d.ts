/// <reference types="vite/client" />
// 这个文件生效的前提是 tsconfig.json 中配置了 "include": ["env.d.ts"],
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
declare module 'vue-monaco';
