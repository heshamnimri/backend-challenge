import {
  Module, VuexModule, Action, MutationAction,
  Mutation,
} from 'vuex-module-decorators';

@Module({
  name: 'learningStory',
  namespaced: true,
})
export default class LearningStoryState extends VuexModule {
  public workflows: any[] = [];

  @MutationAction({
    rawError: true,
    mutate: ['workflows'],
  })
  async setupWorkflows() {
    const workflows = [
      {
        uuid: '1',
        name: 'My First Workflow',
      },
      {
        uuid: '2',
        name: 'My Second Workflow',
      },
      {
        uuid: '3',
        name: 'My Third Workflow',
      },
    ];
    return { workflows };
  }
}
