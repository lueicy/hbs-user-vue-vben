interface ModeListType {
  label: String;
  value: String;
}
export const modeList = (): ModeListType[] => {
  return [
    {
      label: '智能',
      value: '1',
    },
    {
      label: '新风',
      value: '2',
    },
    {
      label: '净化',
      value: '3',
    },
    {
      label: '送风',
      value: '4',
    },
    {
      label: '排风',
      value: '5',
    },
    {
      label: '除霜',
      value: '6',
    },
    {
      label: '除味',
      value: '7',
    },
    {
      label: '除湿',
      value: '8',
    },
    {
      label: '辅热',
      value: '9',
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
      value: '1',
    },
    {
      label: '二级',
      value: '2',
    },
    {
      label: '三级',
      value: '3',
    },
  ];
};
