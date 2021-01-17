import Vue from 'vue';
import Vuex from 'vuex';
import { config } from 'vuex-module-decorators';

import AppState from './modules/app';
import AuthState from './modules/auth';
import WorkflowState from './modules/workflow';
import LearningStoryState from './modules/learningStory';

config.rawError = true;

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: AppState,
    auth: AuthState,
    workflow: WorkflowState,
    learningStory: LearningStoryState,
  },
});
