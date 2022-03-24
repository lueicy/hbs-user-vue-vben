import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type DemoParams = BasicPageParams;
export interface DeviceDetialPageParams {
  subType?: string | any;
  deviceId?: string | any;
}
export interface listAllDeviceTypeByPageParams {
  pageIndex: number;
  pageSize: number;
  type?: string;
  subType?: string;
  deviceType?: string;
}
export interface DelAcIDParams {
  //删除活动信息
  key: string;
}

export interface DemoListItem {
  id: string;
  beginTime: string;
  endTime: string;
  address: string;
  name: string;
  no: number;
  status: number;
}
export interface listAllDeviceTypeByPageItem {
  status: number;
  createTime: string;
  customData: string;
  deviceType: string;
  id: string;
  subType: string;
  updateTime: string;
}

/**
 * @description: Request list return value
 */
export type DemoListGetResultModel = BasicFetchResult<DemoListItem>;
