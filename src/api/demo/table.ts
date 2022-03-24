import { useUserStore } from '/@/store/modules/user';

import { defHttp } from '/@/utils/http/axios';
import {
  DemoParams,
  DemoListGetResultModel,
  listAllDeviceTypeByPageParams,
  listAllDeviceTypeByPageItem,
  DelAcIDParams,
  DeviceDetialPageParams,
} from './model/tableModel';
const userStore = useUserStore();

enum Api {
  DEMO_LIST = '/table/getDemoList',
  listAllDeviceTypeByPage_List = '/deviceType/listAllDeviceTypeByPage',
  listUserByPageUser = '/user/listUserByPage',
  userSuggestion = '/userSuggestion/listUserSuggestionsByPage',
  delActIdPage = '/activity/deleteActivityInfo',
  listActionInfoByPage = '/activity/listActivityInfoByPage',
  devicelistDeviceByPage = '/device/listDeviceByPage',
  GetDeviceStatusByPage = '/device/getDeviceStatusDataByDeviceId',
  GetlistUserByDeviceId = '/device/listUserByDeviceId',
  updataInfoList = '/upgrade/listUpgradeInfoByPage',
  DelUpgradeInfo = '/upgrade/deleteUpgradeInfo', //删除升级信息
  DeviceDetialNet = '/device/getDeviceNetworkInfoByDeviceId',
  DeviceDetialBasicInfo = '/device/getDeviceTypeBySubType',
  ErrorDataByDeviceId = '/device/getDeviceErrorDataByDeviceId',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.listAllDeviceTypeByPage_List,
    params,
    // headers: {
    //   ignoreCancelToken: true,
    // },
  });

/**
 * @description: 获取所有型号数据
 */

export const listAllDeviceTypeByPage = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.listAllDeviceTypeByPage_List,
    params,
  });
/**
 * @description: 获取用户列表
 */

export const listUserByPageUser = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.listUserByPageUser,
    params,
  });

/**
 * @description: 获取建议反馈列表
 */

export const listUserSuggestionsByPage = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.userSuggestion,
    params,
  });
/**
 * @description: 获取活动信息列表
 */

export const listActionInfoByPage = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.listActionInfoByPage,
    params,
  });
/**
 * @description: 删除单条活动信息
 */

export const delAcIdPage = (params: DelAcIDParams) =>
  defHttp.get({
    url: Api.delActIdPage,
    params,
  });

/**
 * @description: 获取设备管理型号-信息列表----型号 XS-D150A
 */
export const ListDeviceByPage = (params: listAllDeviceTypeByPageParams) => {
  console.log('currentRoute--api-0-', userStore.routerName);
  return defHttp.get<listAllDeviceTypeByPageItem>({
    // url: Api.devicelistDeviceByPage + '?deviceType=01&subType=XS-D150A',
    url: Api.devicelistDeviceByPage + `?deviceType=01&subType=${userStore.routerName}`,
    // url: Api.devicelistDeviceByPage,
    params,
  });
};

// export function ListDeviceByPage(params: listAllDeviceTypeByPageParams) {
//   console.log('userStore--354354-',userStore.routerName)
//   return defHttp.get<listAllDeviceTypeByPageItem>({
//     url: Api.devicelistDeviceByPage + '?deviceType=01&subType=XS-D150A',
//     // url: Api.devicelistDeviceByPage + `?deviceType=01&subType=${n}`,
//     // url: Api.devicelistDeviceByPage,
//     params,
//   });
// }
/**
 * @description: 获取设备升级信息列表
 */
export const updataInfoList = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.updataInfoList,
    params,
  });
/**
 * @description: 获取设备升级信息列表---android
 */
export const androidInfoList = (params: listAllDeviceTypeByPageParams) => {
  params.type = '1';
  return defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.updataInfoList,
    params,
  });
};
/**
 * @description: 获取设备升级信息列表---ios
 */
export const iosInfoList = (params: listAllDeviceTypeByPageParams) => {
  params.type = '0';
  return defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.updataInfoList,
    params,
  });
};
/**
 * @description: 获取设备升级信息列表---mcu
 */
export const mcuInfoList = (params: listAllDeviceTypeByPageParams) => {
  params.type = '2';
  return defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.updataInfoList,
    params,
  });
};
/**
 * @description: 获取设备升级信息列表---wifi
 */
export const wifiInfoList = (params: listAllDeviceTypeByPageParams) => {
  params.type = '3';
  return defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.updataInfoList,
    params,
  });
};
/**
 * @description: 删除设备升级信息
 */
export const DeleteUpgradeInfo = (params: DelAcIDParams) =>
  defHttp.get({
    url: Api.DelUpgradeInfo,
    params,
  });
/**
 * @description: 获取设备详情页--获取设备网络信息
 */
export const DeviceDetialNetWork = (params: DeviceDetialPageParams) =>
  defHttp.get<any>({
    url: Api.DeviceDetialNet,
    params,
  });
/**
 * @description: 获取设备详情页--获取设备基本信息
 */
export const DeviceDetialInfo = (params: DeviceDetialPageParams) =>
  defHttp.get<any>({
    url: Api.DeviceDetialBasicInfo,
    params,
  });
/**
 * @description: 获取设备详情页--获取设备基本状态
 */
export const GetDeviceStatusByPage = (params: DeviceDetialPageParams) =>
  defHttp.get<any>({
    url: Api.GetDeviceStatusByPage,
    params,
  });
/**
 * @description: 获取设备详情页--获取设备的用户列表
 */
export const GetlistUserByDeviceId = (params: DeviceDetialPageParams) =>
  defHttp.get<any>({
    url: Api.GetlistUserByDeviceId,
    params,
  });
/**
 * @description: 获取设备详情页--获取设备的用户列表
 */
export const GetErrorDataByDeviceId = (params: DeviceDetialPageParams) =>
  defHttp.get<any>({
    url: Api.ErrorDataByDeviceId,
    params,
  });
