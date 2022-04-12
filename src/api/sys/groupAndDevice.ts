// 群组和设备
import { defHttp } from '/@/utils/http/axios';
import {
  AddGroupParams,
  listUserGroupParams,
  UpdateGroupParams,
  RemoveGroupParams,
  OnOffSwitchParams,
  addDecviceParams,
  removeDeviceParams,
} from './model/groupModel';

enum Api {
  GetlistUserGroup = 'userGroup/listUserGroup', // 查询数组
  AddlistUserGroup = 'userGroup/addGroup', // 增加数组
  UpdatelistUserGroup = 'userGroup/updateGroup', // 修改数组
  RemovelistUserGroup = 'userGroup/removeGroup', // 删除数组
  GetAllDevice = 'enterprise/dashboard/listUserDevice', // 获取所有设备
  GetDeviceByGroupId = 'enterprise/dashboard/listDevice', // 获取群组设备
  OnOffSwitch = 'device/switchAll/', //开关所有设备
  SwitchByGroup = 'groupDevice/', //开关所有设备
  addDevice = 'manage/enterprise/device/addDevice', //管理员添加设备
  removeDevice = 'groupDevice/addToGroup', //添加设备到数组
  getDetail = 'deviceStatus/latest/',
  getSingleDetail = 'userDevice/getUserDevice/',
}

/**
 * @description: 获取用户所有群组
 */
export function GetlistUserGroupApi(params: listUserGroupParams) {
  return defHttp.get({
    url: Api.GetlistUserGroup,
    params,
  });
}
export function AddlistUserGroupApi(params: AddGroupParams) {
  return defHttp.post({
    url: Api.AddlistUserGroup,
    params,
  });
}
export function UpdatelistUserGroupApi(params: UpdateGroupParams) {
  return defHttp.post({
    url: Api.UpdatelistUserGroup,
    params,
  });
}
export function RemovelistUserGroupApi(params: RemoveGroupParams) {
  return defHttp.delete({
    url: Api.RemovelistUserGroup + '?userGroupId=' + params.userGroupId,
  });
}
// 获取用户所有设备
export function GetAllDeviceApi(params: listUserGroupParams) {
  return defHttp.get({
    url: Api.GetAllDevice,
    params,
  });
}
// 获取群组下的设备
export function GetDeviceByGroupIdApi(params) {
  return defHttp.get({
    url: Api.GetDeviceByGroupId,
    params,
  });
}
/**
 * @description: 开关所有设备- status-1-开/0-关
 */
export function SwitchAllOnOffApi(params) {
  return defHttp.get({
    url: Api.OnOffSwitch + params,
  });
}

/**
 * @description: 开关群组下的所有设备- status-1-开/0-关
 */
export function SwitchByGroup(params: OnOffSwitchParams) {
  return defHttp.get({
    url: Api.SwitchByGroup + params.groupId + '/' + params.status,
  });
}

/**
 * @description: 用户移动设备
 */
export function removeDevice(params: removeDeviceParams) {
  return defHttp.post({
    url: Api.removeDevice,
    params,
  });
}

/**
 * @description: 管理员添加设备
 */
export function addDeviceByAdmin(params: addDecviceParams) {
  return defHttp.post({
    url: Api.addDevice,
    params,
  });
}

/**
 * @description: 用户获取设备详情
 * params:deviceId 设备id
 */
export function getDeviceDetail(params: any) {
  return defHttp.get({
    url: Api.getDetail + params,
  });
}

/**
 * @description: 用户获取单个设备
 * params:deviceId 设备id
 */
export function getSingleDevice(params: any) {
  return defHttp.get({
    url: Api.getSingleDetail + params,
  });
}
