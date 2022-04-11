import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import {
  ROLES_KEY,
  TOKEN_KEY,
  ADMIN_TOKEN_KEY,
  USER_INFO_KEY,
  ROUTER_KEY,
} from '/@/enums/cacheEnum';
import { getAuthCache, getToken, setAuthCache } from '/@/utils/auth';
import {
  GetUserInfoModel,
  LoginParams,
  LoginAdminParams,
  RegisterParams,
} from '/@/api/sys/model/userModel';
import {
  doLogout,
  getUserInfo,
  loginByAdmin,
  loginApi,
  listAllDeviceTypeByPage,
  RegisterApi,
  getUserInfoByM,
} from '/@/api/sys/user';
// import { listAllDeviceTypeByPage } from '/@/api/demo/table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  adminToken?: string;
  adminLogStatus?: boolean;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  smsCode?: string;
  registerCode?: string;
  smsCodeLogin?: string;
  routerName?: string;
  routerNameList?: string[];
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    adminLogStatus: false, //是否登录管理员
    adminToken: undefined, // 管理员token
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    smsCode: '',
    registerCode: '',
    smsCodeLogin: '',
    // 路由参数名
    routerName: '',
    routerNameList: [],
  }),
  getters: {
    getUserInfo(): UserInfo {
      console.log('homePath', this.userInfo);
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getAdminToken(): string {
      return this.adminToken || getAuthCache<string>(ADMIN_TOKEN_KEY);
    },
    getAdminLogStatus(): boolean {
      return !!this.adminLogStatus;
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
  },
  actions: {
    setRouterNameList(code) {
      this.routerNameList = code;
      setAuthCache(ROUTER_KEY, code);
    },
    setRouterName(code) {
      this.routerName = code;
    },
    setSmsCodeLogin(code) {
      this.smsCodeLogin = code;
    },
    setSmsCode(code) {
      this.smsCode = code;
    },
    setRegisterCode(code) {
      this.registerCode = code;
    },
    setToken(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setAdminToken(info: string | undefined) {
      this.adminToken = info;
      setAuthCache(ADMIN_TOKEN_KEY, info);
    },
    setAdminLogStatus(flag: boolean) {
      this.adminLogStatus = flag;
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: user login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        // 新的login接口请求------
        const { goHome = true, mode, ...loginParams } = params;
        const RESdATA: any = await loginApi(loginParams, mode);
        const sessionTimeout = this.sessionTimeout;
        sessionTimeout && this.setSessionTimeout(false);
        !sessionTimeout && goHome && (await router.replace('/home/index' || PageEnum.BASE_HOME));
        // !sessionTimeout &&
        //   goHome &&
        //   (await router.replace(userInfo.homePath || PageEnum.BASE_HOME));
        console.log('RESdATA-123--', RESdATA);
        return RESdATA;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: admin login
     */
    async loginAdmin(
      params: any & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        // 新的login接口请求------
        const { goHome = true, mode, ...LoginAdminParams } = params;
        const RESdATA: any = await loginByAdmin(LoginAdminParams, mode);
        // const userInfo = await this.getUserInfoAction();
        // const sessionTimeout = this.sessionTimeout;
        // sessionTimeout && this.setSessionTimeout(false);
        // !sessionTimeout && goHome && (await router.replace('/home/index' || PageEnum.BASE_HOME));
        // !sessionTimeout &&
        //   goHome &&
        //   (await router.replace(userInfo.homePath || PageEnum.BASE_HOME));
        console.log('adminLogin-123--', RESdATA);
        return RESdATA;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: register
     * params: RegisterParams
     */
    async register(params: RegisterParams): Promise<RegisterParams | any> {
      try {
        const regData: any = await RegisterApi(params);
        return regData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // async getUserInfoAction(): Promise<UserInfo> {
    // getUserInfoAction(userInfo) {
    //   const { roles } = userInfo;
    //   const roleList = roles.map((item) => item.value) as RoleEnum[];
    //   this.setUserInfo(userInfo);
    //   this.setRoleList(roleList);
    // },
    async getUserInfoAction(): Promise<UserInfo> {
      //promise返回值
      const list = await getUserInfo();

      console.log('UserInfoList', list);
      list.token = getToken();
      list.userId = list.userId;
      list.desc = 'manager';
      list.homePath = '/home/index';
      list.avatar = 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640';
      // const { roleList } = list[0];
      // roleList[0].value = 'super';
      // console.log('roleList----', roleList);
      // const roleLi = roleList.map((item) => item.roleCode) as RoleEnum[];
      // console.log('roleLi----', roleLi);
      this.setUserInfo(list);
      // this.setRoleList(roleLi);
      // this.getListTypeAction();
      return list;
      // 旧的login接口请求---------
      // const { list } = await getUserInfoByM(data);
      // list[0].token = getToken();
      // list[0].userId = list[0].id;
      // list[0].desc = 'manager';
      // list[0].homePath = '/home/index';
      // list[0].avatar = 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640';
      // const { roleList } = list[0];
      // // roleList[0].value = 'super';
      // console.log('roleList----', roleList);
      // const roleLi = roleList.map((item) => item.roleCode) as RoleEnum[];
      // console.log('roleLi----', roleLi);
      // this.setUserInfo(list);
      // this.setRoleList(roleLi);
      // this.getListTypeAction();
      // return list[0];
    },
    // listAllDeviceTypeByPage
    async getListTypeAction() {
      const userRequets = {
        pageIndex: 1, //第几页
        pageSize: 1000000, //页面大小
        // key: RESdATA.staffNo,
      };
      const { list } = await listAllDeviceTypeByPage(userRequets);
      console.log('--list---', list);
      const data = list.map((item) => item.subType);
      console.log('--data-routerName--', data);
      this.setRouterNameList(data);
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      try {
        await doLogout();
      } catch {
        console.log('注销Token失败');
      }
      this.setToken(undefined);
      setAuthCache(TOKEN_KEY, '');
      this.setSessionTimeout(false);
      window.localStorage.clear();
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
