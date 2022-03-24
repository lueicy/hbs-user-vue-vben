export interface ModeListType {
  label: String;
  value: String;
}
export interface windListType {
  name: String;
  speed: String;
}
export interface dataItemType {
  name: String;
  mode: String;
  windArray:windListType[]
}
export const modeList = (): ModeListType[] => {
  return [
    {
      label: '智能',
      value: '01',
    },
    {
      label: '新风',
      value: '02',
    },
    {
      label: '净化',
      value: '03',
    },
    {
      label: '送风',
      value: '04',
    },
    {
      label: '排风',
      value: '05',
    },
    {
      label: '除霜',
      value: '06',
    },
    {
      label: '除味',
      value: '07',
    },
    {
      label: '除湿',
      value: '08',
    },
    {
      label: '辅热',
      value: '09',
    },
    {
      label: '新风+除湿',
      value: '10',
    },
  ];
};
export const fanList = (): ModeListType[] => {
  return [
    {
      label: '一级',
      value: '01',
    },
    {
      label: '二级',
      value: '02',
    },
    {
      label: '三级',
      value: '03',
    },
  ];
};
export const windList = (): windListType[] => {
  return [
    {
      name: '弱',
      speed: '01',
    },
    {
      name: '中',
      speed: '02',
    },
    {
      name: '强',
      speed: '03',
    },
  ];
};
