<template>
  <div class="flex flex-col share-container">
    <div class="flex justify-between share-basic">
      <div class="share-title">分享人信息</div>
      <div class="share-operation" @click="addSharer">
        <Icon icon="ant-design:plus-outlined" class="icon-add" />
      </div>
    </div>
    <div class="share-table">
      <BasicTable @register="sharerTable" @edit-change="onEditChange">
        <template #operation="{ record, column }">
          <TableAction :actions="createActions(record, column)" />
        </template>
      </BasicTable>
    </div>
    <component :is="currentModal" v-model:visible="modalVisible" :userData="userData" />
    <AddSharerModel @register="sharerInfo" :minHeight="100" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, shallowRef, ComponentOptions, nextTick } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { Icon } from '/@/components/Icon';
  import {
    BasicTable,
    useTable,
    BasicColumn,
    TableAction,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import AddSharerModel from './AddSharerModel.vue';
  import { useModal } from '/@/components/Modal';
  const tableColums: BasicColumn[] = [
    {
      title: '名称',
      dataIndex: 'name',
      editRow: true,
      // 默认必填校验
      editRule: true,
      width: 250,
    },
    {
      title: '账号',
      dataIndex: 'id',
      width: 250,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ];
  const listData = [
    {
      id: 0,
      name: 'weqweq',
    },
    {
      id: 1,
      name: 'weqweq',
    },
    {
      id: 2,
      name: 'weqweq',
    },
    {
      id: 3,
      name: 'weqweq',
    },
    {
      id: 4,
      name: 'weqweq',
    },
  ];
  export default defineComponent({
    components: {
      Icon,
      BasicTable,
      TableAction,
      AddSharerModel,
    },
    setup() {
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
      const modalVisible = ref<Boolean>(false);
      const userData = ref<any>(null);
      const [sharerInfo, { openModal: openModal }] = useModal();
      const { createMessage: msg } = useMessage();
      const currentEditKeyRef = ref('');
      const [sharerTable] = useTable({
        // api: demoListApi,
        columns: tableColums,
        dataSource: listData,
        showIndexColumn: true,
        showTableSetting: true,
        inset: true,
        canResize: true,
        tableSetting: { redo: false, size: false, fullScreen: false, setting: true },
        pagination: false,
      });
      // 添加分享人
      function addSharer() {
        console.log('添加分享人');
        currentModal.value = AddSharerModel;
        nextTick(() => {
          userData.value = { data: Math.random(), info: 'Info222' };
          modalVisible.value = true;
        });
      }

      async function handleSave(record: EditRecordRow) {
        // 校验
        msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
        const valid = await record.onValid?.();
        console.log(valid);
        if (valid) {
          try {
            const data = cloneDeep(record.editValueRefs);
            console.log(data);
            //TODO 此处将数据提交给服务器保存
            // ...
            // 保存之后提交编辑状态
            const pass = await record.onEdit?.(false, true);
            console.log('pass', pass);
            if (pass) {
              currentEditKeyRef.value = '';
            }
            msg.success({ content: '数据已保存', key: 'saving' });
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
              label: '备注',
              disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              // onClick: handleDelete.bind(null, record, column),
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
      function handleDelete(record: EditRecordRow) {
        console.log('点击了删除', record);
      }
      function onEditChange({ column, value, record }) {
        // 本例
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }
      onMounted(() => {
        console.log(listData);
      });
      return {
        sharerTable,
        handleEdit,
        handleDelete,
        createActions,
        onEditChange,
        addSharer,
        currentModal,
        modalVisible,
        userData,
        sharerInfo,
        openModal,
      };
    },
  });
</script>

<style lang="less" scoped>
  .share-container {
    min-width: 800px;
    min-height: 264px;
    margin-top: 20px;
    margin-right: 20px;
    padding: 10px 18px;
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 6px #dbdbdb;
    opacity: 1;
    border-radius: 10px;
    .share-basic {
      height: 40px;
      .share-title {
        width: 90px;
        box-sizing: content-box;
        padding-bottom: 10px;
        height: 24px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        line-height: 21px;
        color: #333333;
        opacity: 1;
        border-bottom: 2px solid rgba(0, 185, 215, 1);
      }
      .share-operation {
        width: 42px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #e2eaec;
      }
    }
    .share-table {
      height: 200px;
    }
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
  /deep/.vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
  /deep/.ant-table-thead > tr > th {
    background: rgba(9, 185, 220, 0.39);
    color: #3e4159;
  }
  /deep/ .ant-table-body {
    max-height: 150px !important;
    height: 150px !important;
  }
  /deep/ .ant-table-title {
    display: none;
  }
</style>
