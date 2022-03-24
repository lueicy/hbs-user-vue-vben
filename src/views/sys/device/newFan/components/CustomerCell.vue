<template>
  <BasicTable
    :loading="false"
    :striped="false"
    :scroll="
      { x:   0, y: 0 }"
    @register="registerTable"
  >
    <template #toolbar>
      <a-button @click="openModal"> 导出 </a-button>
    </template>
    <template #useTime="{ text }">
      {{chageHoursDay(text)}}
    </template>
    <template #online="{ text }">
      <span
        class="RunStatus_Online"
        v-if="parseInt(text)"
      >在线</span>
      <span v-else>离线</span>
    </template>
    <template #meshCycle="{ text }">
      <span v-if="chageDays(text)">
        剩余{{chageDays(text)}}月
      </span>
      <span
        v-else
        :style='{color:"#ff2f4f"}'
      >
        请及时更换滤网
      </span>
    </template>
    <template #city="{ text }">
      <span>
        {{text?text:"-"}}
      </span>
    </template>
    <template #airQuality="{ text }">
      <div
        class="airQuality "
        :style="{backgroundColor: airColor[parseInt(text)-1]}"
      >
        {{airStatus(text)}}
      </div>

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
  </BasicTable>

  <Drawer5 @register="register5" />
  <ExpExcelModal
    @register="register"
    @success="defaultHeader"
  />
</template>
<script lang="ts">
import { Icon } from '/@/components/Icon';
import {
  provide,
  defineComponent,
  onBeforeMount,
  unref,
  computed,
  reactive,
  onMounted,
  toRefs,
} from 'vue';
import { BasicTable, TableAction, useTable, TableImg } from '/@/components/Table';
import { Tag, Avatar } from 'ant-design-vue';
import { ListDeviceByPage } from '/@/api/demo/table';

import { columns_Device } from '/@/utils/other/tableColmuns';
import { useDrawer } from '/@/components/Drawer';
import Drawer5 from './Drawer5.vue';
import { jsonToSheetXlsx, ExpExcelModal, ExportModalResult } from '/@/components/Excel';
import { useModal } from '/@/components/Modal';
import { useRouter } from 'vue-router';
import { useUserStore } from '/@/store/modules/user';

interface Member {
  id?: string;
  model?: string;
  deviceType?: string;
  subType?: string;
}
export default defineComponent({
  components: { Drawer5, ExpExcelModal, BasicTable, TableAction, TableImg, Tag, Avatar, Icon },
  setup() {
    const [register5, { openDrawer: openDrawer5, setDrawerProps }] = useDrawer();
    const [registerTable] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: ListDeviceByPage,
      columns: columns_Device,
      bordered: false,
      // useSearchForm:true,
      autoCreateKey: true,
      canResize: true,
      inset: true,
    });
    // showTableSetting: true,
    const { currentRoute } = useRouter();
    const userStore = useUserStore();
    // 当参数更改时获取用户信息

    let stateE = reactive({
      listDataE: [],
      airColor: ['#3ccb85', '#ffc400', '#ff5f59'],
    });
    let recordData = reactive<Member>({
      id: '',
      model: '',
    });

    provide('recordModel', recordData);

    function handleView(record: Recordable) {
      openDrawer5(true, { record });
      setDrawerProps({ loading: true });
      setTimeout(() => {
        setDrawerProps({ loading: false });
      }, 1000);
    }
    function airStatus(params: string): string {
      let n: string = '';
      switch (params) {
        case '01':
          n = '优';
          break;
        case '02':
          n = '良';
          break;
        case '03':
          n = '差';
          break;
        default:
          break;
      }
      return n;
    }

    let chageHoursDay = (time):string => {
      let d: string = '';
      if (parseInt(Number(time) / 60) > 24) {
        d = parseInt(Number(time) / 60 / 60 / 24) + '天';
      } else {
        d = parseInt(Number(time) / 60) + '小时';
      }
      return d;
    };
    let chageDays = (time) => parseInt(parseInt(180 - Number(time) / 60 / 24) / 30);
    function defaultHeader({ filename, bookType }: ExportModalResult) {
      // 保证data顺序与header一致
      jsonToSheetXlsx({
        data: stateE.listDataE,
        header: {
          deviceId: '设备ID',
          deviceName: '设备名称',
          mac: 'Mac地址',
          meshCycle: '滤网维护周期',
          online: '运行状态',
          useTime: '运行里程',
          airQuality: '空气质量',
          city: '设备地址',
          createTime: '设备激活时间',
        },
        filename,
        write2excelOpts: {
          bookType,
        },
      });
    }
    const [register, { openModal }] = useModal();

    const getDAtaList = async () => {
      let data = await ListDeviceByPage({
        pageIndex: 1,
        pageSize: 100000,
      });
      // Excel表格是数据格式
      stateE.listDataE = data.list.map((item) => {
        return {
          deviceId: item.deviceId,
          deviceName: item.deviceName ? item.deviceName : '-',
          mac: item.mac,
          meshCycle: '剩余' + chageDays(item.meshCycle) + '个月',
          online: parseInt(item.online) ? '在线' : '离线',
          useTime: chageHoursDay(item.useTime),
          airQuality: airStatus(item.airQuality),
          city: item.city ? item.city : '-',
          createTime: item.createTime,
        };
      });
    };

    const routerParams = computed(() => {
      return unref(currentRoute);
    });

    onMounted(() => getDAtaList());
    onBeforeMount(() => {
      userStore.setRouterName(routerParams.value.name);
    });

    return {
      chageDays,
      chageHoursDay,
      registerTable,
      handleView,
      register5,
      defaultHeader,
      airStatus,
      register,
      openModal,
      ...toRefs(stateE),
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
  float: none !important;
  display: flex !important;
  justify-content: center !important;
  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next {
    background-color: #ffffff !important;
  }
  .ant-pagination-item-active {
    background-color: @colorGreen !important;
  }
}
.RunStatus_Online {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #00b9d7;
}
.airQuality {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
  color: #ffffff;
}
</style>