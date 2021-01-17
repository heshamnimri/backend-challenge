import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/shopify-images',
  },

  {
    path: '/shopify-images',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/shopify-images/index.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
