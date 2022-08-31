import { createRouter, createWebHistory } from 'vue-router';
import Hello from "../components/Hello.vue";
import World from "../components/World.vue";
const routes = [
  { name: 'another-vue3', path: '/another-vue3', component: Hello },
  { name: 'vue3', path: '/vue3', component: World },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 解决微应用路由切换后主应用切换路由报错问题
router.beforeEach((to, from, next) => {

  // if (!window.history.state.current) {
  //   window.history.state.current = to.fullPath;
  // }
  // if (!window.history.state.back) {
  //   window.history.state.back = from.fullPath;
  // }
  return next();
});

export default router