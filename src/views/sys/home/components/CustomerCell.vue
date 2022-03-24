<template>

  <BasicTable
    :loading="false"
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >
    <template #id="{ record }"> ID: {{ record.id }} </template>
    <template #no="{ record }">
      <Tag color="green">
        {{ record.no }}
      </Tag>
    </template>
    <template #avatar="{ record }">
      <Avatar
        :size="20"
        :src="record.avatar"
      />
    </template>
    <template #img="{ text }">
      <TableImg
        :size="30"
        :simpleShow="true"
        :imgList="text"
      />
    </template>
    <template #imgs="{ text }">
      <TableImg
        :size="60"
        :imgList="text"
      />
    </template>

    <template #category="{ record }">
      <Tag color="green">
        {{ record.no }}
      </Tag>
    </template>
    <template #operation="{ record }">
      <Icon icon="ant-design:arrow-right-outlined"></Icon>
      <!-- <span class='icon ant-design'></span> -->
    </template>
  </BasicTable>

</template>
<script lang="ts">
import { Icon } from '/@/components/Icon';
import { defineComponent } from 'vue';
import { BasicTable, useTable, BasicColumn, TableImg } from '/@/components/Table';
import { Tag, Avatar } from 'ant-design-vue';
import { demoListApi } from '/@/api/demo/table';
const columns: BasicColumn[] = [
  {
    title: '用户id',
    dataIndex: 'id',
    slots: { customRender: 'id' },
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    // width: 260,
  },

  {
    title: '手机号',
    dataIndex: 'no',
    slots: { customRender: 'no' },
  },
  {
    title: '用户地址',
    dataIndex: 'address',
  },
  {
    title: '绑定设备数量',
    dataIndex: 'no',
    slots: { customRender: 'no' },
  },

  {
    title: '注册时间',
    dataIndex: 'endTime',
  },

  {
    title: '更多',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    width: '8%',
  },
];
export default defineComponent({
  components: { BasicTable, TableImg, Tag, Avatar, Icon },
  setup() {
    const [registerTable] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: demoListApi,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });
    // showTableSetting: true,
    console.log('api---', registerTable);
    const handleDelete = (record: Recordable) => {
      console.log('点击了删除', record);
    };
    return {
      handleDelete,
      registerTable,
    };
  },
});
</script>


<style lang='less' scoped>
@radius16px: 10px;
@colorGreen: #00B9DC;
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
</style>