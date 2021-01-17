import { Module, VuexModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import { graphQL } from '@/utils/logic';
import { logger } from '@/utils/logger';

@Module({
  name: 'settings',
  namespaced: true,
})
export default class SettingsState extends VuexModule {
}
