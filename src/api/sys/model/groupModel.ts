export interface listUserGroup {
  deviceCount: number;
  errorCount: number;
  groupId: string;
  groupName: string;
  onlineCount: number;
  sort: number;
}
export interface listUserGroupParams {
  pageIndex: number;
  pageSize: number;
  key?: string;
}
export interface AddGroupParams {
  groupName: string;
}
export interface UpdateGroupParams {
  groupName: string;
  id: string; // 用户群组主键
  sort: number;
}
export interface RemoveGroupParams {
  userGroupId: string; // 用户群组主键
}
export interface OnOffSwitchParams {
  groupId: string; //群组id
  status: string; // 1-开/0-关
}
export interface addDecviceParams {
  deviceList: any; //设备id列表
  userId: string; // 管理员ID
}
export interface removeDeviceParams {
  deviceId?: string;
  deviceIdList: any; //设备id列表
  groupId: string; // 管理员ID
}
// 获取风量数据
export interface getWindParams {
  data: string;
  deviceId: string;
  pageSize: number;
  pageIndex: number;
  pattern?: string;
}
