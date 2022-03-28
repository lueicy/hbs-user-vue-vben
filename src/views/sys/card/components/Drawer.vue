<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    :showDetailBack="false"
    @close="closeFunc"
    @register="register"
    width="370px"
    title=""
    :bodyStyle="{
      background: '#F2F2F2',
    }"
  >
    <Tabs default-active-key="1" @change="callback" :tabBarGutter="100">
      <TabPane key="1" tab="更多控制">
        <!-- 设备激活时间和设备状态 -->

        <div :class="`device_Time__card-detail`">
          <img :src="imgURl" alt="" />
          <span class="DeviceName">新风机</span> F
          <br />
          <span class="DeviceMode">{{ modeTitle }}</span>
        </div>

        <Card
          title=""
          :bodyStyle="{
            padding: '0 24px',
            background: '#ffffff',
            boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)',
          }"
        >
          <div class="isOpen">
            <div class="isOpen_title">
              <span class="status"> 开关机 </span>
              <br />
              <span class="open" v-if="checked1"> 已开机 </span>
            </div>
            <Switch v-model:checked="checked1" />
          </div>
        </Card>

        <Card
          title="模式"
          :bodyStyle="{
            background: '#ffffff',
            boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)',
            padding: '0 15px',
          }"
        >
          <div class="modeSelect">
            <a-button
              class="modeSelect_btm"
              :class="[index == 1 && checked1 ? 'btmActive' : '']"
              v-for="(item, index) in modeList"
              :key="index"
              :style="{ marginRight: item.num == 3 ? '0' : '30px' }"
              :disabled="!checked1"
            >
              {{ item.name }}
            </a-button>
          </div>
        </Card>
        <Card
          title="风速"
          :bodyStyle="{
            background: '#ffffff',
            boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)',
            padding: '0 15px',
          }"
        >
          <div class="modeSelect">
            <a-button
              class="modeSelect_btm"
              :disabled="!checked1"
              :class="[index == 1 && checked1 ? 'btmActive' : '']"
              v-for="(item, index) in windList"
              :key="index"
              :style="{ marginRight: item.num == 3 ? '0' : '30px' }"
            >
              {{ item.name }}
            </a-button>
          </div>
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
  // import { Tabs, Card, TabPane, Switch, Button } from 'ant-design-vue';
  import { Tabs, Card, Switch, Button } from 'ant-design-vue';
  import { Description } from '/@/components/Description/index';
  import D_Time from '/@/assets/images/device/status/time.png';
  import D_Status from '/@/assets/images/device/status/status.png';
  import deviceImg_650 from '/@/assets/images/device/setModel/650.png';
  // import deviceImg_650_All from '/@/assets/images/device/setModel/650_All.png';
  import deviceImg_400 from '/@/assets/images/device/setModel/400.png';
  // import deviceImg_400_All from '/@/assets/images/device/setModel/400_All.png';
  import deviceImg_350 from '/@/assets/images/device/setModel/350.png';
  // import deviceImg_350_All from '/@/assets/images/device/setModel/350_All.png';
  import deviceImg_200 from '/@/assets/images/device/setModel/200.png';
  // import deviceImg_200_All from '/@/assets/images/device/setModel/200_All.png';
  import deviceImg_150 from '/@/assets/images/device/setModel/150.png';
  // import deviceImg_150_All from '/@/assets/images/device/setModel/150_All.png';
  import { modeTypeList } from '/@/utils/other/data';
  const modeTyleList: string[] = [
    'EH-Z-7G650',
    // 'EH-Z-7G750',
    'EH-Z-7G400A',
    'EH-Z-7B200F',
    // 'EH-Z-7B200F-HET',
    // 'XS-D500A',
    'XS-D350A',
    // 'XS-D250A',
    'XS-D150A',
    // 'XS-D250A-XHK',
  ];
  const imgList = [deviceImg_650, deviceImg_400, deviceImg_200, deviceImg_350, deviceImg_150];
  export default defineComponent({
    components: {
      Description,
      BasicDrawer,
      TabPane: Tabs.Pane,
      Tabs,
      Switch,
      Button,
      // [Tabs.name]: Tabs,
      // [Tabs.TabPane.name]: Tabs.TabPane,
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
        WorkData: {},
        createTime: '',
        checked1: false,
        modeList: [],
        modeTitle: '',
        windList: [
          {
            name: '高',
            num: 1,
          },
          {
            name: '中',
            num: 2,
          },
          {
            name: '弱',
            num: 3,
          },
        ],
        imgURl: '',
      });

      const [register] = useDrawerInner((data) => {
        // 方式1
        console.log('data.record', data.record.name);
        console.log('data.record', modeTyleList.indexOf(data.record.name));
        let imgIndex = modeTyleList.indexOf(data.record.name);
        state.imgURl = imgList[imgIndex];
        state.modeList = modeTypeList[imgIndex];
        state.modeTitle = data.record.name;
        // state.createTime = data.record.createTime;
        // if (data.record.deviceErrorDataVO) {
        //   getErrorData(data.record.deviceErrorDataVO);
        // } else {
        //   state.errorData = '设备良好，请继续保持';
        // }
      });
      function callback(key) {
        console.log(key);
      }

      const closeFunc = () => {
        console.log('哈哈');
        state.userDataList = [];
        state.infoList = {};
        state.netWorkData = {};
        state.errorData = '';
        state.imgURl = '';
      };

      return {
        D_Time,
        D_Status,
        closeFunc,
        register,
        callback,
        deviceImg_200,
        ...toRefs(state),
      };
    },
  });
</script>

<style lang="less" scoped>
  @color: #00b9d7;
  .colora6aab8 {
    color: #a6aab8;
  }
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
    // 开关机状态
    .isOpen {
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .status {
        font-size: 16px;
        font-family: HarmonyHeiTi;
        color: #3e4159;
      }
      .open {
        font-size: 12px;
        font-family: HarmonyHeiTi;
        color: #000000;
      }
      .ant-switch-checked {
        background-color: @color;
      }
    }
    //
    /deep/.ant-card-head {
      border-bottom: 3px solid #e9e9e9;
    }
    .modeSelect {
      padding: 10px 0;
      &_btm {
        width: 80px;
        height: 40px;
        border-radius: 8px;
        font-size: 16px;
        font-family: HarmonyHeiTi-Medium, HarmonyHeiTi;
        font-weight: 500;
        margin: 10px 0;
        background-color: #f5f6f8;
        .colora6aab8();
      }
      .btmActive {
        background: @color;
        color: #ffffff;
      }
    }
  }

  .device_Time__card-detail {
    text-align: center;
    margin: 28px auto 12px;
    font-size: 14px;
    color: @text-color-secondary;
    width: 150px;
    height: 200px;
    .iconify-inline {
      margin-left: 8px;
    }
    .DeviceName {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3e4159;
    }
    .DeviceMode {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      .colora6aab8();
    }
  }

  // 隐藏抽屉头部样式
  /deep/.vben-basic-drawer__detail {
    .ant-drawer-header {
      display: none;
    }
  }
</style>
