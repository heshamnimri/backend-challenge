import {
  Module, VuexModule, MutationAction, Mutation, Action,
} from 'vuex-module-decorators';
import { DeviceType, Snackbar } from '@/types/app';
import axios from 'axios';

@Module({
  name: 'app',
  namespaced: true,
})
export default class AppState extends VuexModule {
  public deviceType = DeviceType.Desktop;

  public currentLearningProgram = '';

  public sidebarIsOpen = true;

  public globalMessage: Snackbar = {} as Snackbar;

  public defaultMessageDuration = 3000;

  public learningPrograms: any = [];

  @MutationAction({
    mutate: ['deviceType'],
    rawError: true,
  })
  async setDeviceType(deviceType: DeviceType) {
    return { deviceType };
  }

  @MutationAction({
    mutate: ['sidebarIsOpen'],
    rawError: true,
  })
  async setSidebar(value: boolean) {
    const sidebarIsOpen = value;

    return { sidebarIsOpen };
  }

  @MutationAction({
    mutate: ['learningPrograms'],
    rawError: true,
  })
  async setupLearningPrograms() {
    const learningPrograms = (await axios.get('http://localhost:1234/images')).data;
    console.log(learningPrograms);
    // const learningPrograms = [
    //   {
    //     uuid: 1,
    //     name: 'Ivey',
    //     title: 'Ivey',
    //     subtitle: 'Management Essential',
    //     src:
    //       'https://locorum.ca/wp-content/uploads/2018/09/Ivey-Business-School-1.jpg',
    //     flex: 12,
    //   },
    // ];

    return { learningPrograms };
  }

  @MutationAction({
    mutate: ['currentLearningProgram'],
    rawError: true,
  })
  async setCurrentLearningProgram(value: string) {
    const currentLearningProgram = value;

    return { currentLearningProgram };
  }

  @Mutation
  SHOW_ERROR_MESSAGE(text: string) {
    this.globalMessage = {
      message: text,
      type: 'error',
      duration: this.defaultMessageDuration,
    };
  }

  @Mutation
  SHOW_SUCCESS_MESSAGE(text: string) {
    this.globalMessage = {
      message: text,
      type: 'success',
      duration: this.defaultMessageDuration,
    };
  }

  @Mutation
  TOGGLE_SIDEBAR() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }

  @Mutation
  RESET_CURRENT_LEARNING_PROGRAM() {
    this.currentLearningProgram = '';
  }
}
