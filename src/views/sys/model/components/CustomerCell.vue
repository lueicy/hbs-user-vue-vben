<template>
  <div class="">
    <BasicTable
      :loading="false"
      :striped="false"
      :scroll="
      { x:   0, y: 0 }"
      @register="registerTable"
    >

      <template #deviceType="{ text }"> {{modeType(text)}} </template>

      <template #imgArr="{ record }">
        <TableImg
          :size="20"
          :simpleShow="true"
          :imgList="[chagneJSONParse(record.customData).iconUrl]"
        />
      </template>
      <template #mode="{ record }">
        <span class="mode">
          <!-- 智能/新风/送风/净化/除味/除霜/节能/排风/除湿/敷热/新风+除湿 -->
          {{filtersMODE(record.customData,true)}}
        </span>
      </template>
      <template #fan_Level="{ record }">
        <span class="mode">
          <!-- 风速 强/中/弱 -->
          {{filtersMODE(record.customData,false)}}
        </span>
      </template>
    </BasicTable>
  </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, BasicColumn, TableImg } from '/@/components/Table';
import { Tag, Avatar } from 'ant-design-vue';
import { listAllDeviceTypeByPage } from '/@/api/sys/menu';
const columns: BasicColumn[] = [
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    slots: { customRender: 'deviceType' },
    width: 150,
  },
  {
    title: '设备型号',
    dataIndex: 'subType',
    slots: { customRender: 'subType' },
    width: 190,
  },

  {
    title: '设备图片',
    dataIndex: 'imgArr',
    helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
    width: 140,
    slots: { customRender: 'imgArr' },
  },

  {
    title: '设备模式',
    dataIndex: 'mode',
    slots: { customRender: 'mode' },
    width: 400,
  },
  {
    slots: { customRender: 'fan_Level' },
    title: '设备风速',
    dataIndex: 'fan_Level',
    width: 120,
  },
];

export default defineComponent({
  components: { BasicTable, TableImg, Tag, Avatar },
  setup() {
    const [registerTable] = useTable({
      // title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
      api: listAllDeviceTypeByPage,
      columns: columns,
      bordered: false,
      // useSearchForm:true,
      canResize: true,
      inset: true,
    });
    const modeType = (itme: string): string => {
      let modelType: string[] = ['新风机', '空气净化器'];
      return modelType[Number(itme) - 1];
    };
    const filtersMODE = (item: any, mode: boolean): string => {
      let data: any = chagneJSONParse(item);
      let modeList: string[] = [];
      // 处理数据--判断是否为模式数据
      if (mode) {
        modeList = data.modeArray.map((e) => e.name);
      } else {
        modeList = data.windArray.map((e) => e.name);
      }
      return modeList.join('/');
    };

    const chagneJSONParse = (item: string): string => JSON.parse(item);

    return {
      registerTable,
      chagneJSONParse,
      filtersMODE,
      modeType,
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
.mode {
  // width: 436px;
  // height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3f4157;
  line-height: 20px;
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