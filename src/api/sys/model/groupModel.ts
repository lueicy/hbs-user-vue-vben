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
