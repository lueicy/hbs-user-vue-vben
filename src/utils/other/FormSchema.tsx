import { FormSchema } from '/@/components/Form/index';

// 升级信息
export const schemas: FormSchema[] = [
  {
    field: 'type',
    component: 'RadioGroup',
    label: '应用商店',
    required: true,
    componentProps: {
      options: [
        // {
        //   label: 'ios',
        //   value: '0',
        // },
        {
          label: 'Android',
          value: '1',
        },
      ],
    },
  },
  {
    field: 'model',
    component: 'Select',
    label: '商店链接',
    show: ({ model }) => {
      return model.type === '1';
    },
    componentProps: {
      placeholder: '请选择应用商店',
      options: [
        {
          label: 'vivo',
          value: 'vivo',
        },
        {
          label: 'huawei',
          value: 'huawei',
        },
        {
          label: 'xiaomi',
          value: 'xiaomi',
        },
        {
          label: 'oppo',
          value: 'oppo',
        },
        {
          label: '其他',
          value: '*',
        },
      ],
    },
  },
  {
    field: 'url',
    component: 'Input',
    label: '商店链接',
    colProps: {
      span: 20,
    },
    componentProps: {
      placeholder: '请输入升级描述',
    },
    // defaultValue: 'http://www.bri.com.cn',
    required: true,
  },
  {
    field: 'version',
    component: 'Input',
    label: '版本号',
    colProps: {
      span: 20,
    },
    componentProps: {
      placeholder: '请输入版本号',
    },
    // defaultValue: '1.0',
    required: true,
  },
  {
    field: 'description',
    // component: 'Input',
    component: 'InputTextArea',
    label: '升级描述',
    componentProps: {
      placeholder: '请输入升级描述',
    },
    colProps: {
      span: 20,
    },
    required: true,
    // defaultValue: 'hahaha啊哈哈哈',
  },
];
