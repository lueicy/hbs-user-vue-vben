<template>

  <BasicTable
    :loading="false"
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >

    <template #createTime="{ text }">
      {{convertUTCTimeToLocalTime(text)}}

    </template>
    <template #updateTime="{ text }">
      {{convertUTCTimeToLocalTime(text)}}

    </template>
    <template #imageUrl="{ text }">
      <TableImg
        :size="50"
        :simpleShow="true"
        :imgList="[text]"
      />
    </template>

    <!-- <template #operation="{ record }">
      <span class="actionTitle colorYellow mr75">编辑</span>
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
   
        <span
          :style="{display:'inline-block',marginRight:'10px'}"
        
         class="iconify" data-icon="fxemoji:bullhorn"></span>
        <span>

          添加活动信息
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
import { defineComponent, reactive, toRefs } from 'vue';
import { BasicTable, useTable, BasicColumn, TableImg, TableAction } from '/@/components/Table';
import { listActionInfoByPage, delAcIdPage } from '/@/api/demo/table';
// import Edison from '/@/assets/images/edson.png';
import Edison from '/@/assets/images/action.png';
import { convertUTCTimeToLocalTime } from '/@/utils/other/data';
import { useMessage } from '/@/hooks/web/useMessage';
import { useModal } from '/@/components/Modal';

import Modal4 from './Modal4.vue';

const columns: BasicColumn[] = [
  {
    title: '活动ID',
    dataIndex: 'id',
    slots: { customRender: 'id' },
    width: 200,
  },
  {
    title: '活动标题',
    dataIndex: 'title',
    slots: { customRender: 'title' },
    width: 110,
  },

  {
    title: '活动内容',
    dataIndex: 'content',
    slots: { customRender: 'content' },
    width: 200,
  },
  {
    title: '活动图片',
    dataIndex: 'imageUrl',
    helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
    width: 100,
    slots: { customRender: 'imageUrl' },
  },
  {
    title: '活动链接',
    dataIndex: 'url',
    slots: { customRender: 'url' },
    width: 170,
  },
  {
    title: '开始时间',
    dataIndex: 'beginTime',
    width: 100,
  },
  {
    title: '结束时间',
    dataIndex: 'finishTime',
    width: 100,
  },

  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    width: 100,
    // width: '8%',
  },
];
export default defineComponent({
  components: { Modal4, BasicTable, TableImg,  TableAction },
  setup() {
    const { createMessage } = useMessage();
    const { success } = createMessage;
    const [register4, { openModal }] = useModal();

    const [registerTable, { reload,  }] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: listActionInfoByPage,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });
    const state = reactive({
      Edison,
    });
    // showTableSetting: true,
    console.log('api---', registerTable);
    const handleDelete = async (record: Recordable) => {
      console.log('点击了删除', record);
      const data = await delAcIdPage({ key: record.id });
      console.log('点击了删除--data-', data);
      if (data == undefined) {
        handleOG();
        success('删除成功');
      }
    };
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
      ...toRefs(state),
      handleEdit,
      handleDelete,
      registerTable,
      convertUTCTimeToLocalTime,
      handleOG,
      register4,
    };
  },
});
</script>


<style lang='less' scoped>
@colorGreen: #00b9dc;
// @radius16px: 16px;
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