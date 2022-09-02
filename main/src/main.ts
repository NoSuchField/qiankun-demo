import './style.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { registerMicroApps, initGlobalState, setDefaultMountApp, runAfterFirstMounted, start } from 'qiankun';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')

declare var __webpack_public_path__: string|undefined
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

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
    // 挂载前的回调
    beforeLoad: (app: any) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
    // 挂载后的回调
    beforeMount: [
      // @ts-ignore
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    // 卸载后的回调
    afterMount: (app: any) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
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
start({
  sandbox: {experimentalStyleIsolation: true}
});


runAfterFirstMounted(() => {
  
});

