<template>
  <template v-if="!adminLogin">
    <BasicModal
      v-bind="$attrs"
      @register="register"
      title="添加设备"
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
  <template v-if="adminLogin">
    <BasicModal
      v-bind="$attrs"
      @register="registerModel"
      title="添加设备"
      @visible-change="handleVisibleChange"
      :maskClosable="false"
      @ok="handleAddDevice"
      @cancel="cancelAdd"
    >
      <div class="flex justify-between">
        <div class="admin-title">请输入设备id</div>
        <div>
          <a-button @click="appendField"> 添加 </a-button>
        </div>
      </div>

      <div class="pt-3px pr-3px">
        <BasicForm @register="addForm" />
      </div>
    </BasicModal>
  </template>
</template>
<script lang="ts">
  import { defineComponent, toRaw, toRefs, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addDeviceByAdmin } from '/@/api/sys/groupAndDevice';
  import bus from '/@/utils/bus';
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
  const addSchemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '设备PID',
      colProps: {
        span: 24,
      },
      defaultValue: '',
    },
  ];

  interface stateType {
    adminLogin: boolean;
    addTime: number;
    selectList: any[];
    userId: any;
  }
  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup() {
      const state: stateType = reactive({
        adminLogin: false,
        addTime: 1,
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
      const [addForm, { validateFields: addValidateFields, appendSchemaByField }] = useForm({
        labelWidth: 80,
        schemas: addSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { closeModal }] = useModalInner();
      const [registerModel, { closeModal: closeModal2 }] = useModalInner();
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { error, success } = createMessage;

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
            state.adminLogin = true;
            state.userId = userStore.getUserInfo.id; // 企业用户Id,不是管理员id
            success('登录成功');
          }
        } catch (error: any) {
          userStore.setAdminLogStatus(false);
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
        // const res = await addDeviceByAdmin(values);
        // state.adminLogin = true;
        console.log('登录', values);
      }
      function cancelAdmin() {
        state.adminLogin = false;
        userStore.setAdminLogStatus(false);
      }
      async function handleAddDevice() {
        const values = (await addValidateFields()) as any;
        try {
          const addRes = await addDeviceByAdmin(
            toRaw({
              deviceList: Object.values(values),
              userId: state.userId,
              mode: 'none', //不要默认的错误提示
            })
          );
          if (addRes) {
            success('添加设备成功');
            bus.emit('fetchPageData');
            userStore.setAdminLogStatus(false);
            closeModal2();
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      function cancelAdd() {
        state.adminLogin = false;
        userStore.setAdminLogStatus(false);
      }

      function handleVisibleChange() {}
      // 添加设备按钮
      function appendField() {
        state.addTime++;
        console.log('state.addTime', state.addTime);
        appendSchemaByField(
          {
            field: `field${state.addTime}`,
            label: '设备PID',
            component: 'Input',
            colProps: {
              span: 24,
            },
            defaultValue: '',
          },
          ''
        );
      }

      return {
        register,
        registerModel,
        registerForm,
        addForm,
        handleVisibleChange,
        ...toRefs(state),
        handleLogin,
        cancelAdmin,
        appendField,
        handleAddDevice,
        cancelAdd,
        closeModal,
      };
    },
  });
</script>
<style lang="less" scoped>
  .admin-title {
    margin: 10px 0px 24px 0px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #3e4159;
  }
  /deep/.ant-modal-body .scroll-container {
    border: none;
  }
</style>
