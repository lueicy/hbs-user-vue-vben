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
  getNetwordApi = 'deviceNetwork/getNetworkDataInfo/',
  getSharingUserApi = 'userShareDevice/listSharingUser/',
  addSharingUser = 'userShareDevice/sendSharingDevice/',
  updateRemark = '/userShareDevice/updateSharingDevice/',
  deleteSharingUser = 'userShareDevice/cancelSharingDevice/',
  getHistoryApi = 'userDevice/history/',
  getWindInfoApi = 'airVolume/listAirVolumeByPage/',
  getModelTypeApi = 'airVolume/totalAirVolume',
  getDeviceStatusApi = 'deviceStatus/',
  deleteDrviceApi = 'manage/enterprise/device/removeDevice/',
  getSubtypeApi = 'deviceType/getBySubType/',
  addSceneApi = 'sceneClock/addSceneClock',
  getListSceneApi = 'sceneClock/listSceneClock/',
  deleteSceneApi = 'sceneClock/deleteSceneClock/',
  sendCommandApi = 'device/sendCommand/',
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

/**
 * @description: 用户获取单个设备的网络信息
 * params:deviceId 设备id
 */
export function getNetworkInfo(params: any) {
  return defHttp.get({
    url: Api.getNetwordApi,
    params,
  });
}

/**
 * @description: 获取分享人信息列表
 * params:deviceId 设备id
 * status:分享状态, 0-等待接受，1-已接受，2-已拒绝, 3-已删除, 4-已失效, 不传查所有
 */
export function getSharingList(params: any) {
  return defHttp.get({
    url: Api.getSharingUserApi,
    params,
  });
}
/**
 * @description: 发起分享（添加分享人）
 * params:deviceId 设备id
 * tel:电话号码；remark:备注
 */
export function AddSharingUser(params: any) {
  return defHttp.post({
    url: Api.addSharingUser,
    params,
  });
}
/**
 * @description: 修改分享（修改备注）
 * params:sharingId 分享id
 * remark:备注
 */
export function updateRemark(params: any) {
  return defHttp.post({
    url: Api.updateRemark,
    params,
  });
}
/**
 * @description: 发起分享（添加分享人）
 * params:sharingId 分享id
 */
export function deleteSharingUser(params: any) {
  return defHttp.post({
    url: Api.deleteSharingUser,
    params,
  });
}
/**
 * @description: 获取历史记录
 * @param:deviceId 设备id， start：开始时间，end: 结束时间yyyy-MM-dd HH:mm:ss
 */
export function getHistoryInfo(params: any) {
  return defHttp.get({
    url: Api.getHistoryApi,
    params,
  });
}

/**
 * @description: 获取风量记录
 * @param:deviceId 设备id， date:月份2022-10，pageIndex：第几页；pageSize：页面大小；pattern：模式（默认为空查全部）
 */
export function getWindInfo(params: any) {
  return defHttp.get({
    url: Api.getWindInfoApi,
    params,
  });
}
/**
 * @description: 获取模式风总量
 * @param:deviceId 设备id， date:月份2022-10；pattern：模式（默认为空查全部）
 */
export function getModelType(params: any) {
  return defHttp.get({
    url: Api.getModelTypeApi,
    params,
  });
}

/**
 * @description: 获取设备单项状态数据
 * @param:deviceId 设备id， item:状态项，【 co2 | pm25_in | pm25_out 】；t：时间，d-近24小时，m-近30天
 */
export function getDeviceStatus(params: any) {
  return defHttp.get({
    url: Api.getDeviceStatusApi + params.deviceId + '/' + params.t + '/' + params.item,
  });
}

/**
 * @description: 管理员删除设备
 * params:userId 企业用户id; deviceList:删除的设备id列表
 */
export function deleteByAdmin(params: any) {
  return defHttp.post({
    url: Api.deleteDrviceApi,
    params,
  });
}

/**
 * @description: 根据型号获取模式列表风速列表
 * params:subType 设备型号;
 */
export function getBySubtype(params: any) {
  return defHttp.get({
    url: Api.getSubtypeApi + params,
  });
}

/**
 * @description: 新增设备定时数据
 * params:{
	name: 定时标签,
	open: 是否开机 00-关机 01-开机,
	ownerId: 属主ID,
	ownerType: 属主类型 00-群组 01-设备,
	pattern: 模式,
	status: 状态 00-关闭 01-开启,
	triggerTime:触发时间 如 0800,
	weekDay:周几 如周一二三：1,2,3, ,
	wind: 风速
}
 */
export function addSceneClock(params: any) {
  return defHttp.post({
    url: Api.addSceneApi,
    params,
  });
}
/**
 * @description: 获取设备定时数据
 * params:ownerId 设备id/群组id;
 */
export function getListScene(params: any) {
  return defHttp.get({
    url: Api.getListSceneApi + params,
  });
}
/**
 * @description: 删除定时模式
 * params:sceneClockId 定时模式id;
 */
export function deleteScene(params: any) {
  return defHttp.delete({
    url: Api.deleteSceneApi + params,
  });
}

/**
 * @description: 设备命令下发
 * params:command：command；deviceId：设备id device/sendCommand/{deviceId}
 */
export function sendCommand(deviceId: any, params: any) {
  return defHttp.post({
    url: Api.sendCommandApi + deviceId,
    params,
  });
}
