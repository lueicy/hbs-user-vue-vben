<template>
  <div :class="`${prefixCls}__content`" class="flex flex-col">
    <div class="title_Contr">
      <div class="title_Contr_name fl"> {{ groupId }} </div>
      <a-button
        class="title_Contr_btm fr"
        style="background-color: #00b9d7; color: #ffffff"
        @click="chegnSelect"
      >
        全开
      </a-button>
      <a-button
        class="title_Contr_btm fr"
        style="background-color: #00b9d7; color: #ffffff"
        @click="chegnSelect"
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
                    <span class="name">{{ groupId }} 厦门呼博士的名称</span>
                  </div>
                  <div :class="`${prefixCls}__card-title`">
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
                    <div class="fl">滤网维护周期</div>
                    <!-- <div class="windTag fl">高速风</div> -->
                    <div class="mainTag fr">
                      <span> 2个月 </span>
                    </div>
                  </div>
                  <div :class="`${prefixCls}__card-title`" class="flex justify-between w-full">
                    <div style="width: 90px; height: 20px">
                      <div class="fl">模式</div>
                      <div class="online fr">
                        <span
                          :style="{ color: i % 3 == 0 ? '' : '#A6AAB8' }"
                          class="dib iconify"
                          :data-icon="i % 3 == 0 ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
                        ></span>

                        <span :style="{ color: i % 3 == 0 ? '' : '#A6AAB8' }">
                          {{ i % 3 == 0 ? '新风' : '循环' }}
                        </span>
                      </div>
                    </div>
                    <div style="width: 80px; height: 20px">
                      <div class="fl">风速</div>
                      <div class="online fr">
                        <span
                          :style="{ color: i % 3 == 0 ? '' : '#A6AAB8' }"
                          class="dib iconify"
                          :data-icon="i % 3 == 0 ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
                        ></span>

                        <span :style="{ color: i % 3 == 0 ? '' : '#A6AAB8' }">
                          {{ i % 3 == 0 ? '强' : '弱' }}
                        </span>
                      </div>
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

    <component :is="currentModal" v-model:visible="modalVisible" :userData="userData" />
    <RemoveModel @register="register1" :minHeight="100" />
    <AddModel @register="register4" :minHeight="100" />

    <Drawer @register="register5" />
  </div>
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
  import { Card, Row, Col, List, Progress, CheckboxGroup, Checkbox } from 'ant-design-vue';
  import { airQuity } from '/@/utils/other/data';
  import { useDrawer } from '/@/components/Drawer';
  import Drawer from './Drawer.vue';
  import { cardList } from '../data';
  import RemoveModel from './RemoveModel.vue';
  import AddModel from './AddModel.vue';
  import { useModal } from '/@/components/Modal';
  // import { SlideXReverseTransition } from '/@/components/Transition'; //动画
  import deviceImg_green from '/@/assets/images/device/device/green.png';
  import deviceImg_good from '/@/assets/images/device/device/good.png';
  import deviceImg_bad from '/@/assets/images/device/device/bad.png';
  import deviceImg_off from '/@/assets/images/device/device/off.png';
  import bus from '/@/utils/bus';
  const modeTyleList: any[] = [
    { id: 1, name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 2, name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { id: 3, name: 'EH-Z-7B200F', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { id: 4, name: 'XS-D250A', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { id: 5, name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { id: 6, name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 7, name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { id: 8, name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { id: 9, name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 10, name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { id: 11, name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 12, name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { id: 13, name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { id: 14, name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 15, name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { id: 16, name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 17, name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { id: 18, name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { id: 19, name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 20, name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
    { id: 21, name: 'EH-Z-7G650', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 22, name: 'EH-Z-7G400A', url: deviceImg_good, aqi: '2', pmValue: 40, coValue: 50 },
    { id: 23, name: 'EH-Z-7B200F', url: deviceImg_bad, aqi: '3', pmValue: 50, coValue: 60 },
    { id: 24, name: 'XS-D250A', url: deviceImg_green, aqi: '1', pmValue: 30, coValue: 20 },
    { id: 25, name: 'XS-D150A', url: deviceImg_off, aqi: '4', pmValue: 0, coValue: 0 },
  ];
  import RippleDirective from '/@/directives/ripple';

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
      [CheckboxGroup.name]: CheckboxGroup,
      [Checkbox.name]: Checkbox,
    },
    directives: {
      Ripple: RippleDirective,
    },
    props: {
      groupId: {
        type: String,
        default: '',
      },
    },
    setup() {
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
        valueList: [],
      });
      // const lisState = reactive<selectTitleType>({
      //   valueList: [],
      // });

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
        bus.emit('showDetail222', item);
        console.log('点击查看详情', item);
        // if (state.actionSelect) return; //判断选择按钮是否开启
        // openDrawer5(true, { record: item });
        // setDrawerProps({ loading: true });
        // setTimeout(() => {
        //   setDrawerProps({ loading: false });
        // }, 1000);
      }
      // onMounted(() => handleView());
      onMounted(() => {
        console.log('valueList', state.valueList, state.valueList.length);
      });
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
        register5,
        selectAll,
        getAllCheck,
        onCheckAllChangeList,
        chegnSelect,
        addDevice,
        modeTyleList,
        dealAqires,
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
