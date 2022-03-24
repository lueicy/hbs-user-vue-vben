<template>
  <div :class="`${prefixCls}__content`">
    <div class="title_Contr">
      <div class="title_Contr_name fl"> 设备概况 </div>
      <template v-if="valueList.length">
        <SlideXReverseTransition v-for="(item, index) in selectTitle" :key="index">
          <a-button
            :style="{
              backgroundColor: item.num == 4 ? '#00B9D7' : '',
              color: item.num == 4 ? '#ffffff' : '',
            }"
            class="title_Contr_btm fr"
            @click="selectAll(item.num)"
          >
            {{ item.name }}
          </a-button>
        </SlideXReverseTransition>
      </template>
      <template v-else>
        <SlideXReverseTransition>
          <a-button class="title_Contr_btm fr" @click="chegnSelect" v-if="!actionSelect">
            选择
          </a-button>
          <a-button v-else class="title_Contr_btm changeClass fr" @click="chegnSelect">
            取消
          </a-button>
        </SlideXReverseTransition>
      </template>
    </div>
    <a-list>
      <a-checkbox-group v-model:value="valueList" @change="onCheckAllChangeList">
        <a-row :gutter="16">
          <template v-for="(item, i) in modeTyleList" :key="item.title">
            <a-col :span="4">
              <a-list-item>
                <a-card
                  v-ripple
                  :hoverable="false"
                  :class="`${prefixCls}__card`"
                  @click="handleView(item)"
                >
                  <div :class="`${prefixCls}__card-title-name`" class="flex justify-center">
                    <span class="name">厦门呼博士的名称</span>
                  </div>
                  <div :class="`${prefixCls}__card-title`">
                    <!-- <div
                      class="status fl"
                      :style="{
                        backgroundColor: [i % 2 == 0 ? '#00b9d7' : '#838A9D'],
                        marginRight: '8px',
                      }"
                      >{{ i % 2 == 0 ? '开机' : '关机' }}</div
                    >
                    <div class="air fl" :style="{ backgroundColor: airQuity(i).color }">
                      {{ airQuity(i).name }}
                    </div> -->
                    <div class="fl group-name"> 群组位置：{{ airQuity(i).name }} </div>
                    <div class="online fr">
                      <span
                        :style="{ color: i % 3 == 0 ? '' : '#A6AAB8' }"
                        class="dib iconify"
                        :data-icon="i % 3 == 0 ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
                      ></span>

                      <span :style="{ color: i % 3 == 0 ? '' : '#A6AAB8' }">
                        {{ i % 3 == 0 ? '在线' : '离线' }}
                      </span>
                    </div>
                  </div>
                  <div :class="`${prefixCls}__card-detail`">
                    <!-- 基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统 -->
                    <!-- <img :src="item.url" alt="" /> -->
                    <div
                      class="flex flex-col items-center justify-center"
                      :style="{
                        backgroundImage: 'url(' + item.url + ')',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        width: '147px',
                        height: '135px',
                      }"
                    >
                      <span class="mb-6 aqi-title">AQI</span>
                      <span class="air-status" :style="{ color: dealAqires('style', item.aqi) }">{{
                        dealAqires('text', item.aqi)
                      }}</span>
                      <!-- <span class="dib iconify-inline" data-icon="lucide:edit-3"></span> -->
                    </div>

                    <br />
                  </div>
                  <div :class="`${prefixCls}__card-title`" style="height: 60px">
                    <div class="flex justify-between">
                      <span>PM2.5</span>
                      <span style="width: 92px">
                        <a-progress
                          :percent="item.pmValue"
                          :show-info="false"
                          :strokeColor="dealAqires('style', item.aqi)"
                        />
                      </span>
                      <span> 10ug/m³</span>
                    </div>
                    <div class="flex justify-between">
                      <span style="width: 45px">CO2</span>
                      <span style="width: 92px">
                        <a-progress
                          :percent="item.coValue"
                          :show-info="false"
                          :strokeColor="dealAqires('style', item.aqi)"
                        />
                      </span>
                      <span style="width: 60px">1000pppm</span>
                    </div>
                  </div>
                  <div :class="`${prefixCls}__card-title`">
                    <div class="autoTag fl">智能</div>
                    <div class="windTag fl">高速风</div>
                    <div class="mainTag fr">
                      <span class="dib iconify-inline" data-icon="wpf:maintenance"></span>
                      <span> 维护周期剩余2个月 </span>
                    </div>
                  </div>

                  <template v-if="actionSelect">
                    <!-- 遮罩层 -->
                    <div :class="`${prefixCls}__card-bgColor`"></div>
                    <!-- 多选框 -->
                    <a-checkbox :value="item.id" />
                  </template>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-checkbox-group>
    </a-list>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed } from 'vue';
  import { Card, Row, Col, List, Progress } from 'ant-design-vue';
  import { airQuity } from '/@/utils/other/data';
  import { useDrawer } from '/@/components/Drawer';
  import { cardList } from '../data';
  import deviceImg_green from '/@/assets/images/device/device/green.png';
  import deviceImg_good from '/@/assets/images/device/device/good.png';
  import deviceImg_bad from '/@/assets/images/device/device/bad.png';
  import deviceImg_off from '/@/assets/images/device/device/off.png';
  const modeTyleList: any[] = [
    { name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { name: 'EH-Z-7B200F', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { name: 'XS-D250A', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
  ];
  import RippleDirective from '/@/directives/ripple';

  interface selectTitleType {
    name?: string;
    num?: Number;
    valueList?: any[];
  }

  const selectTitle: selectTitleType[] = [
    {
      name: '更多',
      num: 0,
    },
    {
      name: '全关',
      num: 1,
    },
    {
      name: '全开',
      num: 2,
    },
    {
      name: '取消',
      num: 3,
    },
    {
      name: '全选',
      num: 4,
    },
  ];

  export default defineComponent({
    components: {
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
      [Progress.name]: Progress,
    },
    directives: {
      Ripple: RippleDirective,
    },

    setup() {
      // 判断空气质量，根据结果显示样式
      // color: #52c41a; //清新  color: #A9A9AF; //离线 color: #FFC400; //良好 color: #FF4D4F; //污浊
      const dealAqires = computed(() => {
        return function (type, event) {
          let colStyle = '';
          let aqiText = '';
          switch (event) {
            case '1':
              colStyle = '#52c41a';
              aqiText = '清新';
              break;
            case '2':
              colStyle = '#FFC400';
              aqiText = '良好';
              break;
            case '3':
              colStyle = '#FF4D4F';
              aqiText = '污浊';
              break;
            case '4':
              colStyle = '#A9A9AF';
              aqiText = '离线';
              break;
            default:
              colStyle = '#A9A9AF';
              aqiText = '离线';
          }
          return type === 'style' ? colStyle : aqiText;
        };
      });
      const [register5, { openDrawer: openDrawer5, setDrawerProps }] = useDrawer();
      const state = reactive({
        indeterminate: true,
        actionSelect: false, //是否开启选择
        checkedList: [],
        // valueList: [],
      });
      const lisState = reactive<selectTitleType>({
        valueList: [],
      });

      function handleView(item) {
        if (state.actionSelect) return; //判断选择按钮是否开启
        openDrawer5(true, { record: item });
        setDrawerProps({ loading: true });
        setTimeout(() => {
          setDrawerProps({ loading: false });
        }, 1000);
      }
      // onMounted(() => handleView());
      const onCheckAllChangeList = (e: any) => {
        console.log('e===', e);
        Object.assign(state, {
          valueList: e,
          indeterminate: false,
        });
      };
      const getSelectList = () => cardList.map((item) => item.id);

      const getAllCheck = () => {
        console.log('执行。');
        Object.assign(lisState, {
          valueList: getSelectList(),
        });
      };
      const getAllCancel = () => {
        Object.assign(lisState, {
          valueList: [],
        });
      };
      const selectAll = (id) => {
        console.log('id---', id);
        switch (id) {
          case 4:
            getAllCheck();
            break;
          case 3:
            getAllCancel();
            break;

          default:
            break;
        }
      };
      const chegnSelect = () => (
        (state.actionSelect = !state.actionSelect), (lisState.valueList = [])
      );
      return {
        prefixCls: 'list-card',
        list: cardList,
        selectTitle,
        airQuity,
        handleView,
        ...toRefs(lisState),
        ...toRefs(state),
        register5,
        selectAll,
        getAllCheck,
        onCheckAllChangeList,
        chegnSelect,
        modeTyleList,
        dealAqires,
      };
    },
  });
</script>
<style lang="less" scoped>
  .group-name {
    // width: 60px;
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #999999;
    opacity: 1;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .dib {
    display: inline-block;
  }
  @colorThem: #00b9d7;
  .btmClass {
    text-align: center;
    padding: 0 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    border-radius: 8px !important;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
  }
  .title_Contr {
    height: 28px;
    margin-right: 16px;

    &_name {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3e4159;
      line-height: 28px;
    }
    &_btm {
      .btmClass();
      line-height: 24px;
      border-radius: 6px;
      border: 2px solid @colorThem;
      color: @colorThem;
      margin-left: 12px;
    }
    .changeClass {
      background-color: @colorThem;
      color: #ffffff;
    }
  }
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;
      width: 250px;
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      /deep/.ant-card-body {
        padding: 0px 10px 10px 10px !important;
      }

      &-title {
        height: 20px;
        .status,
        .air,
        .autoTag,
        .windTag,
        .mainTag,
        .online {
          .btmClass();
        }

        .online {
          color: #00b9d7;
          padding-right: 0;
          .iconify {
            width: 18px;
            height: 18px;
            margin-bottom: 4px;
            margin-right: 2px;
          }
        }
        .autoTag,
        .windTag {
          padding: 0;
          color: #a6aab8;
          background: #f5f6f8;
          padding: 0 4px;
        }
        .mainTag {
          padding: 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #3e4159;
        }
        &-name {
          margin: auto;
          margin-bottom: 9px;
          width: 140px;
          height: 27px;
          background: rgba(230, 230, 244, 0.39);
          box-shadow: 0px 1px 2px rgba(168, 198, 204, 0.67);
          .name {
            width: 112px;
            height: 19px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 24px;
            color: #3e4159;
            opacity: 1;
          }
        }
      }

      &-detail {
        text-align: center;
        margin: 0px auto 12px;
        font-size: 14px;
        color: @text-color-secondary;
        width: 150px;
        height: 135px;
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
          color: #a6aab8;
          border-bottom: 235px #606170 1px;
        }
        .aqi-title {
          width: 30px;
          height: 21px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 600;
          line-height: 24px;
          color: #3e4159;
          opacity: 1;
        }
        // color: #A9A9AF; //离线
        // color: #FFC400; //良好
        // color: #FF4D4F; //污浊
        .air-status {
          width: 68px;
          height: 45px;
          font-size: 34px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 24px;
          color: #52c41a; //清新
          opacity: 1;
        }
      }
      // 遮罩层
      &-bgColor {
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      // 多选框---未选中
      /deep/.ant-checkbox {
        position: absolute;
        top: 11px;
        right: 18px;

        .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 4px;
          border-color: #ffffff;
        }
      }
      // 多选框---选中
      /deep/.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: @colorThem;
          border-color: @colorThem;
        }
      }
    }
    &__card:hover {
      border: 1px solid #09b9dc;
    }
  }
</style>
