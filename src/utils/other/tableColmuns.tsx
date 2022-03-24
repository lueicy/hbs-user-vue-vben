import { BasicColumn } from '/@/components/Table';

/**
 * Callback executed when the expanded rows change
 * @param 设备信息table
 */
export const columns_Device: BasicColumn[] = [
  {
    title: '设备ID',
    dataIndex: 'deviceId',
    slots: { customRender: 'deviceId' },
    width: 190,
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    slots: { customRender: 'deviceName' },
  },

  {
    title: 'Mac地址',
    dataIndex: 'mac',
    slots: { customRender: 'mac' },
    width: 170,
  },
  {
    title: '滤网维护周期',
    dataIndex: 'meshCycle',
    slots: { customRender: 'meshCycle' },
  },

  {
    title: '运行状态',
    dataIndex: 'online',
    slots: { customRender: 'online' },
  },
  {
    title: '运行里程',
    dataIndex: 'useTime',
    slots: { customRender: 'useTime' },
  },
  {
    title: '空气质量',
    dataIndex: 'airQuality',
    slots: { customRender: 'airQuality' },
  },
  {
    title: '设备地址',
    dataIndex: 'city',
    slots: { customRender: 'city' },
  },
  {
    title: '更多',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    width: '8%',
  },
];

export const arrHeader = columns_Device.map((item) => item.title);

/**
 * Callback executed when the expanded rows change
 * @param 管理员权限信息table
 */

export const columnsAdmin = (): BasicColumn[] => {
  return [
    {
      title: '管理员工号',
      dataIndex: 'id',
      slots: { customRender: 'id' },
      width: 200,
    },
    {
      title: '管理员名字',
      dataIndex: 'name',
      // width: 260,
    },

    {
      title: '联系方式',
      dataIndex: 'phoneNum',
      slots: { customRender: 'phoneNum' },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      slots: { customRender: 'email' },
    },
    {
      title: '权限级别',
      dataIndex: 'AdminClass',
      slots: { customRender: 'AdminClass' },
    },

    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      // width: '8%',
    },
  ];
};
