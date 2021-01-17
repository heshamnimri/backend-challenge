// main imports
import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

// third party

// element
import '@/styles/element-variables.scss';
import locale from 'element-ui/lib/locale/lang/en'; // eslint-disable-line import/order
import vuetify from './plugins/vuetify';

Vue.use(Element, { locale });

Vue.config.performance = true;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
