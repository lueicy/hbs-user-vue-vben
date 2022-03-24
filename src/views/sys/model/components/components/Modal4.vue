<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="添加型号"
    @ok='confirm'
  >
    <BasicForm
      @register="registerForm"
      :model="model"
    />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { modeList, fanList, windList,windListType,dataItemType } from './modeList';
import { uploadApi } from '/@/api/sys/upload';

const schemas: FormSchema[] = [
  {
    field: 'deviceType',
    component: 'Select',
    label: '产品类型',
    colProps: {
      span: 20,
    },
    componentProps: {
      options: [
        {
          label: '新风机',
          value: '01',
          key: '1',
        },
        // {
        //   label: 'bbc',
        //   value: '2',
        //   key: '2',
        // },
      ],
    },
  },
  {
    field: 'subType',
    component: 'Input',
    label: '设备型号',
    colProps: {
      span: 20,
    },
    defaultValue: '111',
  },
  {
    field: 'iconUrl',
    component: 'Upload',
    label: '设备图片',
    colProps: {
      span: 20,
    },
    componentProps: {
      api: uploadApi,
    },
  },
  {
    field: 'devMode',
    component: 'CheckboxGroup',
    label: '设备模式',
    colProps: {
      span: 100,
    },
    componentProps: {
      options: modeList(),
    },
  },
  {
    field: 'devWind',
    component: 'CheckboxGroup',
    label: '设备风速',
    colProps: {
      span: 100,
    },
    componentProps: {
      options: fanList(),
    },
  },
];
export default defineComponent({
  components: { BasicModal, BasicForm },
  setup() {
    const modelRef = ref({});
    // const modelRef: any = {};
    const [
      registerForm,
      {
        // setFieldsValue,
        // setProps
        validate,
      },
    ] = useForm({
      labelWidth: 100,
      schemas,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });

    const [register, { changeOkLoading, closeModal }] = useModalInner((data) => {
      // 方式1
      // setFieldsValue({
      //   field2: data.data,
      //   field1: data.info,
      // });

      // 方式2
      modelRef.value = { field2: data.data, field1: data.info };
      // modelRef.value = data.data
      console.log('modelRef--00--', modelRef);

      // setProps({
      //   model:{ field2: data.data, field1: data.info }
      // })
    });
    // 提交确认
    const confirm = async () => {
      const values = await validate();

      console.log('confirm---', values);
      // console.log('confirm-devMode--', values.devMode);
      // console.log('confirm-devWind--', values.devWind);
      let devModeArr: string[] = Object.values(values.devMode);
      // 模式
      let windArr: string[] = Object.values(values.devWind);
      let modeArr: dataItemType[] = [];
      let windArray: windListType[] = [];

      windArr.forEach((e) => {
        windList().forEach((i) => {
          if (e == i.speed) {
            windArray.push(i);
          }
        });
      });

      devModeArr.forEach((e) => {
        modeList().forEach((item) => {
          if (e == item.value) {
            // console.log('item---', item);
            let data:dataItemType={
              mode:item.value,
              name:item.label,
              windArray
            }
            modeArr.push(data);
          }
        });
      });
      changeOkLoading(true);
      setTimeout(() => {
        changeOkLoading(false);
        closeModal();
      }, 2000);
    };
    return { confirm, register, schemas, registerForm, model: modelRef };
  },
});
</script>
