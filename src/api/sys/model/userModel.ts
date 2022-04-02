/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  userName: string;
  password: string;
  // passwd: string;
  // staffNo: string;
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
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

/**
 * @description: Get user information return value
 */
export interface getUserNumByTimeParams {
  end: String;
  start: String;
}
