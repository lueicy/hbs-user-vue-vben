<template>
  <div class="sta-container">
    <div class="flex flex-col">
      <div class="flex justify-between align-center sta-header">
        <div class="sta-h-txt">设备当前模式状态</div>
        <div class="sta-h-side">
          <a-select :value="selectValue" style="width: 100px" @change="handleChange">
            <a-select-option value="1">设备控制</a-select-option>
            <a-select-option value="2">定时模式</a-select-option>
            <a-select-option value="3">移除设备</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="flex justify-between sta-title">
        <div class="flex flex-col justify-between sta-title-l">
          <div class="flex">
            <div class="l-name" v-if="editStatus">
              {{ statusData.deviceName }}
              <Icon
                icon="ant-design:edit-filled"
                style="font-size: 22px; padding-left: 8px"
                @click="editStatus = false"
              />
            </div>
            <div class="l-name" v-if="!editStatus">
              <Input v-model:value="pageData.deviceName" />
              <button class="fecth-btn" @click="changeDeviceName">保存</button>
              <button class="fecth-btn" @click="editStatus = true">取消</button>
            </div>
          </div>
          <div>
            <span class="l-space">{{ statusData.groupList ? statusData.groupList : '' }}</span>
          </div>
        </div>
        <div
          v-if="online == '10'"
          class="flex flex-col items-center justify-center sta-title-m"
          :style="{
            backgroundImage: 'url(' + dealAqires('url', pageData.tvoc) + ')',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width: '313px',
            height: '284px',
          }"
        >
          <span class="mb-6 aqi-title">AQI</span>
          <span class="air-status" :style="{ color: dealAqires('style', pageData.tvoc) }">{{
            dealAqires('text', pageData.tvoc)
          }}</span>
        </div>
        <div
          v-else
          class="flex flex-col items-center justify-center sta-title-m"
          :style="{
            backgroundImage: 'url(' + deviceImg_off + ')',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width: '313px',
            height: '284px',
          }"
        >
          <span class="mb-6 aqi-title">AQI</span>
          <span class="air-status" :style="{ color: '#999999' }">离线</span>
        </div>
        <div class="flex items-center sta-title-r">
          <span
            :style="{ color: online == '10' ? '' : '#A6AAB8' }"
            class="dib iconify"
            :data-icon="online == '10' ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
          ></span>

          <span :style="{ color: online == '10' ? '' : '#A6AAB8' }">
            {{ online == '10' ? '在线' : '离线' }}
          </span>
        </div>
      </div>
      <div class="flex items-end justify-between sta-footer">
        <div class="flex flex-col sta-footer-l">
          <div style="width: 300px">
            <div class="flex justify-between">
              <span class="sta-footer-l-name">PM2.5</span>
              <div class="sta-footer-l-name">
                <span>{{ pageData.pm25Real }}</span>
                <span class="sta-footer-l-name-u">ug/m³</span>
              </div>
            </div>
            <div class="flex">
              <a-progress
                :percent="pageData.pm25Real"
                :show-info="false"
                :strokeColor="dealAqires('style', pageData.tvoc)"
                class="progress-border"
              />
              <span class="flex" :style="{ color: dealAqires('style', pageData.tvoc) }">
                <icon-font type="icon-greenpery" class="icon-g" />{{ dealText(pageData.tvoc) }}
              </span>
            </div>
          </div>
          <div style="width: 300px">
            <div class="flex justify-between">
              <span class="sta-footer-l-name">CO2</span>
              <div class="sta-footer-l-name">
                <span>{{ pageData.co2Real }}</span>
                <span class="sta-footer-l-name-u">ppm</span>
              </div>
            </div>
            <div class="flex">
              <a-progress
                :percent="dealAirQuality(pageData.co2Real)"
                :show-info="false"
                :strokeColor="dealAqires('style', pageData.tvoc)"
              />
              <span class="flex" :style="{ color: dealAqires('style', pageData.tvoc) }">
                <icon-font type="icon-greenpery" class="icon-g" />{{ dealText(pageData.tvoc) }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col sta-footer-r">
          <div>
            <span class="sta-footer-r-mod-t">模式：</span>
            <span class="model-icon">
              <icon-font :type="dealPattern(pageData.pattern, 'icon')" class="icon-g" />
            </span>
            <span class="model-span">
              {{ dealPattern(pageData.pattern, 'text') }}
            </span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">风速：</span>
            <span class="model-icon">
              <icon-font
                :type="
                  pageData.wind == '01'
                    ? 'icon-wind'
                    : pageData.wind == '02'
                    ? 'icon-wind1'
                    : 'icon-wind2'
                "
                class="icon-g"
              />
            </span>
            <span class="model-span">
              {{ dealWind(pageData.wind) }}
            </span>
          </div>
          <div v-if="pDChildLock(pageData.model)">
            <span class="sta-footer-r-mod-t">童锁：</span>
            <span class="sta-footer-r-mod-d">{{
              pageData.childLock == '00' ? '关锁' : '开锁'
            }}</span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">滤网维护：</span>
            <span class="sta-footer-r-mod-d">{{ dealFixTime(pageData.meshCycle) }}个月</span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">定时模式：</span>
            <span class="sta-footer-r-mod-d" style="color: rgba(0, 185, 215, 0.5)">
              {{ pageData.clockStatus == '00' ? '未设置' : '已设置' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <component :is="currentModal" v-model:visible="modalVisible" :deviceData="statusData" />
    <DeleteModel @register="register1" :minHeight="100" />
    <TimingModel @register="register2" :minHeight="100" />
    <ControlModel @register="register3" :minHeight="100" />
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    computed,
    onMounted,
    shallowRef,
    ComponentOptions,
    nextTick,
    onUnmounted,
  } from 'vue';
  import { Select, Progress, Input } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  // import deviceImg_green from '/@/assets/images/device/device/detail_green.png';
  import deviceImg_green from '/@/assets/images/device/device/green.png';
  import deviceImg_good from '/@/assets/images/device/device/good.png';
  import deviceImg_bad from '/@/assets/images/device/device/bad.png';
  import deviceImg_off from '/@/assets/images/device/device/off.png';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { iconfontJS } from '/@/utils/iconfont';

  import DeleteModel from './DeleteModel.vue';
  import ControlModel from './ControlModel.vue';
  import TimingModel from './TimingModel.vue';
  import { useModal } from '/@/components/Modal';
  import { updateDeviceName } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import bus from '/@/utils/bus';
  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });
  interface stateType {
    selectValue: string;
    imageUrl: string;
    pageData: any;
    configRes: any;
    mqttOptions: any;
    online: any;
    editStatus: boolean;
  }
  export default defineComponent({
    components: {
      ControlModel,
      TimingModel,
      DeleteModel,
      [Select.name]: Select,
      ASelectOption: Select.Option,
      Icon,
      [Progress.name]: Progress,
      IconFont,
      Input,
    },
    props: {
      statusData: {
        type: Object,
        default: null,
      },
    },
    setup(props) {
      const state: stateType = reactive({
        selectValue: '更多',
        imageUrl: deviceImg_green,
        pageData: props.statusData, // 设备定时，00-未设置，01-已设置
        online: props.statusData.online, //在线离线状态
        configRes: {},
        mqttOptions: {},
        editStatus: true, // 编辑设备名称
        checkChildLock: false, // 是否有童锁
      });
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { success } = createMessage;
      // MQTT相关 ↓

      /**
       * @Author:
       * @Date:
       * @Descripttion: 接收信息
       */
      function onMessageArrived(msg) {
        // console.log('busemitc传过来的数据', msg);
        let data = JSON.parse(msg.payloadString);
        // console.log('payloadString', JSON.parse(msg.payloadString));
        // console.log('msgType', data.msgType);
        if (data.msgType == 'deviceStatusData' && data.deviceId === props.statusData.deviceId) {
          state.pageData = JSON.parse(msg.payloadString);
        }
        if (data.msgType == 'deviceOnlineStatus' && data.deviceId === props.statusData.deviceId) {
          state.online = data.status;
        }
      }
      bus.on('mqttAllData', onMessageArrived);
      // MQTT相关 ↑

      // 弹窗相关 ↓
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
      const [register1, { openModal: openModal1 }] = useModal();
      const [register2, { openModal: openModal2 }] = useModal();
      const [register3, { openModal: openModal3 }] = useModal();
      const modalVisible = ref<Boolean>(false);

      function handleChange(value) {
        state.selectValue = value;
        switch (value) {
          case '1':
            currentModal.value = ControlModel; // 设备控制
            break;
          case '2':
            currentModal.value = TimingModel; // 定时模式
            break;
          case '3':
            currentModal.value = DeleteModel; // 移除设备
            break;
          default:
            state.selectValue = '更多';
        }
        nextTick(() => {
          // userData.value = state.valueList;
          modalVisible.value = true;
          state.selectValue = '更多';
        });
      }

      // 弹窗相关 ↑
      async function changeDeviceName() {
        let params = {
          deviceId: state.pageData.deviceId,
          sort: 0,
          userDeviceName: state.pageData.deviceName,
        };
        try {
          let res = await updateDeviceName(params);
          if (res) {
            success('修改成功');
            state.editStatus = true;
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }

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
            default:
              colStyle = '#A9A9AF';
              aqiText = '';
              imageUrl = deviceImg_off;
          }
          return type === 'style' ? colStyle : type === 'text' ? aqiText : imageUrl;
        };
      });
      const dealText = computed(() => {
        return function (event) {
          let aqiText = '';
          switch (event) {
            case '01':
              aqiText = '优';
              break;
            case '02':
              aqiText = '良';
              break;
            case '03':
              aqiText = '差';
              break;
            default:
              aqiText = '优';
          }
          return aqiText;
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
          let arr: any = [];
          if (state.pageData.model == 'EH-Z-7B200F-HET' || state.pageData.model == 'EH-Z-7B100A') {
            arr = ['静音', '低', '高'];
          } else {
            arr = ['弱', '中', '强'];
          }
          switch (event) {
            case '01':
              wind = arr[0];
              break;
            case '02':
              wind = arr[1];
              break;
            case '03':
              wind = arr[2];
              break;
          }
          return wind;
        };
      });
      // 计算运行模式
      // 模式 01:智能模式 02新风模式 03:净化模式 04:送风模式 05:排风模式 06:除味模式 07:节能模式 08:除湿模式 09:新风+除湿模式 8~:除霜模式（自动）4~:辅热模式（自动）2~:除湿模式（自动）
      const dealPattern = computed(() => {
        return function (event, type) {
          let patternText = '';
          let icon = '';
          switch (event) {
            case '01':
              patternText = '智能';
              icon = 'icon-auto';
              break;
            case '02':
              patternText = '新风';
              icon = 'icon-newwind';
              break;
            case '03':
              patternText = '净化';
              icon = 'icon-newwind';
              break;
            case '04':
              patternText = '送风';
              icon = 'icon-biowing';
              break;
            case '05':
              patternText = '排风';
              icon = 'icon-deodorize';
              break;
            case '06':
              patternText = '除味';
              icon = 'icon-deodorize';
              break;
            case '07':
              patternText = '节能';
              icon = 'icon-energy';
              break;
            default:
              patternText = '智能';
              icon = 'icon-auto';
          }
          return type == 'icon' ? icon : patternText;
        };
      });
      const pDChildLock = computed(() => {
        return function (event) {
          if (event == 'EH-Z-7G650' || event == 'EH-Z-7G400A' || event == 'EH-Z-7G750') {
            return true;
          } else {
            return false;
          }
        };
      });

      onMounted(() => {});
      onUnmounted(() => {
        bus.off('mqttAllData', onMessageArrived);
      });
      return {
        handleChange,
        ...toRefs(state),
        dealAqires,
        dealText,
        dealAirQuality,
        dealFixTime,
        dealPattern,
        dealWind,
        pDChildLock,
        currentModal,
        modalVisible,
        register1,
        register2,
        register3,
        onMessageArrived,
        changeDeviceName,
        deviceImg_off,
      };
    },
  });
</script>

<style lang="less" scoped>
  .sta-container {
    background: #ffffff;
    padding: 10px 24px;
    height: 594px;
    border-radius: 8px;
    .sta-header {
      .sta-h-txt {
        box-sizing: content-box;
        padding-bottom: 10px;
        height: 24px;
        font-size: 18px;
        font-weight: 600;
        line-height: 21px;
        color: #333333;
        opacity: 1;
        border-bottom: 2px solid rgba(0, 185, 215, 1);
      }
    }
    .sta-title {
      padding-top: 34px;
      .sta-title-l {
        position: relative;
        bottom: 20px;
        height: 60px;
        width: 170px;
        .l-name {
          width: 213px;
          // overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 18px;
          color: rgba(62, 65, 89, 1);
        }
        .l-space {
          font-size: 16px;
          color: rgba(102, 102, 102, 1);
        }
      }
      .sta-title-m {
        width: 313px;
        height: 284px;
        .aqi-title {
          height: 52px;
          font-size: 26px;
          font-weight: 600;
          line-height: 24px;
          color: #3e4159;
          opacity: 1;
        }
        // color: #A9A9AF; //离线
        // color: #FFC400; //良好
        // color: #FF4D4F; //污浊
        .air-status {
          height: 72px;
          font-size: 54px;
          font-weight: 600;
          line-height: 24px;
          color: #52c41a; //清新
          opacity: 1;
        }
      }
      .sta-title-r {
        position: relative;
        bottom: 0px;
        right: 70px;
        color: #00b9d7;
        height: 30px;
        width: 170px;
        font-size: 22px;
        .iconify {
          font-size: 40px;
          margin-right: 10px;
        }
      }
    }
    .sta-footer {
      margin-top: 30px;
      height: 175px;
      .sta-footer-l {
        .sta-footer-l-name {
          height: 29px;
          font-size: 22px;
          font-weight: 400;
          line-height: 34px;
          color: #3e4159;
          opacity: 1;
          .sta-footer-l-name-u {
            height: 21px;
            font-size: 16px;
            font-weight: 400;
            line-height: 33px;
            color: #666666;
            opacity: 1;
          }
        }
      }
      .sta-footer-r {
        .sta-footer-r-mod-t {
          display: inline-block;
          text-align: right;
          width: 90px;
          height: 19px;
          font-size: 16px;
          font-weight: 400;
          line-height: 19px;
          color: #3e4159;
          opacity: 1;
          margin-top: 16px;
        }
        .sta-footer-r-mod-d {
          padding-left: 10px;
          width: 28px;
          height: 19px;
          font-size: 16px;
          font-weight: 400;
          line-height: 19px;
          color: #999999;
          opacity: 1;
        }
      }
    }

    // .datav-top-l {
    //   width: 800px;
    //   height: 594px;
    //   background: rgba(255, 255, 255, 0.39);
    //   box-shadow: 0px 3px 6px #e8e8e8;
    //   opacity: 1;
    //   border-radius: 10px;
    // }
    // .datav-top-r {
    //   width: 800px;
    //   height: 594px;
    //   background: rgba(0, 185, 215, 0.39);
    // }
  }
  .icon-g {
    font-size: 27px !important;
    padding-left: 8px;
  }
  .icon-big {
    font-size: 27px !important;
    padding-left: 8px;
    color: #999999;
  }
  .model-icon {
    color: #999999;
    position: relative;
    top: 5px;
  }
  .model-icon2 {
    width: 27px;
    height: 27px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: '/@/assets/images/homePage/newwind.png';
  }
  .model-span {
    color: #999999;
    font-size: 16px;
    padding-left: 10px;
  }

  .fecth-btn {
    margin: 5px;
    width: 50px;
    color: #00b9d7;
  }

  /deep/ .ant-select-selection-item,
  .ant-select-arrow {
    color: rgba(0, 185, 215, 1);
  }
</style>
