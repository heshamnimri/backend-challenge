import { Module, VuexModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import { RouteConfig } from 'vue-router';
import router from '@/router';

@Module({
  name: 'app',
  namespaced: true,
})
export default class AppState extends VuexModule {
  public deviceType = 'Desktop';
  public currentPagename = '';
  public sidebarIsOpen = true;
  public showSidebarAnimation = true;
  public globalMessage: any = {} as any;
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
  async setDeviceType(deviceType: any) {
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
    mutate: ['showSidebarAnimation'],
    rawError: true,
  })
  async setShowSidebarAnimation(value: boolean) {
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
