<template>
  <div :class="`${prefixCls}__content`" class="flex flex-col">
    <div class="title_Contr">
      <div class="title_Contr_name fl"> {{ groupId == 'total' ? '设备概况' : groupName }} </div>
      <a-button
        class="title_Contr_btm fr"
        style="background-color: #00b9d7; color: #ffffff"
        @click="switchBtn('1')"
      >
        全开
      </a-button>
      <a-button
        class="title_Contr_btm fr"
        style="background-color: #00b9d7; color: #ffffff"
        @click="switchBtn('0')"
      >
        全关
      </a-button>
      <a-button class="title_Contr_btm fr" @click="addDevice"> 添加设备 </a-button>
      <template v-if="valueList.length">
        <div v-for="(item, index) in selectTitle" :key="index">
          <a-button class="title_Contr_btm fr" @click="selectAll(item.num)">
            {{ item.name }}
          </a-button>
        </div>
      </template>
      <template v-else>
        <div>
          <a-button class="title_Contr_btm fr" @click="chegnSelect" v-if="!actionSelect">
            编辑
          </a-button>
          <a-button v-else class="title_Contr_btm fr" @click="chegnSelect"> 取消 </a-button>
        </div>
      </template>
    </div>
    <!-- <div
      v-scroll="handleInfiniteOnLoad"
      class="demo-infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="50"
    > -->
    <a-list :pagination="paginationProp">
      <CheckboxGroup v-model:value="valueList" @change="onCheckAllChangeList">
        <a-row :gutter="16">
          <template v-for="(item, i) in devicesList" :key="item.deviceId">
            <a-col :span="4">
              <a-list-item>
                <a-card
                  v-ripple
                  :hoverable="false"
                  :class="`${prefixCls}__card`"
                  @click="handleView(item)"
                >
                  <div :class="`${prefixCls}__card-title-name`" class="flex justify-center">
                    <span class="name">{{ item.deviceName }}</span>
                  </div>
                  <div :class="`${prefixCls}__card-title`">
                    <div class="fl group-name"> 群组位置：{{ item.groupList[0] }} </div>
                    <div class="online fr">
                      <span
                        :style="{ color: item.online == '10' ? '' : '#A6AAB8' }"
                        class="dib iconify"
                        :data-icon="item.online == '10' ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
                      ></span>

                      <span :style="{ color: item.online == '10' ? '' : '#A6AAB8' }">
                        {{ item.online == '10' ? '在线' : '离线' }}
                      </span>
                    </div>
                  </div>
                  <div :class="`${prefixCls}__card-detail`">
                    <div
                      v-if="item.online == '10'"
                      class="flex flex-col items-center justify-center"
                      :style="{
                        backgroundImage: 'url(' + dealAqires('url', item.airQuality) + ')',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        width: '147px',
                        height: '135px',
                      }"
                    >
                      <span class="mb-6 aqi-title">AQI</span>
                      <span
                        class="air-status"
                        :style="{ color: dealAqires('style', item.airQuality) }"
                        >{{ dealAqires('text', item.airQuality) }}</span
                      >
                    </div>
                    <div
                      v-else
                      class="flex flex-col items-center justify-center"
                      :style="{
                        backgroundImage: 'url(' + dealAqires('url', '04') + ')',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        width: '147px',
                        height: '135px',
                      }"
                    >
                      <span class="mb-6 aqi-title">AQI</span>
                      <span class="air-status" :style="{ color: dealAqires('style', '04') }">
                        {{ item.open == '00' ? '关机' : '离线' }}
                      </span>
                    </div>

                    <br />
                  </div>
                  <div :class="`${prefixCls}__card-title`" style="height: 60px">
                    <div class="flex justify-between">
                      <span style="width: 40px">PM2.5</span>
                      <span style="width: 92px">
                        <a-progress
                          :percent="item.pm25Real"
                          :show-info="false"
                          :strokeColor="dealAqires('style', item.airQuality)"
                        />
                      </span>
                      <span style="width: 77px; text-align: end"> {{ item.pm25Real }}ug/m³</span>
                    </div>
                    <div class="flex justify-between">
                      <span style="width: 40px">CO2</span>
                      <span style="width: 92px">
                        <a-progress
                          :percent="dealAirQuality(item.co2Real)"
                          :show-info="false"
                          :strokeColor="dealAqires('style', item.airQuality)"
                        />
                      </span>
                      <span style="width: 77px; text-align: end">{{ item.co2Real }}ppm</span>
                    </div>
                  </div>
                  <div :class="`${prefixCls}__card-title`">
                    <div class="fl">滤网维护周期</div>
                    <!-- <div class="windTag fl">高速风</div> -->
                    <div class="mainTag fr">
                      <span :style="{ color: item.meshCycle < 43200 ? '#FF5F59' : '' }">
                        {{ dealFixTime(item.meshCycle) }}个月
                      </span>
                    </div>
                  </div>
                  <div :class="`${prefixCls}__card-title`" class="flex justify-between w-full">
                    <div style="width: 90px; height: 20px">
                      <div class="fl">模式</div>
                      <div class="online fr">
                        <span
                          :style="{ color: item.online == '10' ? '' : '#A6AAB8' }"
                          class="dib iconify"
                          :data-icon="
                            item.online == '10'
                              ? 'ic:outline-font-download'
                              : 'ic:outline-font-download-off'
                          "
                        ></span>

                        <span
                          :style="{
                            color: item.online == '10' ? '' : '#A6AAB8',
                            marginLeft: '5px',
                          }"
                        >
                          {{ dealPattern(item.pattern) }}
                        </span>
                      </div>
                    </div>
                    <div style="width: 80px; height: 20px">
                      <div class="fl">风速</div>
                      <div class="online fr">
                        <span
                          :style="{ color: item.online == '10' ? '' : '#A6AAB8' }"
                          class="dib iconify"
                          :data-icon="
                            item.wind == '01' ? 'ic:sharp-wind-power' : 'ic:outline-wind-power'
                          "
                        ></span>

                        <span
                          :style="{
                            color: item.online == '10' ? '' : '#A6AAB8',
                            marginLeft: '5px',
                          }"
                        >
                          {{ dealWind(item.wind) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <template v-if="actionSelect">
                    <!-- 遮罩层 -->
                    <div :class="`${prefixCls}__card-bgColor`"></div>
                    <!-- 多选框 -->
                    <Checkbox :value="item.deviceId" />
                  </template>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </CheckboxGroup>
    </a-list>
    <!-- </div> -->
  </div>

  <component :is="currentModal" v-model:visible="modalVisible" :userData="userData" />
  <RemoveModel @register="register1" :minHeight="100" />
  <AddModel @register="register4" :minHeight="100" />

  <!-- <Drawer @register="register5" /> -->
  <!-- </div> -->
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    toRefs,
    computed,
    onMounted,
    shallowRef,
    ComponentOptions,
    ref,
    nextTick,
  } from 'vue';
  import { Card, Row, Col, List, Progress, Checkbox } from 'ant-design-vue';
  import { airQuity } from '/@/utils/other/data';
  // import { useDrawer } from '/@/components/Drawer';
  import Drawer from './Drawer.vue';
  import { cardList } from '../data';
  import RemoveModel from './RemoveModel.vue';
  import AddModel from './AddModel.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useI18n } from '/@/hooks/web/useI18n';
  import deviceImg_green from '/@/assets/images/device/device/green.png';
  import deviceImg_good from '/@/assets/images/device/device/good.png';
  import deviceImg_bad from '/@/assets/images/device/device/bad.png';
  import deviceImg_off from '/@/assets/images/device/device/off.png';
  import bus from '/@/utils/bus';
  import {
    GetAllDeviceApi,
    GetDeviceByGroupIdApi,
    OnOffSwitchApi,
  } from '/@/api/sys/groupAndDevice';
  import RippleDirective from '/@/directives/ripple';
  // import infiniteScroll from 'vue-infinite-scroll';

  interface selectTitleType {
    name?: string;
    num?: Number;
    valueList?: any[];
  }

  const selectTitle: selectTitleType[] = [
    {
      name: '全选',
      num: 0,
    },
    {
      name: '取消选中',
      num: 1,
    },
    {
      name: '移动',
      num: 2,
    },
  ];

  export default defineComponent({
    components: {
      Drawer,
      RemoveModel, // 移动弹窗
      AddModel, // 添加设备弹窗
      // SlideXReverseTransition,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
      [Progress.name]: Progress,
      CheckboxGroup: Checkbox.Group,
      Checkbox,
    },
    directives: {
      Ripple: RippleDirective,
      // Scroll: infiniteScroll,
    },
    props: {
      groupId: {
        type: String,
        default: '',
      },
      groupName: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const state = reactive({
        indeterminate: true,
        actionSelect: false, //是否开启选择
        devicesList: [],
        checkedList: [],
        valueList: [],
        loading: false,
        busy: false,
      });
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();

      const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
      const [register1, { openModal: openModal1 }] = useModal();
      const [register4, { openModal: openModal4 }] = useModal();
      const modalVisible = ref<Boolean>(false);
      const userData = ref<any>(null);
      // 判断空气质量，根据结果显示样式
      // color: #52c41a; //清新  color: #A9A9AF; //离线 color: #FFC400; //良好 color: #FF4D4F; //污浊
      const dealAqires = computed(() => {
        return function (type, event) {
          let colStyle = '';
          let aqiText = '';
          let imageUrl = '';
          switch (event) {
            case '01':
              colStyle = '#52c41a';
              aqiText = '清新';
              imageUrl = deviceImg_green;
              break;
            case '02':
              colStyle = '#FFC400';
              aqiText = '良好';
              imageUrl = deviceImg_good;
              break;
            case '03':
              colStyle = '#FF4D4F';
              aqiText = '污浊';
              imageUrl = deviceImg_bad;
              break;
            case '04':
              colStyle = '#A9A9AF';
              aqiText = '离线';
              imageUrl = deviceImg_off;
              break;
            default:
              colStyle = '#A9A9AF';
              aqiText = '离线';
              imageUrl = deviceImg_off;
          }
          return type === 'style' ? colStyle : type === 'text' ? aqiText : imageUrl;
        };
      });
      // 计算co2含量的空气质量
      const dealAirQuality = computed(() => {
        return function (event) {
          let resNum = 0;
          if (event == 0) resNum = 0;
          if (event > 0 && event < 350) resNum = 10;
          if (event > 350 && event <= 1000) resNum = 20;
          if (event > 1000 && event <= 2000) resNum = 50;
          if (event > 2000 && event <= 5000) resNum = 80;
          if (event > 5000) resNum = 90;
          return resNum;
        };
      });
      // 计算维护周期
      const dealFixTime = computed(() => {
        return function (event) {
          let resNum = 0;
          if (event < 43200) resNum = 0;
          if (event > 43200) resNum = parseInt(event / 43200);
          return resNum;
        };
      });
      // 计算风速强弱
      const dealWind = computed(() => {
        return function (event) {
          let wind = '';
          switch (event) {
            case '01':
              wind = '弱';
              break;
            case '02':
              wind = '中';
              break;
            case '03':
              wind = '强';
              break;
          }
          return wind;
        };
      });
      // 计算运行模式
      // 模式 01:智能模式 02新风模式 03:净化模式 04:送风模式 05:排风模式 06:除味模式 07:节能模式 08:除湿模式 09:新风+除湿模式 8~:除霜模式（自动）4~:辅热模式（自动）2~:除湿模式（自动）
      const dealPattern = computed(() => {
        return function (event) {
          let patternText = '';
          switch (event) {
            case '01':
              patternText = '智能';
              break;
            case '02':
              patternText = '新风';
              break;
            case '03':
              patternText = '净化';
              break;
            case '04':
              patternText = '送风';
              break;
            case '05':
              patternText = '排风';
              break;
            case '06':
              patternText = '除味';
              break;
            case '07':
              patternText = '节能';
              break;
            case '08':
              patternText = '除湿';
              break;
            case '09':
              patternText = '新风+除湿';
              break;
            case '8~':
              patternText = '除霜(自动)';
              break;
            case '4~':
              patternText = '辅热(自动)';
              break;
            case '8~':
              patternText = '除湿(自动)';
              break;
            default:
              patternText = '智能';
          }
          return patternText;
        };
      });
      // const [register5, { openDrawer: openDrawer5, setDrawerProps }] = useDrawer();

      function openModalLoading() {
        openModal1(true);
        // setModalProps({ loading: true });
        // setTimeout(() => {
        //   setModalProps({ loading: false });
        // }, 2000);
      }
      function send() {
        openModal4(true, {
          data: 'content',
          info: 'Info',
        });
      }
      function openTargetModal(index) {
        switch (index) {
          case 1:
            currentModal.value = RemoveModel;
            break;
          case 2:
            currentModal.value = AddModel;
            break;
        }
        nextTick(() => {
          // `useModal` not working with dynamic component
          // passing data through `userData` prop
          userData.value = { data: Math.random(), info: 'Info222' };
          // open the target modal
          modalVisible.value = true;
        });
      }

      function handleView(item) {
        console.log('点击查看详情', state.actionSelect);
        if (state.actionSelect) return; //判断选择按钮是否开启
        bus.emit('showDetail222', item);
      }
      const onCheckAllChangeList = (e: any) => {
        console.log('e===', e);
        Object.assign(state, {
          valueList: e,
          indeterminate: false,
        });
      };
      const getSelectList = () => cardList.map((item) => item.id);
      async function switchBtn(event) {
        let switchRes = await OnOffSwitchApi({ status: event });

        try {
          if (switchRes && switchRes.code == 200) {
            createMessage.success('操作成功');
            fetch(props.groupId, page.value, pageSize.value);
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.msg || t('sys.api.networkExceptionMsg'),
            // getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          console.log('switchRes', switchRes);
        }
      }

      const getAllCheck = () => {
        console.log('执行。');
        Object.assign(state, {
          valueList: getSelectList(),
        });
      };
      const getAllCancel = () => {
        Object.assign(state, {
          valueList: [],
        });
      };
      const addDevice = () => {
        console.log('添加设备');
        openTargetModal(2);
      };
      const removeDevive = () => {
        console.log('移动设备', JSON.parse(JSON.stringify(state.valueList)));
        openTargetModal(1);
      };
      const selectAll = (id) => {
        console.log('id---', id);
        switch (id) {
          case 0:
            getAllCheck();
            break;
          case 1:
            getAllCancel();
            break;
          case 2:
            removeDevive();
            break;

          default:
            break;
        }
      };
      const chegnSelect = () => (
        (state.actionSelect = !state.actionSelect), (state.valueList = [])
      );

      // 获取分页数据
      async function fetch(groupId, index, size) {
        if (groupId == 'total') {
          // 获取所有的设备信息
          let res = await GetAllDeviceApi({ pageIndex: index, pageSize: size });
          state.devicesList = res.list;
          total.value = res.total;
          console.log('获取所有的设备信息', state.devicesList, total.value);
        } else {
          // 获取群组下的设备信息
          let res = await GetDeviceByGroupIdApi({
            pageIndex: index,
            pageSize: size,
            groupId: groupId,
          });
          state.devicesList = res.list;
          total.value = res.total;
          console.log('获取群组设备信息', state.devicesList);
        }
      }

      // 滚动加载
      // function handleInfiniteOnLoad() {
      // state.loading = true;
      // console.log('dadddd');
      // state.busy = true;
      // fetch(props.groupId, 1, 18);
      // if (data.length > 14) {
      //   // this.$message.warning('Infinite List loaded all');
      //   state.busy = true;
      //   state.loading = false;
      //   return;
      // }
      // this.fetchData(res => {
      //   state.valueList = data.concat(res.results);
      //   state.loading = false;
      // });
      // }

      //分页相关
      const page = ref(1);
      const pageSize = ref(18);
      const total = ref(0);
      const paginationProp = ref({
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize,
        current: page,
        total,
        showTotal: (total) => `总 ${total} 条`,
        onChange: pageChange,
        onShowSizeChange: pageSizeChange,
      });

      function pageChange(p, pz) {
        page.value = p;
        pageSize.value = pz;
        fetch(props.groupId, p, pz);
      }
      function pageSizeChange(_current, size) {
        pageSize.value = size;
        fetch(props.groupId, 1, size);
      }

      // onMounted(() => handleView());
      onMounted(() => {
        console.log('props.groupList', props.groupName);
        fetch(props.groupId, 1, 18);
      });
      return {
        register1,
        openModal1,
        register4,
        openModal4,
        modalVisible,
        userData,
        openTargetModal,
        send,
        currentModal,
        openModalLoading,
        prefixCls: 'list-card',
        list: cardList,
        selectTitle,
        airQuity,
        handleView,
        // ...toRefs(lisState),
        ...toRefs(state),
        // register5,
        selectAll,
        getAllCheck,
        onCheckAllChangeList,
        chegnSelect,
        switchBtn,
        addDevice,
        dealAqires,
        dealAirQuality,
        dealFixTime,
        dealPattern,
        dealWind,

        // handleInfiniteOnLoad,
        fetch,
        page,
        pageSize,
        total,
        paginationProp,
      };
    },
  });
</script>
<style lang="less" scoped>
  .group-name {
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 600;
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
      border: 1px solid rgba(217, 217, 217, 1);
      color: rgba(102, 102, 102, 1);
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
      &-footer {
        display: flex;
        justify-content: space-between;
        width: 100%;
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
            // margin-right: 2px;
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
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
        top: 6px;
        right: 10px;

        .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 4px;
          border-color: rgba(0, 0, 0, 0.15);
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
