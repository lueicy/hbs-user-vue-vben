/**
 * @description: user Login interface parameters
 */
export interface LoginParams {
  userName: string;
  password: string;
  // passwd: string;
  // staffNo: string;
}
/**
 * @description: admin Login interface parameters
 */
export interface LoginAdminParams {
  passwd: string;
  staffNo: string;
}

export interface LoginParamsGetRole {
  key: string;
}

export interface RegisterParams {
  address: string;
  adm1: string;
  adm2: string;
  adm3: string;
  businessLicenseUrl: string;
  enterpriseCode: string;
  enterpriseName: string;
  legalIdCardBackUrl: string;
  legalIdCardFrontUrl: string;
  smsCode: string;
  tel: string;
}
export interface GetSms {
  tel: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // roles: RoleInfo[];
  // userId: string | number; // 用户id
  // username: string; // 用户名
  // realName: string; // 真实名字
  // avatar: string; // 头像
  // desc?: string; // 介绍

  address?: string; // 介绍
  id: string | number; // 用户id
  nickname: string; // 昵称
  tel: string; // 电话
  type: string; // 分类，0-普通用户， 1-企业用户
  username: string; // 用户名
}

/**
 * @description: Get user information return value
 */
export interface getUserNumByTimeParams {
  end: String;
  start: String;
}
