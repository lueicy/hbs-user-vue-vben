<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="移除设备"
    :maskClosable="false"
    @visible-change="handleVisibleChange"
    @ok="handleLogin"
    @cancel="cancelAdmin"
  >
    <div class="admin-title">请输入管理员账号</div>
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, toRaw, toRefs, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  import { deleteByAdmin } from '/@/api/sys/groupAndDevice';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRedo } from '/@/hooks/web/usePage';
  const logSchemas: FormSchema[] = [
    {
      field: 'userName',
      component: 'Input',
      label: '管理员账号',
      colProps: {
        span: 24,
      },
      defaultValue: '',
    },
    {
      field: 'password',
      component: 'Input',
      label: '管理员密码',
      colProps: {
        span: 24,
      },
    },
  ];

  interface stateType {
    selectList: any[];
    userId: any;
  }
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      deviceId: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const state: stateType = reactive({
        selectList: [],
        userId: '',
      });
      const userStore = useUserStoreWithOut();
      const [registerForm, { validateFields }] = useForm({
        labelWidth: 120,
        schemas: logSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const redo = useRedo();

      const [register] = useModalInner();
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { error, success } = createMessage;
      // 确认登录，登录后删除该设备
      async function handleLogin() {
        const values = (await validateFields()) as any;
        if (!values.userName || !values.password) return error('请输入账号密码');
        userStore.setAdminLogStatus(true); //请求失败后改为false
        try {
          const userInfo = await userStore.loginAdmin(
            toRaw({
              passwd: values.password,
              staffNo: values.userName,
              mode: 'none', //不要默认的错误提示
            })
          );
          if (userInfo) {
            state.userId = userInfo.id;
            let param = {
              deviceList: state.selectList.push(props.deviceId),
              userId: state.userId,
            };
            let deleteRes = await deleteByAdmin(param);
            if (deleteRes) {
              userStore.setAdminLogStatus(false);
              success('移除成功');
              redo();
            }
          }
        } catch (error: any) {
          userStore.setAdminLogStatus(false);
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      function cancelAdmin() {
        userStore.setAdminLogStatus(false);
      }

      function handleVisibleChange() {}

      return {
        register,
        registerForm,
        handleVisibleChange,
        ...toRefs(state),
        handleLogin,
        cancelAdmin,
      };
    },
  });
</script>
<style lang="less" scoped>
  /deep/.ant-modal-body .scroll-container {
    border: none;
  }
</style>
