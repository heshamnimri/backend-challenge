import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// custom router than keeps track of dynamic routes
class VueRouterEx extends VueRouter {
  matcher: any;

  public routes: RouteConfig[] = [];

  constructor(options: any) {
    super(options);
    const { addRoutes } = this.matcher;
    const { routes } = options;

    this.routes = routes;

    this.matcher.addRoutes = (newRoutes: RouteConfig[]) => {
      this.routes.push(...newRoutes);
      addRoutes(newRoutes);
    };
  }
}

Vue.use(VueRouterEx);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/contacts/external',
  },

  // tabs
  {
    path: '/contacts',
    component: () => import('@/layout/index.vue'),
    redirect: '/contacts/external',
    meta: {
      title: 'Contacts',
      icon: 'el-icon-user',
      scope: 'contacts',
    },
    children: [
      {
        path: '',
        component: () => { ''; },
      },
      {
        path: 'external',
        component: () => import('@/views/contacts/external.vue'),
        name: 'External Contacts',
        meta: {
          title: 'External',
          icon: 'el-icon-office-building',
          scope: 'contacts',
        },
      },
    ],
  },
];

const router = new VueRouterEx({
  routes,
});

export default router;
