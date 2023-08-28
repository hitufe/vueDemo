import { createApp } from "vue";
import App from "./App.vue";

// import "~/styles/element/index.scss";

import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";
// import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";
// @ts-ignore
import router from '~/router/index.js'

import axios from 'axios'
import "element-plus/theme-chalk/src/message-box.scss";
// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
// app.use(ElementPlus);

app.use(router)
app.mount("#app");
import VueAxios from 'vue-axios'

app.use(VueAxios, axios)
// app.use(ElementPlus, {
//     locale: zhLocale
// })
import * as ElIcon from '@element-plus/icons-vue'
// @ts-ignore
/*import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

app.use(ElementPlus, {
    locale: zhCn,
})*/

Object.keys(ElIcon).forEach((key) => {
    // @ts-ignore
    app.component(key, ElIcon[key])
})