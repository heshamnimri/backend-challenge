import {
  Module, VuexModule, Action,
} from 'vuex-module-decorators';
import {
  UserType, // LoginArgs,
} from '@/types/auth';
// import { AuthService } from '@/services/auth';

@Module({
  name: 'auth',
  namespaced: true,
})
export default class AuthState extends VuexModule {
  public user: UserType = {} as UserType;
/*
  @Action({ rawError: true })
  async login(loginInfo: LoginArgs) {
    const response = await AuthService.login(loginInfo.email, loginInfo.password);
    return response;
  } */
}
