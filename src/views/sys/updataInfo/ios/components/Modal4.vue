<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="modelTitle"
    @closeFunc='closeFunc'
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
import { BasicForm, useForm } from '/@/components/Form/index';
import { AddUpgradeInfo, EditUpgradeInfo } from '/@/api/sys/menu';
import { FormSchema } from '/@/components/Form/index';

const schemas: FormSchema[] = [
  {
    field: 'type',
    component: 'RadioGroup',
    label: '应用商店',
    required: true,
    componentProps: {
      options: [
        {
          label: 'AppStore',
          value: '0',
        },
      ],
    },
  },
  {
    field: 'model',
    component: 'Input',
    label: ' 选择应用商店',
    show: () => false,
    defaultValue: '*',
  },
  {
    field: 'url',
    component: 'Input',
    label: '商店链接',
    colProps: {
      span: 20,
    },
    componentProps: {
      placeholder: '请输入商店链接',
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

export default defineComponent({
  components: { BasicModal, BasicForm },
  setup(_, ctx) {
    const modelRef = ref({});
    const modelTitle = ref('');
    const modelID = ref('');
    const [registerForm, { validate }] = useForm({
      labelWidth: 100,
      schemas,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });

    const [register, { changeOkLoading, closeModal }] = useModalInner((data) => {
      // 方式1
      // setFieldsValue({});

      modelTitle.value = data.modelTitle;
      // 方式2
      // modelRef.value = { field2: data.data, field1: data.info };
      if (data.modelTitle == '编辑型号') {
        modelID.value = data.record.id;
        // modelID.value = data.record.publishUserId;
        modelRef.value = {
          type: data.record.type,
          model: data.record.model,
          url: data.record.url,
          version: data.record.version,
          description: data.record.description,
        };
      }
    });
    // 提交确认
    const confirm = async () => {
      const values = await validate();
      changeOkLoading(true);
      console.log('value--', values);
      if (modelTitle.value == '编辑型号') {
        values.id = modelID.value;
        console.log('编辑型号----');
        console.log('编辑型号-values---', values);
        await EditUpgradeInfo(values);
      } else {
        console.log('新增加型号----');
        await AddUpgradeInfo(values);
      }
      setTimeout(() => {
        changeOkLoading(false);
        closeModal();
        ctx.emit('seccecc');
        modelRef.value = {};
      }, 2000);
    };
    function closeFunc() {
      modelRef.value = {};
    }
    return {
      closeFunc,
      modelTitle,
      confirm,
      register,
      schemas,
      registerForm,
      model: modelRef,
    };
  },
});
</script>

