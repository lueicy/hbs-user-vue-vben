<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="modelTitle"
    @ok='confirm'
    @closeFunc='closeFunc'
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
import { schemas } from '/@/utils/other/FormSchema';

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
      // resetFields();
      // 方式1
      // setFieldsValue({});

      modelTitle.value = data.modelTitle;
      // 方式2
      // modelRef.value = { field2: data.data, field1: data.info };
      if (data.modelTitle == '编辑型号') {
        // modelID.value = data.record.publishUserId;
        modelID.value = data.record.id;
        modelRef.value = {
          type: data.record.type,
          model: data.record.model,
          url: data.record.url,
          version: data.record.version,
          description: data.record.description,
        };
      }
      // }
    });
    // 提交确认
    const confirm = async () => {
      const values = await validate();
      changeOkLoading(true);
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

