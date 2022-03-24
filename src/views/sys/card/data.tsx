const modeTyleList: string[] = [
  'EH-Z-7G650',
  // 'EH-Z-7G750',
  'EH-Z-7G400A',
  'EH-Z-7B200F',
  // 'EH-Z-7B200F-HET',
  // 'XS-D500A',
  'XS-D350A',
  // 'XS-D250A',
  'XS-D150A',
  // 'XS-D250A-XHK',
];

function newCearnData(): any {
  let randomDate = Math.round(Math.random() * 10);
  let n;
  if (randomDate % 2) {
    n = 0;
  } else if (randomDate % 3) {
    n = 1;
  } else if (randomDate % 4) {
    n = 2;
  } else if (randomDate % 5) {
    n = 3;
  } else {
    n = 4;
  }
  return n;
}

export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 22; i++) {
    result.push({
      id: i,
      title: 'Vben Admin',
      icon: 'logos:vue',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
      modeTyle: modeTyleList[newCearnData()],
    });
  }
  return result;
})();
