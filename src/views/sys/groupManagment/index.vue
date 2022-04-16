<template>
  <PageWrapper title="">
    <div class="page-header">群组管理</div>
    <div class="page-content">
      <div class="flex w-full btn-m-r">
        <a-button type="primary" class="add-btn" @click="addGroup"> 新增群组 </a-button>
      </div>
      <div class="group-table">
        <BasicTable @register="groupTable" @edit-change="onEditChange" @click="toDetail">
          <template #operation="{ record, column }">
            <TableAction :actions="createActions(record, column)" />
          </template>
        </BasicTable>
      </div>
    </div>
    <component :is="currentModal" v-model:visible="modalVisible" @close="onClose" />
    <AddGroupModel @register="groupInfo" :minHeight="100" />
  </PageWrapper>
</template>
<script lang="ts">
  import {
    defineComponent,
    ref,
    shallowRef,
    ComponentOptions,
    nextTick,
    reactive,
    toRefs,
    onMounted,
  } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { cloneDeep } from 'lodash-es';
  import {
    BasicTable,
    useTable,
    BasicColumn,
    TableAction,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import AddGroupModel from './components/AddGroupModel.vue';
  import {
    GetlistUserGroupApi,
    UpdatelistUserGroupApi,
    RemovelistUserGroupApi,
  } from '/@/api/sys/groupAndDevice';
  import { useRouter } from 'vue-router';
  const tableColums: BasicColumn[] = [
    {
      title: '群组名称',
      dataIndex: 'groupName',
      editRow: true,
      // 默认必填校验
      editRule: true,
      width: 250,
    },
    {
      title: '设备数量',
      dataIndex: 'deviceCount',
      width: 250,
    },
    {
      title: '在线数量',
      dataIndex: 'onlineCount',
      width: 250,
    },
    {
      title: '异常数量',
      dataIndex: 'errorCount',
      width: 250,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ];

  export default defineComponent({
    components: {
      PageWrapper,
      AddGroupModel,
      BasicTable,
      TableAction,
    },

    setup() {
      const state = reactive({
        listData: [],
      });
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
      const modalVisible = ref<Boolean>(false);
      const groupData = ref<any>(null);
      const [groupInfo, { openModal: openModal }] = useModal();
      const currentEditKeyRef = ref('');
      const { createMessage: msg } = useMessage();
      const [groupTable, { reload }] = useTable({
        api: GetlistUserGroupApi,
        columns: tableColums,
        showIndexColumn: true,
        showTableSetting: true,
        inset: true,
        canResize: true,
        tableSetting: { redo: true, size: false, fullScreen: false, setting: false },
        pagination: true,
      });

      const { push } = useRouter();
      function toDetail(event) {
        console.log('点击查看群组', event);
        push({
          name: 'GroupDetail',
          params: {
            id: event.groupId,
            groupName: event.groupName,
          },
        });
      }

      async function handleSave(record: EditRecordRow) {
        // 校验
        msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
        const valid = await record.onValid?.();
        console.log(valid);
        if (valid) {
          try {
            const data: any = cloneDeep(record.editValueRefs);
            console.log('8899', data, record);
            //TODO 此处将数据提交给服务器保存
            // ...
            // 保存之后提交编辑状态
            let params = {
              groupName: data.groupName,
              id: record.groupId, // 用户群组主键
              sort: record.sort,
            };
            const res = await UpdatelistUserGroupApi(params);

            const pass = await record.onEdit?.(false, true);
            console.log('pass', pass);
            if (res.code == 200 && pass) {
              currentEditKeyRef.value = '';
            }
            msg.success({ content: '数据已保存', key: 'saving' });
            reload();
          } catch (error) {
            msg.error({ content: '保存失败', key: 'saving' });
          }
        } else {
          msg.error({ content: '请填写正确的数据', key: 'saving' });
        }
      }
      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '修改',
              disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '查看',
              disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
              onClick: toDetail.bind(null, record),
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否删除该数据',
                confirm: handleDelete.bind(null, record, column),
              },
            },
          ];
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record, column),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record, column),
            },
          },
        ];
      }
      function handleEdit(record: EditRecordRow) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
        console.log('点击了编辑', record);
      }
      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }
      async function handleDelete(record: EditRecordRow) {
        const res = await RemovelistUserGroupApi({
          userGroupId: record.groupId,
        });
        reload();
        console.log('点击了删除222', res);
      }
      function onEditChange({ column, value, record }) {
        // 本例
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }

      // 新增数组
      function addGroup() {
        console.log('新增数组');
        currentModal.value = AddGroupModel;
        nextTick(() => {
          modalVisible.value = true;
        });
      }
      function onClose() {
        reload();
        modalVisible.value = false;
      }

      onMounted(() => {
        // getListData(1, 20);
      });

      return {
        ...toRefs(state),
        groupTable,
        // getListData,
        handleEdit,
        handleDelete,
        createActions,
        onEditChange,
        addGroup,
        groupData,
        currentModal,
        modalVisible,
        groupInfo,
        openModal,
        onClose,
        toDetail,
      };
    },
  });
</script>
<style lang="less" scoped>
  .page-header {
    margin-top: 24px;
    margin-bottom: 10px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: #333333;
  }
  .page-content {
    background: #ffffff;
    padding: 0px 20px;
  }
  .btn-m-r {
    padding: 24px 10px;
    flex-direction: row-reverse;
  }
  /deep/ .ant-btn-primary {
    background: rgba(9, 185, 220, 1);
    border-color: rgba(9, 185, 220, 1);
  }
  /deep/.vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
  /deep/.ant-table-thead > tr > th {
    background: #00b9d7;
    color: #ffffff;
  }
  /deep/ .ant-empty {
    min-height: 600px;
  }
  /deep/ .ant-table-title {
    display: none;
  }
</style>
