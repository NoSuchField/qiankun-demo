import Home from "../views/Home.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
 
// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    { name: 'home', path: '/', component: Home },
    { name: 'another-vue3', path: '/another-vue3', component: {} },
    { name: 'vue3', path: '/vue3', component: {} },
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
 const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
// 3导出路由   然后去 main.ts 注册 router.ts
export default router