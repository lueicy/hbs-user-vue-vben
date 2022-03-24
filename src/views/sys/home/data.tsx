import { DescItem } from '/@/components/Description/index';

export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      title: 'Vben Admin',
      icon: 'logos:vue',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();
export const cardListSecond = (() => {
  const result: any[] = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      title: 'Vben Admin',
      icon: 'logos:vue',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();

export const refundData = {
  a1: '开机',
  a2: '智能',
  a3: '666',
  a4: '还剩10天',
  a5: '26°C',
  a6: '0.01/0.05',
  a7: '0.01%/0.05%',
  a8: '11234',
  a9: '开',
};

export const refundSchema: DescItem[] = [
  {
    field: 'a1',
    label: '开关机状态',
  },
  {
    field: 'a2',
    label: '模式状态',
  },
  {
    field: 'a3',
    label: '风速度',
  },
  {
    field: 'a4',
    label: '滤网周期',
  },
  {
    field: 'a5',
    label: '温度',
  },
  {
    field: 'a6',
    label: 'PM2.5',
  },
  {
    field: 'a7',
    label: 'CO2',
  },
  {
    field: 'a8',
    label: 'TVOC',
  },
  {
    field: 'a9',
    label: '童锁',
  },
];
