import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/Goods/Goods';
import Ratings from '@/components/Ratings/Ratings';
import Seller from '@/components/Seller/Seller';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings,
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller,
    },
  ],
  linkActiveClass: 'active' //選重後樣式
});