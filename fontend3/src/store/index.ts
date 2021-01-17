import Vue from 'vue';
import Vuex from 'vuex';

import AppState from './modules/app';
import ContactState from './modules/contacts';
import SettingsState from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: AppState,
    contacts: ContactState,
    settings: SettingsState,
  },
});
