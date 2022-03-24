<template>

  <BasicTable
    :loading="false"
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >

    <template #operation="{ record }">
      <TableAction :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此信息',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]" />
    </template>
    <template #toolbar>
      <!-- <a-button @click="AddModal"> 添加活动信息 </a-button> -->
      <a-button @click="AddModal">
        <span
          class="iconify"
          :style="{display:'inline-block',marginRight:'10px'}"
         data-icon="fxemoji:heavyplussign"
        ></span>

        <span>
        添加管理员
        </span>
      </a-button>
    </template>
  </BasicTable>
  <Modal4
    @register="register4"
    @seccecc='handleOG'
  />

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';
// import { demoListApi } from '/@/api/demo/table';
import { getUserInfo } from '/@/api/sys/user';

import { DeleteAdminRoles } from '/@/api/sys/menu';

import { useMessage } from '/@/hooks/web/useMessage';
import { useModal } from '/@/components/Modal'; // import {columnsAdmin} from '/@/utils/other/tableColmuns'
import Modal4 from './Modal.vue';

const columns: BasicColumn[] = [
  {
    title: '工号',
    dataIndex: 'staffNo',
    width: 200,
  },
  {
    title: '姓名',
    dataIndex: 'username',
  },

  {
    title: '手机号',
    dataIndex: 'tel',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    slots: { customRender: 'email' },
  },
  {
    title: '权限级别',
    dataIndex: 'roleList',
    // slots: { customRender: 'roleList' },
    format: (val) => val[0].roleName,
  },

  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    // width: '8%',
  },
];
export default defineComponent({
  components: { Modal4, TableAction, BasicTable,  },
  setup() {
    const { createMessage } = useMessage();
    const { success } = createMessage;
    const [register4, { openModal }] = useModal();

    const [registerTable, { reload }] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: getUserInfo,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });
    // showTableSetting: true,
    const handleDelete = async (record: Recordable) => {
      console.log('点击了删除', record);
      const data = await DeleteAdminRoles({ key: record.id });
      console.log('点击了删除--data-', data);
      if (data == undefined) {
        handleOG();
        success('删除成功');
      }
    };
    function handleEdit(record: Recordable) {
      console.log(record);
      // reload();
      openModal(true, {
        record,
        modelTitle: '编辑管理员',
      });
    }

    const handleOG = () => {
      // 页面刷新
      setTimeout(() => {
        console.log('rec页面刷新----');
        reload();
      }, 1000);
    };
    const mapListData = (item) => {
      console.log('item----', item);
      return '超级管理员';
    };
    const AddModal = () => {
      openModal(true, {
        record: null,
        modelTitle: '添加管理员',
      });
    };
    return {
      AddModal,
      handleDelete,
      registerTable,
      handleOG,
      handleEdit,
      register4,
      mapListData,
    };
  },
});
</script>


<style lang='less' scoped>
@colorGreen: #00b9dc;
@radius16px: 10px;
/deep/.ant-table-body {
  .ant-table-thead {
    tr {
      th {
        border: 0 !important;
        background-color: @colorGreen;
        color: white;
        font-family: PingFangSC-Regular, PingFang SC;
        padding-top: 17px !important;
        padding-bottom: 17px !important;
      }
      th:first-child {
        border-top-left-radius: @radius16px;
        border-bottom-left-radius: @radius16px;
      }
      th:last-child {
        border-top-right-radius: @radius16px;
        border-bottom-right-radius: @radius16px;
      }
    }
  }
  .ant-table-tbody {
    tr {
      td {
        border: 0 !important;
      }
    }
  }
}
/deep/ .ant-table-pagination {
  margin-top: 20px;
  float: none;
  display: flex;
  justify-content: center;
  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next {
    background-color: #ffffff !important;
  }
  .ant-pagination-item-active {
    background-color: @colorGreen !important;
  }
}

.colorYellow {
  color: #ffc400;
}
.colorRed {
  color: #ff5f59;
}
.mr75 {
  margin-right: 25px;
}
.actionTitle {
  display: inline-block;
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  // color: #ffc400;
  line-height: 20px;
}
</style>