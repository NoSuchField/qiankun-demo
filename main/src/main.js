import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { registerMicroApps, initGlobalState, setDefaultMountApp, runAfterFirstMounted, start } from 'qiankun';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

/**
 * Step1 注册子应用
 */
 
registerMicroApps(
  [
    {
      name: 'vue3',
      entry: '//localhost:7106',
      container: '#subapp-viewport',
      activeRule: '/vue3',
    },
    {
      name: 'another-vue3',
      entry: '//localhost:7107',
      container: '#subapp-viewport',
      activeRule: '/another-vue3',
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log(app + ' beforeLoad')
      },
    ],
    beforeMount: [
      (app) => {
        console.log(app + ' beforeMount')
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(app + ' afterUnmount')
      },
    ],
  },
);

const { setGlobalState } = initGlobalState({
  user: 'qiankun',
});

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
* Step2 设置默认进入的子应用
*/
setDefaultMountApp('/home');

/**
* Step3 启动应用
*/
start();


runAfterFirstMounted(() => {
  
});
