<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    :showDetailBack="false"
    @close='closeFunc'
    @register="register"
    width="80%"
    title=""
    :bodyStyle="{
      background:'#F2F2F2'
    }"
  >
    <Tabs
      default-active-key="1"
      @change="callback"
      :tabBarGutter='100'
    >
      <TabPane
        key="1"
        tab="基本信息"
      >
        <!-- 设备激活时间和设备状态 -->
        <div
          class="device_Time"
          :style="{
          borderRadius:'16px'
          ,background:'#ffffff'
          ,boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)'
        }"
        >
          <div class="device_Time_item">
            <div class="left_Title">
              <img
                :src="D_Time"
                alt=""
                class="left_Title_icon"
              >

              <span class="left_Title_item">设备激活时间</span>
            </div>
            <div class="rightT">
              {{createTime}}
            </div>
          </div>

          <div class="device_Time_item">
            <div class="left_Title">
              <img
                :src="D_Status"
                alt=""
                class="left_Title_icon"
              >
              <span class="left_Title_item">设备运行状态</span>
            </div>
            <div
              class="rightT"
              :style="{color:errorData=='设备良好，请继续保持'?  '#00B9D7':'#ff5f59'}"
            >
              <!-- 设备良好，请继续保持～ -->
              {{errorData}}
            </div>
          </div>

        </div>

        <!-- :bordered="false" -->
        <Card
          title="用户信息"
          :bodyStyle="{
          padding:'0 24px',
          background:'#ffffff'
          ,boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)'
        }"
        >
          <p class="info">
            <span
              class="info_icon"
              :style="{background: '#4880ff'}"
            ></span>
            <span class="info_title">
              用户名：
              {{userDataList.length? userDataList[0].username:'-'}}
            </span>
          </p>
          <p class="info">
            <span
              class="info_icon"
              :style="{background: '#00ACCC'}"
            ></span>
            <span class="info_title">
              手机号：{{userDataList.length? userDataList[0].tel:'-'}}
            </span>
          </p>

        </Card>

        <Card
          title="设备基本状态"
          :bodyStyle="{
          background:'#ffffff'
          ,boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)'
          ,padding:'0 24px'
        }"
        >
          <Description
            :bordered="false"
            :column="4"
            :data="infoList"
            :schema="refundSchema"
            :size="'default'"
          />
        </Card>
        <Card
          title="设备网络信息"
          :bodyStyle="{
          background:'#ffffff'
          ,boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)'
          ,padding:'0 24px'
        }"
        >
          <Description
            :bordered="false"
            :column="4"
            :data="netWorkData"
            :schema="netWorkStatusSchema"
            :size="'default'"
          />
        </Card>
      </TabPane>
      <!-- <TabPane
        key="2"
        tab="历史记录"
      >
        Content of Tab Pane 1
      </TabPane> -->
    </Tabs>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { Tabs, Card } from 'ant-design-vue';
import { Description } from '/@/components/Description/index';
import D_Time from '/@/assets/images/device/status/time.png';
import D_Status from '/@/assets/images/device/status/status.png';

import {
  DeviceDetialNetWork,
  GetlistUserByDeviceId,
  GetDeviceStatusByPage,
} from '/@/api/demo/table';
import { refundSchema, netWorkStatusSchema } from '../../data';

export default defineComponent({
  components: {
    Description,
    BasicDrawer,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
    Card,
  },
  setup() {
    const state = reactive({
      colorList: [
        '#4880FF',
        '#00b9d7',
        '#FAA824',
        '#FF326E',
        '#7A41F2',
        '#ff5f59',
        '#ffc400',
        '#0079ed',
        '#37586d',
        '#cc5364',
      ],
      userDataList: [],
      infoList: {},
      errorData: '',
      netWorkData: {},
      createTime: '',
    });

    const [register] = useDrawerInner((data) => {
      // 方式1
      state.createTime = data.record.createTime;
      if (data.record.deviceErrorDataVO) {
        getErrorData(data.record.deviceErrorDataVO);
      } else {
        state.errorData = '设备良好，请继续保持';
      }

      getAll(data.record);
    });
    function callback(key) {
      console.log(key);
    }
    const getAll = async (currentRoute) => {
      const data = await Promise.all([
        DeviceDetialNetWork({ deviceId: currentRoute.deviceId }),
        GetDeviceStatusByPage({ deviceId: currentRoute.deviceId }),
        GetlistUserByDeviceId({ deviceId: currentRoute.deviceId }),
      ]);
      state.netWorkData = data[0];
      state.infoList = data[1];
      state.userDataList = data[2];
    };
    const closeFunc = () => {
      console.log('哈哈');
      state.userDataList = [];
      state.infoList = {};
      state.netWorkData = {};
      state.errorData = '';
    };
    const getErrorData = (data) => {
      if (parseInt(data.co2Error)) {
        state.errorData = 'CO2传感器故障';
      } else if (parseInt(data.exhaustError)) {
        state.errorData = '排风电机故障';
      } else if (parseInt(data.mainDoorError)) {
        state.errorData = '主机柜门未关闭故障';
      } else if (parseInt(data.motorError)) {
        state.errorData = '新风电机故障';
      } else if (parseInt(data.pm25Error)) {
        state.errorData = 'PM2.5传感器故障';
      } else if (parseInt(data.powerDisplayError)) {
        state.errorData = '电源板与显示板之间通讯故障';
      } else if (parseInt(data.stepError)) {
        state.errorData = '步进电机故障';
      } else if (parseInt(data.temperatureError)) {
        state.errorData = '室外温度传感器故障';
      } else {
        state.errorData = '设备良好，请继续保持';
      }
    };
    return {
      D_Time,
      D_Status,
      refundSchema,
      netWorkStatusSchema,
      closeFunc,
      register,
      callback,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
@color: #00b9d7;
/deep/.ant-tabs-nav {
  .ant-tabs-tab-active {
    color: @color;
  }
  .ant-tabs-ink-bar {
    background-color: @color;
  }
}
/deep/.ant-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
.ant-card {
  border-radius: 16px;
  overflow: hidden;
  margin-top: 30px;

  .info {
    &_icon {
      width: 10px;
      height: 10px;
      background: #4880ff;
      display: inline-block;
      margin-right: 3px;
      border-radius: 50%;
    }
    &_title {
      font-size: 7px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3f4157;
    }
  }
}
.device_Time {
  height: 120px;

  .device_Time_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 24px;
    .left_Title {
      display: flex;
      align-items: center;
      &_icon {
        width: 18px;
        height: 18px;
        background: #000;
        display: inline-block;
        margin-right: 8.5px;
      }
      &__item {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3f4157;
        text-shadow: 0 5px 25px #f5f5f5;
      }
    }
    .rightT {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #6d7278;
      text-shadow: 0 5px 25px #f5f5f5;
    }
  }
}
</style>
