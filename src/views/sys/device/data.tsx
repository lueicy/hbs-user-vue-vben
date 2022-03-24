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
const modeList: string[] = [
  '智能模式',
  '新风模式',
  '净化模式',
  '排风模式',
  '除味模式',
  '节能模式',
  '除湿模式',
  '新风+除湿模式',
  '除霜模式（自动）',
  '辅热模式（自动）',
  '除湿模式（自动）',
];
const tovcList: string[] = ['优', '良', '差'];
const windList: string[] = ['低速', '中速', '优速'];
// let chageHours = (time) => parseInt(Number(time) / 60) + '小时';
let chageDays = (time) => parseInt(parseInt(180 - Number(time) / 60 / 24) / 30);

export const deviceTypeList: string[] = ['新风机', '空气净化器', '加湿器'];

const colorList: string[] = [
  '#4880FF',
  '#00b9d7',
  '#FAA824',
  '#FF326E',
  '#7A41F2',
  '#ff5f59',
  '#ffc400',
  '#0079ed',
  '#37586d',
  '#cc5364',
];

const element = (title, color) => {
  return (
    <div>
      <span
        style={{
          width: '10px',
          height: '10px',
          background: color,
          display: 'inline-block',
          marginRight: '3px',
          borderRadius: '50%',
        }}
      ></span>
      <span>{title}</span>
    </div>
  );
};
const elementCO2 = (color) => {
  return (
    <div>
      <span
        style={{
          width: '10px',
          height: '10px',
          background: color,
          display: 'inline-block',
          marginRight: '3px',
          borderRadius: '50%',
        }}
      ></span>
      <span>CO</span>
      <span
        style={{
          fontSize: '8px',
        }}
      >
        2
      </span>
    </div>
  );
};
const chageHoursDay = (time): string => {
  let d: string = '';
  if (parseInt(Number(time) / 60) > 24) {
    d = parseInt(Number(time) / 60 / 60 / 24) + '天';
  } else {
    d = parseInt(Number(time) / 60) + '小时';
  }
  return d;
};
export const refundSchema: DescItem[] = [
  {
    field: 'id',
    label: '设备主键',
    show: () => false,
  },
  {
    field: 'deviceId',
    label: '设备id',
    show: () => false,
  },
  {
    field: 'open',
    label: element('开关机状态', colorList[0]),
    render: (val) => (Number(val) ? '开机' : '关机'),
  },
  {
    field: 'pattern',
    label: element('模式', colorList[1]),
    render: (val) => modeList[Number(val) - 1],
  },
  {
    field: 'wind',
    label: element('风速', colorList[2]),
    render: (val) => windList[Number(val) - 1],
  },
  {
    field: 'meshCycle',
    label: element('滤网维护', colorList[3]),
    render: (val) => (chageDays(val) ? '剩余' + chageDays(val) + '月' : '请及时更换滤网'),
  },
  {
    field: 'temperature',
    label: element('温度', colorList[4]),
    render: (val) => parseInt(val) + ' ℃',
    show: () => false,
  },
  {
    field: 'pm25',
    label: element('PM2.5', colorList[5]),
    render: (val) => val + 'μg/m3',
  },
  {
    field: 'co2',
    // label: element('CO2', colorList[6]),
    label: elementCO2(colorList[6]),
    render: (val) => val + 'PPM',
  },
  {
    field: 'tvoc',
    label: element('TVOC状态', colorList[7]),
    render: (val) => tovcList[Number(val) - 1],
  },
  {
    field: 'childLock',
    label: element('童锁', colorList[8]),
    render: (val) => (Number(val) ? '开锁' : '关锁'),
  },
  {
    field: 'useTime',
    label: element('设备里程', colorList[9]),
    render: (val) => chageHoursDay(val),
  },
  {
    field: 'updateTime',
    label: element('设备最后一次更新时间', colorList[0]),
  },
  {
    field: 'createTime',
    label: element('设备激活时间', colorList[1]),
    show: () => false,
  },
  {
    field: 'humidity',
    label: element('湿度', colorList[2]),
    render: (val) => val + '%',
    show: () => false,
  },
];
export const netWorkStatusSchema: DescItem[] = [
  {
    field: 'deviceId',
    label: element('设备ID', colorList[7]),
  },
  {
    field: 'bssid',
    label: element('bssid', colorList[1]),
  },
  {
    field: 'btMac',
    label: element('btMac', colorList[2]),
  },
  {
    field: 'channel',
    label: element('channel', colorList[3]),
  },
  {
    field: 'wifiMac',
    label: element('WiFi的MAC地址', colorList[4]),
  },
  {
    field: 'binVersion',
    label: element('binVersion', colorList[5]),
  },
  {
    field: 'routerIp',
    label: element('路由器IP', colorList[9]),
  },
  {
    field: 'ssid',
    label: element('路由器名称', colorList[6]),
  },
  {
    field: 'passwd',
    label: element('路由器密码', colorList[0]),
  },
  {
    field: 'rssi',
    label: element('WiFi信号强度', colorList[9]),
  },
];
