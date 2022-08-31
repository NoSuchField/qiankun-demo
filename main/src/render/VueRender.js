import { createApp } from 'vue';
import SubAppContainer from './SubAppContainer.vue'

let app = null;

export default function render({ loading }) {
  if (!app) {
    app = createApp(SubAppContainer)
  } else {
    app.loading = loading;
  }
  return app;
}
