import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "@/routers";
import "element-plus/dist/index.css";

const app = createApp(App);
const store = createPinia();

store.use(piniaPluginPersistedstate);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");