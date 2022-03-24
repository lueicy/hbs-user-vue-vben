<template>

    <!-- :loading="false" -->
  <BasicTable
    loading
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >
    <template #bindDeviceNum="{ record }">
      {{ record.bindDeviceNum }}台
    </template>
    <template #address="{ text }">
      {{text?text:'-' }}
    </template>

    <template #createTime="{ record }">
      {{convertUTCTimeToLocalTime(record.createTime)}}
    </template>

    <template #toolbar>
      <a-button @click="openModal"> 导出 </a-button>
    </template>
  </BasicTable>
  <ExpExcelModal
    @register="register"
    @success="defaultHeader"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
import { listUserByPageUser } from '/@/api/demo/table';
import { convertUTCTimeToLocalTime } from '/@/utils/other/data';
import { useModal } from '/@/components/Modal';
import { jsonToSheetXlsx, ExpExcelModal, ExportModalResult } from '/@/components/Excel';

const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    width: 190,
  },

  {
    title: '用户名称',
    dataIndex: 'username',
    width: 150,
  },

  {
    title: '手机号',
    dataIndex: 'tel',
    width: 150,
  },
  {
    title: '是否删除',
    dataIndex: 'isDeleted',
    width: 150,
    ifShow: false,
  },
  {
    title: '用户地址',
    dataIndex: 'address',
    width: 300,
    slots: { customRender: 'address' },
  },
  {
    title: '绑定设备数量',
    dataIndex: 'bindDeviceNum',
    slots: { customRender: 'bindDeviceNum' },
    width: 100,
  },

  {
    title: '注册时间',
    dataIndex: 'createTime',
    slots: { customRender: 'createTime' },
    width: 150,
  },

  // {
  //   title: '更多',
  //   dataIndex: 'operation',
  //   slots: { customRender: 'operation' },
  //   width: 100,
  // },
];

export default defineComponent({
  components: { ExpExcelModal, BasicTable },
  setup() {
    const [registerTable] = useTable({
      title: '用户管理',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: listUserByPageUser,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });
    // showTableSetting: true, 

    const [register, { openModal }] = useModal();
    let stateE = reactive({
      listDataE: [],
    });
    const getDAtaList = async () => {
      let data = await listUserByPageUser({
        pageIndex: 1,
        pageSize: 100000,
      });
      // Excel表格是数据格式
      stateE.listDataE = data.list.map((item) => {
        return {
          address: item.address ? item.address : '-',
          bindDeviceNum: item.bindDeviceNum + '台',
          createTime: item.createTime,
          tel: item.tel,
          userId: item.userId,
          username: item.username,
        };
      });
    };
    onMounted(() => getDAtaList());
    function defaultHeader({ filename, bookType }: ExportModalResult) {
      jsonToSheetXlsx({
        data: stateE.listDataE,
        header: {
          userId: '用户ID',
          username: '用户名',
          tel: '手机号',
          bindDeviceNum: '绑定设备量',
          createTime: '注册时间',
          address: '地址',
        },
        filename,
        write2excelOpts: {
          bookType,
        },
      });
    }
    return {
      registerTable,
      convertUTCTimeToLocalTime,
      register,
      openModal,
      defaultHeader,
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
</style>