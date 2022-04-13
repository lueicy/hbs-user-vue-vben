<template>
  <BasicModal v-bind="$attrs" @register="register" title="添加分享人" @ok="handleAdd">
    <div class="pt-3px pr-3px">
      <BasicForm @register="addShareForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { AddSharingUser } from '/@/api/sys/groupAndDevice';
  const schemas: FormSchema[] = [
    {
      field: 'remark',
      component: 'Input',
      label: '分享人名称',
      colProps: {
        span: 24,
      },
      defaultValue: '',
    },
    {
      field: 'tel',
      component: 'Input',
      label: '分享人账号',
      colProps: {
        span: 24,
      },
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
      deviceId: { type: String },
    },
    setup(props) {
      const modelRef = ref({});
      const [addShareForm, { validateFields }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { error, success } = createMessage;

      const [register, { closeModal }] = useModalInner();

      async function handleAdd() {
        const values = (await validateFields()) as any;
        if (!values.remark || !values.tel) return error('请输入分享人名称和账号');
        try {
          const userInfo = await AddSharingUser(
            toRaw({
              deviceId: props.deviceId,
              remark: values.remark,
              tel: values.tel,
              mode: 'none', //不要默认的错误提示
            })
          );
          if (userInfo) {
            success('添加成功');
            closeModal();
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }

      return { register, schemas, addShareForm, model: modelRef, handleAdd };
    },
  });
</script>
<style lang="less" scoped>
  /deep/.ant-modal-body .scroll-container {
    border: none;
  }
</style>
