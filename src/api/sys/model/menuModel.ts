import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}
/**
 * @description: 获取验证码
 */
export interface SmsCode {
  tel?: string | any;
  sms?: string | any;
}
/**
 * @description: 添加管理员
 */
export interface addAdminParams {
  email: string;
  roleIdList: string[];
  staffNo: string;
  tel: string;
  username: string;
  id?: string;
}
/**
 * @description: 添加和修改升级信息
 */
export interface addUpgradeInfoParams {
  description: string;
  model?: string | undefined | null;
  type: Number | string;
  url: string;
  version: string;
  id?: string;
}
/**
 * @description: 添加和修改活动信息
 */
export interface AddActivityInfoParams {
  beginTime: number;
  finishTime: number;
  content: string;
  imageUrl: string;
  title: string;
  url: string;
  id?: string;
}
/**
 * @description: 上传文件
 */
export interface upLoadParams {
  file: any;
  type: any;
}
/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];

/**
 * @description: 首页 获取设备类型分布数据
 */
export interface DeviceTypeStatisticsRes {
  subType: string;
  num: any;
}
export type DeviceTypeStatisticsResList = GetDeviceAddNumRes[];

/**
 * @description: 首页 获取设备增量
 */
export interface GetDeviceAddNum {
  end: string | any;
  start: string | any;
  statisticsType: string;
}
export interface GetDeviceAddNumRes {
  date: string;
  num: any;
}
export type GetDeviceAddNumResList = GetDeviceAddNumRes[];

export interface GetUserNumByTimeType {
  end: string | any;
  start: string;
}
export interface GetStatisticsDataType {
  pageIndex: string | number; //第几页
  pageSize: string | number; //页面大小
  key?: string;
}

// 型号列表
export interface listAllDeviceTypeByPageItem {
  status: number;
  createTime: string;
  customData: string;
  deviceType: string;
  id: string;
  subType: string;
  updateTime: string;
}
export interface listAllDeviceTypeByPageParams {
  pageIndex: number;
  pageSize: number;
}
