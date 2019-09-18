import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import axios from 'axios'
import FastClick from 'fastclick'

import './congig/rem'
import 'vant/lib/index.css'
import { Button, Field, Switch, } from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);

Vue.prototype.$http = axios

Vue.use(Vant);
Vue.config.productionTip = false

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')