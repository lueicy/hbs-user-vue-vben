<template>

  <BasicTable
    :loading="false"
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >
    <template #updateTime="{ text }">
      {{convertUTCTimeToLocalTime(text)}}
    </template>
    <!-- <template #type="{ record,text }">
      {{text?record.store:'AppStore' }}
    </template> -->
    <template #model="{text }">
      {{text=='*'?'通用':text }}
    </template>
    <!-- <template #operation="{ record }">
      <a class="actionTitle colorYellow mr75">编辑</a>
      <span class="actionTitle colorRed">删除</span>
    </template> -->
    <template #operation="{ record }">
      <!-- {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleEdit.bind(null, record),
            }, -->
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
      <a-button @click="AddModal">
        <span class="iconify" :style="{display:'inline-block',margin:'0 10px 4px 0'}" data-icon="openmoji:android"></span>
         <span>
           添加升级信息 
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
import { Icon } from '/@/components/Icon';
import { defineComponent } from 'vue';
import { BasicTable, useTable, BasicColumn, TableImg, TableAction } from '/@/components/Table';
import { Tag, Avatar } from 'ant-design-vue';
import { androidInfoList, DeleteUpgradeInfo } from '/@/api/demo/table';

import { convertUTCTimeToLocalTime } from '/@/utils/other/data';
import Modal4 from './Modal4.vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { useModal } from '/@/components/Modal';

const columns: BasicColumn[] = [
  {
    title: '上传者ID',
    dataIndex: 'id',
    slots: { customRender: 'id' },
    width: 200,
  },
  {
    title: '姓名',
    dataIndex: 'publishUserName',
    // width: 260,
  },
  {
    title: '应用商店',
    dataIndex: 'model',
    slots: { customRender: 'model' },
  },
  {
    title: '下载链接',
    dataIndex: 'url',
    // width: 260,
  },

  {
    title: '更新内容',
    dataIndex: 'description',
    slots: { customRender: 'description' },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    slots: { customRender: 'updateTime' },
  },
  {
    title: '回退版本',
    dataIndex: 'version',
    slots: { customRender: 'version' },
  },

  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
];
export default defineComponent({
  components: { TableAction, Modal4, BasicTable, TableImg, Tag, Avatar, Icon },
  setup() {
    const [register4, { openModal }] = useModal();

    //消息提示框
    const { createMessage } = useMessage();
    const { success } = createMessage;

    const [registerTable, { reload }] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: androidInfoList,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });

    // showTableSetting: true,

    const handleDelete = async (record: Recordable) => {
      console.log('点击了删除', record);
      const data = await DeleteUpgradeInfo({ key: record.id });
      if (data == undefined) {
        success('删除成功');
        handleOG();
      }
    };
    // 打开编辑弹框
    function handleEdit(record: Recordable) {
      console.log(record);
      reload();
      openModal(true, {
        record,
        modelTitle: '编辑型号',
      });
    }
    const handleOG = () => {
      // 页面刷新
      setTimeout(() => {
        console.log('rec页面刷新----');
        reload();
      }, 1000);
    };
    const AddModal = () => {
      openModal(true, {
        record: null,
        modelTitle: '添加型号',
      });
    };
    return {
      AddModal,
      handleDelete,
      registerTable,
      convertUTCTimeToLocalTime,
      handleOG,
      register4,
      handleEdit,
    };
  },
});
</script>


<style lang='less' scoped>
@radius16px: 10px;
@colorGreen: #00b9dc;
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