import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/#/axios';

import {
  getMenuListResultModel,
  // GetUserNumByTimeType,
  GetDeviceAddNum,
  listAllDeviceTypeByPageItem,
  listAllDeviceTypeByPageParams,
  GetDeviceAddNumResList,
  DeviceTypeStatisticsResList,
  upLoadParams,
  AddActivityInfoParams,
  addUpgradeInfoParams,
  addAdminParams,
  SmsCode,
} from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetUserNumByTime = '/dashboard/listActiveUserCount', //获取用户活跃情况
  GetDeviceAddNum = '/dashboard/getDeviceCountByDateAndStatisticsType', //获取设备增量情况
  GetUserAddNum = '/dashboard/getUserCountByDateAndStatisticsType', //获取用户增量情况
  GetDeviceTypeStatisticsData = '/dashboard/listDeviceTypeStatisticsData', //获取设备类型分布数据
  GetStatisticsData = '/dashboard/getStatisticsData',
  listAllDeviceTypeByPage_List = '/deviceType/listAllDeviceTypeByPage',
  AddActivityInfo = '/activity/addActivityInfo', //添加活动信息
  EditActivityInfo = '/activity/updateActivityInfo', //编辑活动信息
  AddUpgradeInfo = '/upgrade/addUpgradeInfo', //添加升级信息
  EditUpgradeInfo = '/upgrade/updateUpgradeInfo', //修改升级信息
  GetAllRoles = '/role/getAllRoles', //获取角色列表
  AddAdminRoles = '/admin/addAdmin', //添加管理员
  DeleteAdminRoles = '/admin/deleteAdmin', //删除管理员
  UpdateAdminRoles = '/admin/updateAdmin', //更新管理员
  GetSendSms = '/admin/sendSms', //获取手机验证码
  ResetPassword = '/admin/resetPassword', //重置密码
  FileUpload = '/v1/file/upload', //文件上传
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });

/**
 * @description: 首页 获取统计数据
 */
// export const getStatisticsData = (params: GetStatisticsDataType) => {
// export const getStatisticsData = () => {
//   // return defHttp.get({ url: Api.GetStatisticsData, params });
//   return defHttp.get({ url: Api.GetStatisticsData });
// };

export const getStatisticsData = () => defHttp.get({ url: Api.GetStatisticsData });

export const listAllDeviceTypeByPage = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get<listAllDeviceTypeByPageItem>({
    url: Api.listAllDeviceTypeByPage_List,
    params,
  });
export const listAllDeviceTypeByPageRouter = (params: listAllDeviceTypeByPageParams) =>
  defHttp.get({
    url: Api.listAllDeviceTypeByPage_List,
    params,
  });

/**
 * @description: 首页 获取设备增量
 */

export const GetDeviceAddNumList = (params: GetDeviceAddNum) =>
  defHttp.get<GetDeviceAddNumResList>({ url: Api.GetDeviceAddNum, params });

/**
 * @description: 首页 获取用户增量
 */
export const GetUserAddNumList = (params: GetDeviceAddNum) =>
  defHttp.get<GetDeviceAddNumResList>({ url: Api.GetUserAddNum, params });

/**
 * @description: 首页 获取设备类型分布数据
 */
export const GetDeviceTypeStatisticsData_List = () =>
  defHttp.get<DeviceTypeStatisticsResList>({ url: Api.GetDeviceTypeStatisticsData });

/**
 * @description:首页 获取用户活跃情况
 */
export const getUserNumByTime = (params: GetDeviceAddNum) =>
  defHttp.get<GetDeviceAddNumResList>({ url: Api.GetUserNumByTime, params });

export function upLoadApi(params: upLoadParams) {
  return defHttp.post({
    url: Api.FileUpload,
    params,
  });
}
// 新增活动信息
export const AddActivityInfo = (params: AddActivityInfoParams) => {
  return defHttp.post({
    url: Api.AddActivityInfo,
    params,
  });
};
// 编辑活动信息
export const EditActivityInfo = (params: AddActivityInfoParams) => {
  return defHttp.post({
    url: Api.EditActivityInfo,
    params,
  });
};
// 新增升级信息
export const AddUpgradeInfo = (params: addUpgradeInfoParams) => {
  return defHttp.post({
    url: Api.AddUpgradeInfo,
    params,
  });
};
// 修改升级信息
export const EditUpgradeInfo = (params: addUpgradeInfoParams) => {
  return defHttp.post({
    url: Api.EditUpgradeInfo,
    params,
  });
};
// 获取角色列表
export const GetAllRoles = () =>
  defHttp.get({
    url: Api.GetAllRoles,
  });

// 添加管理员
export const AddAdminRoles = (params: addAdminParams) => {
  return defHttp.post({
    url: Api.AddAdminRoles,
    params,
  });
};
// 更新管理员
export const UpdateAdminRoles = (params: addAdminParams) => {
  return defHttp.post({
    url: Api.UpdateAdminRoles,
    params,
  });
};
// 删除管理员
export const DeleteAdminRoles = (params) =>
  defHttp.get({
    url: Api.DeleteAdminRoles,
    params,
  });
// 获取短信验证码
export const GetSmsCode = (params:SmsCode) =>
  defHttp.get({
    url: Api.GetSendSms,
    params,
  });
// 重置用户密码
export const ResetPwd = (params:SmsCode) =>
  defHttp.get({
    url: Api.ResetPassword,
    params,
  });
