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

let styleMap = new Map<string, Element[]>();
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
      Array.from(document.getElementsByTagName('head')[0].children).filter(item => item.tagName === 'STYLE').forEach(element => {  
        element.setAttribute('data-app', 'main')
      })
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
    // 挂载后的回调
    beforeMount: [
      // @ts-ignore
      app => {
        let appStyleList:Element[] = []
        Array.from(document.getElementsByTagName('head')[0].children).filter(item => item.tagName === 'STYLE').forEach(element => {
          let attr = element.getAttribute('data-app');
          if (!attr) {
            element.setAttribute('data-app', app.name)
            appStyleList.push(element)
            document.getElementsByTagName('qiankun-head')[0].appendChild(element)
          }
          if (attr !== 'main' && attr) {
            element.remove();
          }
        })

        let styleList = styleMap.get(app.name)
        if (styleList) {
          styleList.forEach(s => {
            document.getElementsByTagName('qiankun-head')[0].appendChild(s)
          })
        } else {
          styleMap.set(app.name, appStyleList)
        }
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

