<template>
  <BasicModal v-bind="$attrs" @register="register" title="新增群组" @ok="handleOk">
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { AddlistUserGroupApi } from '/@/api/sys/groupAndDevice';
  import { useMessage } from '/@/hooks/web/useMessage';
  const schemas: FormSchema[] = [
    {
      field: 'groupName',
      component: 'Input',
      label: '群组名称',
      colProps: {
        span: 24,
      },
      defaultValue: '',
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['close'],
    setup(_, { emit }) {
      const modelRef = ref({});
      const [register] = useModalInner();
      const [registerForm, { validateFields }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const { createMessage, createErrorModal } = useMessage();

      async function handleOk() {
        const values = (await validateFields()) as any;
        const res = await AddlistUserGroupApi(values);
        if (res.code == 200) {
          createMessage.success('添加成功');
          handleClose();
        } else {
          createErrorModal({
            title: '提交失败',
            content: res.msg + res.data[0],
            // getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        }
        console.log('提交', values);
      }
      function handleClose() {
        emit('close');
      }
      return {
        register,
        schemas,
        registerForm,
        model: modelRef,
        handleOk,
        handleClose,
      };
    },
  });
</script>
<style lang="less" scoped>
  /deep/.ant-modal-body .scroll-container {
    border: none;
  }
</style>
