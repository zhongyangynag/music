// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import './assets/styles/iconfont.css'
import Vuex from 'vuex'
import store from './store/store'
import $ from 'jquery'
import live2d4vue from 'live2d4vue'
import './assets/live2d/css/live2d.css'
import './assets/live2d/js/live2d.js'


Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(live2d4vue);


Vue.config.productionTip = false;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
