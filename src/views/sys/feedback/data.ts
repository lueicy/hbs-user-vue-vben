import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '问题类型',
    componentProps: {
      placeholder: '请输入问题类型',
    },
    required: true,
  },
  {
    field: 'title',
    component: 'Input',
    label: '问题设备标题',
    componentProps: {
      placeholder: '请选择问题设备',
    },
    required: true,
  },
  {
    field: 'target',
    component: 'InputTextArea',
    label: '问题描述',
    componentProps: {
      placeholder: '请描述您遇到的问题',
      rows: 4,
    },
    required: true,
  },
  {
    field: 'metrics',
    component: 'InputTextArea',
    label: '衡量标准',
    componentProps: {
      placeholder: '请输入衡量标准',
      rows: 4,
    },
    show: () => false,
    required: true,
  },

  {
    show: () => false,
    field: 'disclosure',
    component: 'RadioGroup',
    label: '目标公开',
    itemProps: {
      extra: '客户、邀评人默认被分享',
    },
    componentProps: {
      options: [
        {
          label: '公开',
          value: '1',
        },
        {
          label: '部分公开',
          value: '2',
        },
        {
          label: '不公开',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'disclosurer',
    component: 'Select',
    label: ' ',
    // show: ({ model }) => {
    //   return model.disclosure === '2';
    // },
    show: () => false,
    componentProps: {
      placeholder: '公开给',
      mode: 'multiple',
      options: [
        {
          label: '同事1',
          value: '1',
        },
        {
          label: '同事2',
          value: '2',
        },
        {
          label: '同事3',
          value: '3',
        },
      ],
    },
  },
];
