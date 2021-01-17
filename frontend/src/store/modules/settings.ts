import { Module, VuexModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'settings',
  namespaced: true,
})
export default class SettingsState extends VuexModule {
}
