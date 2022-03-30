<template>
  <div class="flex flex-col share-container">
    <div class="flex justify-between share-basic">
      <div class="share-title">分享人信息</div>
      <div class="share-operation">
        <Icon icon="ant-design:plus-outlined" class="icon-add" />
      </div>
    </div>
    <div class="share-table">
      <!-- <BasicTable @register="sharerTable" /> -->
      <BasicTable @register="sharerTable">
        <template #operation="{ record }">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                label: '备注',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                label: '删除',
                color: 'error',
                tooltip: '删除此信息',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Icon } from '/@/components/Icon';
  import {
    BasicTable,
    useTable,
    BasicColumn,
    TableAction,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  const tableColums: BasicColumn[] = [
    {
      title: '名称',
      dataIndex: 'name',
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
    },
    setup() {
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
      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        return [
          {
            label: '备注',
            onClick: handleEdit.bind(null, record, column),
          },
          {
            label: '删除',
            onClick: handleDelete.bind(null, record, column),
            // popConfirm: {
            //   title: '是否取消编辑',
            //   confirm: handleCancel.bind(null, record, column),
            // },
          },
        ];
      }
      function handleEdit(record: Recordable) {
        console.log('点击了编辑', record);
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }

      onMounted(() => {
        console.log(listData);
      });
      return {
        sharerTable,
        handleEdit,
        handleDelete,
        createActions,
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
