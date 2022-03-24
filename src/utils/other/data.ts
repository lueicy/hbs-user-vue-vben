/**
 * @description: UTC时间转化为本地时区时间（UTC时间格式一般为 "2017-11-16T05:23:20.000Z"）；
 */
export const convertUTCTimeToLocalTime = (UTCDateString: string): string => {
  if (!UTCDateString) {
    return '-';
  }
  function formatFunc(str) {
    //格式化显示
    return str > 9 ? str : '0' + str;
  }
  let date2 = new Date(UTCDateString); //这步是关键
  let year = date2.getFullYear();
  let mon = formatFunc(date2.getMonth() + 1);
  let day = formatFunc(date2.getDate());
  // let hour = date2.getHours();
  let utcDataHour = UTCDateString.substring(11, 13);
  let utcDataMin = UTCDateString.substring(14, 16);

  // let  noon = hour >= 12 ? 'PM' : 'AM';
  // hour = hour >= 12 ? hour - 12 : hour;
  // hour = formatFunc(hour);
  // let min = formatFunc(date2.getMinutes());
  // let  dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min;
  let dateStr = year + '/' + mon + '/' + day + ' ' + utcDataHour + ':' + utcDataMin;
  return dateStr;
};
// console.log(convertUTCTimeToLocalTime("2017-11-16T05:23:20.000Z"));    //2017-11-16 PM 01:23
export const timestampToTime = (timestamp: number): string => {
  // let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m = date.getMinutes() + ':';
  const s = date.getSeconds();
  return Y + M + D + h + m + s;
};

interface airQuetity {
  name: string;
  color: string;
}

export const airQuity = (i: any): airQuetity => {
  let n = {
    name: '',
    color: '',
  };
  if (i % 2 == 0) {
    n.name = '正在除霜';
    n.color = '#FD964B ';
  } else if (i % 3 == 0) {
    n.name = '空气污浊';
    n.color = '#FF5F59';
  } else {
    n.name = '空气良好';
    n.color = '#FFC400';
  }
  return n;
};
export const modeTypeList = [
  [
    //600
    {
      name: '智能',
      num: 1,
    },
    {
      name: '新风',
      num: 2,
    },
    {
      name: '送风',
      num: 3,
    },
    {
      name: '节能',
      num: 4,
    },
    {
      name: '除味',
      num: 5,
    },
  ],
  [
    //400
    {
      name: '智能',
      num: 1,
    },
    {
      name: '新风',
      num: 2,
    },
    {
      name: '送风',
      num: 3,
    },
    {
      name: '节能',
      num: 4,
    },
    {
      name: '除味',
      num: 5,
    },
  ],
  [
    //350
    {
      name: '智能',
      num: 1,
    },
    {
      name: '新风',
      num: 2,
    },
    {
      name: '送风',
      num: 3,
    },
    {
      name: '排风',
      num: 4,
    },
  ],
  [
    {
      name: '智能',
      num: 1,
    },
    {
      name: '新风',
      num: 2,
    },
    {
      name: '净化',
      num: 3,
    },
  ],
  [
    {
      name: '智能',
      num: 1,
    },
    {
      name: '新风',
      num: 2,
    },
    {
      name: '送风',
      num: 3,
    },
    {
      name: '排风',
      num: 4,
    },
  ],
];
