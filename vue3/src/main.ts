import './style.css'
import { type App as AppType, createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let app: AppType

function render (root: Element | Document = document) {
  let history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue3' : '/');
  let router = createRouter({
    history,
    routes,
  });
  app = createApp(App)
  app.use(router).mount(root.querySelector('#app'))
}

renderWithQiankun({
  bootstrap () {
    // do nothing.
  },
  mount (props: any) {
    render(props.container)
  },
  unmount () {
    app?.unmount()
  },
  update(props: any) {
    console.log(props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}