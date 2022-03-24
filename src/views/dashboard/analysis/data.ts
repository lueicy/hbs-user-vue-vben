export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '设备数量',
    icon: 'gg:loadbar-doc',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '',
  },
  {
    title: '用户数量',
    icon: 'uiw:user',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '月',
  },
  {
    title: '设备异常数量',
    icon: 'fluent:error-circle-12-regular',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '周',
  },
  {
    title: '设备在线数量',
    icon: 'zmdi:time-restore',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '年',
  },
];
