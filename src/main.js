// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);


// import VueRouter from 'vue-router';

Vue.config.productionTip = false;
/* eslint-disable no-new */
// 定義路由
// const routes = [
//   { path: 'goods', component: Goods },
//   { path: 'ratings', component: Ratings },
//   { path: 'seller', component: Seller },
  
// ]

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
