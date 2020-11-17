import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from 'vant'
import {Toast} from 'vant'
import 'vant/lib/index.css';
import {http, fileHttp} from '../http'
import '@/assets/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
Vue.prototype.$http = http
Vue.prototype.$msg = Toast
Vue.prototype.$fileHttp = fileHttp
Vue.use(vant)
Vue.use(ElementUI);
Vue.prototype.$qs = qs


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
