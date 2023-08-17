import { createApp } from "vue";
import App from "./App.vue";

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";
// @ts-ignore
import router from '~/router/index.js'

import axios from 'axios'
// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
// app.use(ElementPlus);

app.use(router)
app.mount("#app");
import VueAxios from 'vue-axios'

app.use(VueAxios, axios)
