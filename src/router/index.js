import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import HelloWorld from '@/components/pages/HelloWorld';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // linkExactActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'hello-world',
      component: HelloWorld
    }
  ]
});

export default router;