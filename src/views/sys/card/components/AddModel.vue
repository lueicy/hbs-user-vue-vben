<template>
  <template v-if="!adminLogin">
    <BasicModal
      v-bind="$attrs"
      @register="register"
      title="添加设备"
      @visible-change="handleVisibleChange"
      @ok="handleLogin"
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
      @register="register"
      title="添加设备"
      @visible-change="handleVisibleChange"
      @ok="handleAddDevice"
    >
      <div class="admin-title">请输入设备id</div>
      <div>
        <a-button @click="appendField" class="mr-2"> 添加 </a-button>
      </div>
      <div class="pt-3px pr-3px">
        <BasicForm @register="addForm" />
      </div>
    </BasicModal>
  </template>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, toRefs, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  const logSchemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '管理员账号',
      colProps: {
        span: 24,
      },
      defaultValue: '111',
    },
    {
      field: 'field2',
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
  }
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const state: stateType = reactive({
        adminLogin: false,
        addTime: 1,
        selectList: [],
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
        labelWidth: 120,
        schemas: addSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register] = useModalInner();

      async function handleLogin() {
        const values = (await validateFields()) as any;
        userStore.setAdminLogStatus(true); //请求失败后改为false
        // const res = await AddlistUserGroupApi(values);
        state.adminLogin = true;
        console.log('登录', values);
      }
      async function handleAddDevice() {
        const values = (await addValidateFields()) as any;
        // const res = await AddlistUserGroupApi(values);
        console.log('添加设备地', values);
      }

      function handleVisibleChange() {}
      // 添加设备按钮
      function appendField() {
        state.addTime++;
        console.log('state.addTime', state.addTime);
        appendSchemaByField(
          {
            field: `field + ${state.addTime}`,
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
        registerForm,
        addForm,
        handleVisibleChange,
        ...toRefs(state),
        handleLogin,
        appendField,
        handleAddDevice,
      };
    },
  });
</script>
<style lang="less" scoped>
  /deep/.ant-modal-body .scroll-container {
    border: none;
  }
</style>
