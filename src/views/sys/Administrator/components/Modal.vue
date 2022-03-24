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
import { defineComponent, ref, inject } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
// import { modeList, fanList } from './modeList';
import { GetAllRoles, AddAdminRoles, UpdateAdminRoles } from '/@/api/sys/menu';
// import { useMessage } from '/@/hooks/web/useMessage';

const schemas: FormSchema[] = [
  {
    field: 'staffNo',
    component: 'Input',
    required: true,
    label: '管理员工号',
    colProps: {
      span: 20,
    },
    // defaultValue: '111',
  },
  {
    field: 'username',
    component: 'Input',
    required: true,
    label: '管理员名称',
    colProps: {
      span: 20,
    },
    // defaultValue: '111',
  },
  {
    field: 'tel',
    component: 'Input',
    required: true,
    label: '手机号',
    colProps: {
      span: 20,
    },
    // defaultValue: '111',
  },
  {
    field: 'email',
    component: 'Input',
    required: true,
    label: '管理员邮箱',
    colProps: {
      span: 20,
    },
    // defaultValue: '111',
  },

  // {
  //   field: 'roleIdList',
  //   component: 'ApiSelect',
  //   label: '管理员级别',
  //   required: true,
  //   componentProps: {
  //     // more details see /src/components/Form/src/components/ApiSelect.vue
  //     api: GetAllRoles,
  //     params: {
  //       id: 1,
  //     },
  //     resultField: 'data',
  //     // use name as label
  //     labelField: 'roleName',
  //     // use id as value
  //     valueField: 'id',
  //     // not request untill to select
  //     immediate: false,
  //     onChange: (e) => {
  //       console.log('selected:', e);
  //     },
  //     // atfer request callback
  //     onOptionsChange: (options) => {
  //       console.log('get options', options.length, options);
  //     },
  //   },
  //   colProps: {
  //     span: 20,
  //   },
  //   // defaultValue: '0',
  // },
];

export default defineComponent({
  components: { BasicModal, BasicForm },
  setup(_, ctx) {
    // 触发父组件
    const successInject: any = inject('provideSuccess');
    // 消息提示
    // const { createMessage } = useMessage();
    // const { error } = createMessage;
    const modelRef = ref({});
    const modelTitle = ref('');
    const modelID = ref('');
    const roleID = ref('');
    const [
      registerForm,
      {
        // setFieldsValue,
        setProps,
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
    async function getRoleData() {
      const resData = await GetAllRoles();
      resData.forEach((item) => {
        if (item.roleCode == 'COMMON_ADMIN') {
          roleID.value = item.id;
        }
      });
      console.log('resList------', roleID.value);
    }
    const [register, { changeOkLoading, closeModal }] = useModalInner((data) => {
      // 方式2
      // modelRef.value = { field2: data.data, field1: data.info };
      modelTitle.value = data.modelTitle;
      getRoleData();
      // 方式2
      if (data.modelTitle == '编辑管理员') {
        modelID.value = data.record.id;
        setProps({
          model: {
            email: data.record.email,
            id: data.record.id,
            // roleIdList: [roleID.value],
            // roleIdList: data.record.roleIdList,
            staffNo: data.record.staffNo,
            tel: data.record.tel,
            username: data.record.username,
          },
        });
      }
      // setProps({
      //   model:{ field2: data.data, field1: data.info }
      // })
    });
    // 提交确认
    const confirm = async () => {
      const values = await validate();
      values.roleIdList = [roleID.value];

      if (modelTitle.value == '编辑管理员') {
        values.id = modelID.value;
        // console.log('编辑型号----');
        const data = await UpdateAdminRoles(values);
        console.log('confirm--const data-', data);
      } else {
        console.log('新增加型号----');
        await AddAdminRoles(values);
      }
      changeOkLoading(true);
      setTimeout(() => {
        changeOkLoading(false);
        closeModal();
        ctx.emit('seccecc');
        successInject(values);
      }, 2000);
    };
    return { modelTitle, confirm, register, schemas, registerForm, model: modelRef };
  },
});
</script>
