<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="modelTitle"
    @ok='confirm'
  >
    <BasicForm
      @register="registerForm"
      :model="model"
    />

  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { AddUpgradeInfo, EditUpgradeInfo, listAllDeviceTypeByPage } from '/@/api/sys/menu';
// import { schemas } from '/@/utils/other/FormSchema';
import { FormSchema } from '/@/components/Form/index';

interface itemType {
  label: string;
  value: string;
}
interface ListData {
  modelLIst: itemType[];
}
export default defineComponent({
  components: { BasicModal, BasicForm },
  setup(_, ctx) {
    const state = reactive<ListData>({
      modelLIst: [],
    });
    const schemas: FormSchema[] = [
      {
        field: 'type',
        component: 'Input',
        label: '选择应用商店',
        // required: true,
        defaultValue: 3,
        show: () => false,
      },
      {
        required: true,
        field: 'model',
        // component: 'Select',
        component: 'Select',
        label: '型号',
        // slot: 'sleleMode',
        componentProps: {
          placeholder: '选择型号',
          options: state.modelLIst,
        },
        colProps: {
          span: 20,
        },
      },
      {
        field: 'url',
        component: 'Input',
        label: '下载链接',
        componentProps: {
          placeholder: '请输入下载链接',
        },
        colProps: {
          span: 20,
        },
        required: true,
      },
      {
        field: 'version',
        component: 'Input',
        label: '版本号',
        componentProps: {
          placeholder: '请输入版本号',
        },
        colProps: {
          span: 20,
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
      },
    ];
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
      size: 'large',
    });

    const [register, { changeOkLoading, closeModal }] = useModalInner((data) => {
      getData();
      // resetFields();
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
      if (modelTitle.value == '编辑型号') {
        values.id = modelID.value;
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
    async function getData() {
      const { list } = await listAllDeviceTypeByPage({ pageIndex: 1, pageSize: 100000 });
      list.forEach((e) => {
        let item = {
          label: e.subType,
          value: e.subType,
        };
        state.modelLIst.push(item);
      });
      state.modelLIst.push({
        label: '其他',
        value: '*',
      });
    }

    return {
      ...toRefs(state),
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

