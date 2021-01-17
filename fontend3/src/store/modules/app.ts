import { Module, VuexModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import { logger } from '@/utils/logger';
import { DeviceType, Snackbar } from '@/types/util';
import { RouteConfig } from 'vue-router';
import router from '@/router';

@Module({
  name: 'app',
  namespaced: true,
})
export default class AppState extends VuexModule {
  public deviceType = DeviceType.Desktop;
  public currentPagename = '';
  public sidebarIsOpen = true;
  public showSidebarAnimation = true;
  public globalMessage: Snackbar = {} as Snackbar;
  public defaultMessageDuration = 3000;
  public routes: RouteConfig[] = []
  public userAllowedScopes = [
    'query:projects:internal',
    'query:contacts',
    'query:timesheets',
    'query:schedule',
    'query:deals',
    'query:settings',
  ]

  // currently logged in user's info
  public loggedIn = true;
  public get userUUID() {
    return 'ab189f18-ea52-4689-b39f-b7113d606d64';
  }

  @MutationAction({
    mutate: ['deviceType'],
    rawError: true,
  })
  async setDeviceType(deviceType: DeviceType) {
    logger.debug('changing device type to');
    logger.debug(DeviceType[deviceType]);

    return { deviceType };
  }

  @MutationAction({
    mutate: ['sidebarIsOpen'],
    rawError: true,
  })
  async setSidebar(value: boolean) {
    logger.debug('toggling sidebar to');
    logger.debug(value);

    const sidebarIsOpen = value;

    return { sidebarIsOpen };
  }

  @MutationAction({
    mutate: ['showSidebarAnimation'],
    rawError: true,
  })
  async setShowSidebarAnimation(value: boolean) {
    logger.debug('setting sidebar animation to');
    logger.debug(value);

    const showSidebarAnimation = value;

    return { showSidebarAnimation };
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
  ADD_ROUTES(routes: RouteConfig[]) {
    router.addRoutes(routes);
    this.routes.push(...routes);
  }

  @Mutation
  SET_ROUTES(routes: RouteConfig[]) {
    this.routes = JSON.parse(JSON.stringify(routes));
  }
}
