import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginAdminParams,
  LoginResultModel,
  RegisterParams,
  GetSms,
} from './model/userModel';
import {
  listAllDeviceTypeByPageParams,
  listAllDeviceTypeByPageItem,
} from '../demo/model/tableModel';
import { GetStatisticsDataType } from './model/menuModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Loginm = 'manage/admin/login',
  Login = 'enterprise/user/login',
  Logout = 'manage/admin/logout',
  GetUserInfo = 'user/getUserById',
  GetUserInfoByM = 'manage/admin/listAdminByPage',
  GetPermCode = 'manage/getPermCode',
  listAllDeviceTypeByPage_List = 'manage/deviceType/listAllDeviceTypeByPage',
  RegisterApi = 'enterprise/user/register',
  GetSmsApi = '/enterprise/user/sendSms',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}
/**
 * @description: Admin login api
 */
export function loginByAdmin(params: LoginAdminParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Loginm,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: user register api
 */
export function RegisterApi(params: RegisterParams) {
  return defHttp.post({
    url: Api.RegisterApi,
    params,
  });
}

/**
 * @description: user register api
 */
export function GetSmsApi(params: GetSms, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LoginResultModel>(
    {
      url: Api.GetSmsApi,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfoByM(params: GetStatisticsDataType) {
  // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo,params });
  return defHttp.get({ url: Api.GetUserInfoByM, params });
}
export const getUserInfo = () => defHttp.get({ url: Api.GetUserInfo });

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
/**
 * @description: 获取所有型号数据
 */

export const listAllDeviceTypeByPage = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.listAllDeviceTypeByPage_List,
    params,
  });
