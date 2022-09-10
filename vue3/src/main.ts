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
    render(props);
  },
  bootstrap() {
  },
  unmount(props: any) {
    root.unmount();
  },
  update(props: any) {
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

