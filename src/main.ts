import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

if (import.meta.env.DEV) {
  document.title = "(DEV) " + document.title;
}

createApp(App).mount("#app");
