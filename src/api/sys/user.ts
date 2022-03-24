import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  // GetUserInfoModel,
  // getUserNumByTimeParams,
} from './model/userModel';
import {
  listAllDeviceTypeByPageParams,
  listAllDeviceTypeByPageItem,
} from '../demo/model/tableModel';
import { GetStatisticsDataType } from './model/menuModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/admin/login',
  Logout = '/admin/logout',
  // GetUserInfo = '/getUserInfo',
  GetUserInfo = '/admin/listAdminByPage',
  GetPermCode = '/getPermCode',
  listAllDeviceTypeByPage_List = '/deviceType/listAllDeviceTypeByPage',
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
 * @description: getUserInfo
 */
// export function getUserInfo(params: GetStatisticsDataType) {
//   // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo,params });
//   return defHttp.get({ url: Api.GetUserInfo, params });
// }
export const getUserInfo = (params: GetStatisticsDataType) =>
  defHttp.get({ url: Api.GetUserInfo, params });

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
