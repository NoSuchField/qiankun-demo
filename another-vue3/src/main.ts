import './style.css'
import { App, createApp } from 'vue'
import app from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let root: App;

function render(props: any) {
  const { container } = props;
  root = createApp(app)
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app")
  root.mount(c)
}

renderWithQiankun({
  mount(props) {
    console.log("another-vue3 mount");
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("another-vue3 unmount");
    root.unmount();
  },
  update(props: any) {
    console.log("another-vue3 update");
    console.log(props)
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

