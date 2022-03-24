<template>

  <BasicTable
    :loading="false"
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >

    <template #status="{ text }">

      <span
        class="handle"
        v-if="text=='20'"
      >
        已处理
      </span>

      <span
        v-else-if="text=='10'"
        class="handle handleding"
      >
        处理中
      </span>
      <span
        v-else-if="text=='00'"
        class="handle handled"
      >
        待处理
      </span>
    </template>
    <template #suggestionType="{ text }">
      <span>
        {{suggestType[Number(text)/10]}}
      </span>

    </template>

    <template #createTime="{ text }">
      {{convertUTCTimeToLocalTime(text)}}

    </template>
    <template #operation="{ record }">
      <TableAction :actions="[
            {
              icon: 'ant-design:arrow-right-outlined',
              onClick: handleView.bind(null, record),
            }
          ]" />
      <!-- tooltip: '', -->
    </template>
    <template #toolbar>
      <a-button @click="openModal"> 导出 </a-button>
    </template>
  </BasicTable>
  <Drawer5 @register="register5" />
  <ExpExcelModal
    @register="register"
    @success="defaultHeader"
  />
</template>
<script lang="ts">
import { Icon } from '/@/components/Icon';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { BasicTable, useTable, BasicColumn, TableImg, TableAction } from '/@/components/Table';
import { Tag, Avatar } from 'ant-design-vue';
import { listUserSuggestionsByPage } from '/@/api/demo/table';
import { useDrawer } from '/@/components/Drawer';
import Drawer5 from './Drawer5.vue';
import { convertUTCTimeToLocalTime } from '/@/utils/other/data';

import { jsonToSheetXlsx, ExpExcelModal, ExportModalResult } from '/@/components/Excel';
import { useModal } from '/@/components/Modal';

const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    slots: { customRender: 'userId' },
    width: 200,
  },

  {
    title: '手机号',
    dataIndex: 'tel',
    slots: { customRender: 'tel' },
    width: 120,
  },
  {
    title: '设备ID',
    dataIndex: 'id',
    slots: { customRender: 'id' },
    width: 200,
  },

  {
    title: '问题类型',
    dataIndex: 'suggestionType',
    slots: { customRender: 'suggestionType' },
    width: 100,
  },

  // {
  //   title: '问题内容',
  //   dataIndex: 'suggestion',
  //   slots: { customRender: 'suggestion' },
  //   width: 100,
  // },

  {
    title: '反馈时间',
    dataIndex: 'createTime',
    slots: { customRender: 'createTime' },
    width: 100,
  },

  // {
  //   title: '设备状态',
  //   dataIndex:  'status',
  //   slots: { customRender: 'status' },
  //   width: 100,
  // },
  {
    title: '更多',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    width: '8%',
  },
];
export default defineComponent({
  components: { Drawer5, ExpExcelModal, BasicTable, TableImg, TableAction, Tag, Avatar, Icon },
  setup() {
    const [register5, { openDrawer: openDrawer5, setDrawerProps }] = useDrawer();
    let state = reactive({
      suggestType: ['设备', 'APP', '其他'],
      listDataE: [],
    });
    const shre_Url: any = ref('');
    const [registerTable] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: listUserSuggestionsByPage,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });
    // showTableSetting: true,

    const handleView = (record: Recordable) => {
      openDrawer5(true, {
        record,
      });
      setDrawerProps({ loading: true });
      setTimeout(() => {
        setDrawerProps({ loading: false });
      }, 1000);
    };
    const [register, { openModal }] = useModal();
    function defaultHeader({ filename, bookType }: ExportModalResult) {
      // 保证data顺序与header一致
      jsonToSheetXlsx({
        data: state.listDataE,
        header: {
          userId: '用户id',
          tel: '用户手机号',
          id: '设备ID',
          // deviceId: '设备Id',
          suggestionType: '问题类别',
          // status: '处理状态',
          createTime: '反馈时间',
          suggestion: '用户建议内容',
        },
        filename,
        write2excelOpts: {
          bookType,
        },
      });
    }

    const getDAtaList = async () => {
      let data = await listUserSuggestionsByPage({
        pageIndex: 1,
        pageSize: 100000,
      });
      // Excel表格是数据格式
      state.listDataE = data.list.map((item) => {
        return {
          createTime: item.createTime,
          // deviceId: item.deviceId,
          id: item.id,
          // status: item.status,
          suggestion: item.suggestion,
          suggestionType: state.suggestType[Number(item.suggestionType) / 10],
          tel: item.tel,
          userId: item.userId,
        };
      });
    };

    onMounted(() => getDAtaList());

    return {
      register,
      defaultHeader,
      openModal,
      shre_Url,
      handleView,
      registerTable,
      convertUTCTimeToLocalTime,
      register5,
      ...toRefs(state),
    };
  },
});
</script>


<style lang='less' scoped>
@radius16px: 10px;
@colorGreen: #00b9dc;
/deep/ .ant-table-body {
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

.handle {
  width: 42px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #00b9dc;
  line-height: 20px;
}

.handled {
  color: #ff5f59;
}

.handleding {
  color: #ffc400;
}
</style>
