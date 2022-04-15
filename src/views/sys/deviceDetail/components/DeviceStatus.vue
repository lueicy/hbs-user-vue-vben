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
          <span class="l-name">
            {{ statusData.deviceName }}
            <Icon icon="ant-design:edit-filled" style="font-size: 22px; padding-left: 8px" />
          </span>
          <span class="l-space">{{ statusData.groupList }}</span>
        </div>
        <div
          class="flex flex-col items-center justify-center sta-title-m"
          :style="{
            backgroundImage: 'url(' + dealAqires('url', statusData.tvoc) + ')',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width: '313px',
            height: '284px',
          }"
        >
          <span class="mb-6 aqi-title">AQI</span>
          <span class="air-status" :style="{ color: dealAqires('style', statusData.tvoc) }">{{
            dealAqires('text', statusData.tvoc)
          }}</span>
        </div>
        <div class="flex items-center sta-title-r">
          <span
            :style="{ color: statusData.online == '10' ? '' : '#A6AAB8' }"
            class="dib iconify"
            :data-icon="statusData.online == '10' ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
          ></span>

          <span :style="{ color: statusData.online == '10' ? '' : '#A6AAB8' }">
            {{ statusData.online == '10' ? '在线' : '离线' }}
          </span>
        </div>
      </div>
      <!-- <div class="sta-content"> </div> -->
      <div class="flex items-end justify-between sta-footer">
        <div class="flex flex-col sta-footer-l">
          <div style="width: 300px">
            <div class="flex justify-between">
              <span class="sta-footer-l-name">PM2.5</span>
              <div class="sta-footer-l-name">
                <span>{{ statusData.pm25Real }}</span>
                <span class="sta-footer-l-name-u">ug/m³</span>
              </div>
            </div>
            <div class="flex">
              <a-progress
                :percent="statusData.pm25Real"
                :show-info="false"
                :strokeColor="dealAqires('style', statusData.tvoc)"
                class="progress-border"
              />
              <span class="flex" :style="{ color: dealAqires('style', statusData.tvoc) }">
                <icon-font type="icon-greenpery" class="icon-g" />{{ dealText(statusData.tvoc) }}
              </span>
            </div>
          </div>
          <div style="width: 300px">
            <div class="flex justify-between">
              <span class="sta-footer-l-name">CO2</span>
              <div class="sta-footer-l-name">
                <span>{{ statusData.co2Real }}</span>
                <span class="sta-footer-l-name-u">ppm</span>
              </div>
            </div>
            <div class="flex">
              <a-progress
                :percent="dealAirQuality(statusData.co2Real)"
                :show-info="false"
                :strokeColor="dealAqires('style', statusData.tvoc)"
              />
              <span class="flex" :style="{ color: dealAqires('style', statusData.tvoc) }">
                <icon-font type="icon-greenpery" class="icon-g" />{{ dealText(statusData.tvoc) }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col sta-footer-r">
          <div>
            <span class="sta-footer-r-mod-t">模式：</span>
            <span :style="{ color: dealAqires('style', statusData.tvoc) }">
              <icon-font type="icon-energy" class="icon-g" />
              {{ dealPattern(statusData.pattem) }}
            </span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">风速：</span>
            <span :style="{ color: dealAqires('style', statusData.tvoc) }">
              <icon-font v-if="statusData.wind == '01'" type="icon-wind" class="icon-g" />
              <icon-font v-if="statusData.wind == '02'" type="icon-wind1" class="icon-g" />
              <icon-font v-if="statusData.wind == '03'" type="icon-wind2" class="icon-g" />
              {{ dealWind(statusData.wind) }}
            </span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">童锁：</span>
            <span class="sta-footer-r-mod-d">{{
              statusData.childLock == '00' ? '关锁' : '开锁'
            }}</span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">滤网维护：</span>
            <span class="sta-footer-r-mod-d">{{ dealFixTime(statusData.meshCycle) }}个月</span>
          </div>
          <div>
            <span class="sta-footer-r-mod-t">定时模式：</span>
            <span class="sta-footer-r-mod-d" style="color: rgba(0, 185, 215, 0.5)">
              {{ clockStatus == '00' ? '未设置' : '已设置' }}
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
  } from 'vue';
  import { Select, Progress } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  // import deviceImg_green from '/@/assets/images/device/device/detail_green.png';
  import deviceImg_green from '/@/assets/images/device/device/green.png';
  import deviceImg_good from '/@/assets/images/device/device/good.png';
  import deviceImg_bad from '/@/assets/images/device/device/bad.png';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { iconfontJS } from '/@/utils/iconfont';

  import DeleteModel from './DeleteModel.vue';
  import ControlModel from './ControlModel.vue';
  import TimingModel from './TimingModel.vue';
  import { useModal } from '/@/components/Modal';
  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });
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
    },
    props: {
      statusData: {
        type: Object,
        default: null,
      },
    },
    setup(props) {
      const state = reactive({
        selectValue: '更多',
        imageUrl: deviceImg_green,
        clockStatus: props.statusData.clockStatus, // 设备定时，00-未设置，01-已设置
      });
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
        });
      }

      // 弹窗相关 ↑

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
              aqiText = '清新';
              imageUrl = deviceImg_green;
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

      onMounted(() => {
        console.log('statusData', props.statusData);
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
        currentModal,
        modalVisible,
        register1,
        register2,
        register3,
      };
    },
  });
</script>

<style lang="less" scoped>
  .sta-container {
    padding: 10px 24px;
    .sta-header {
      .sta-h-txt {
        box-sizing: content-box;
        padding-bottom: 10px;
        height: 24px;
        font-size: 18px;
        font-family: Microsoft YaHei;
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
          overflow: hidden;
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
          height: 72px;
          font-size: 54px;
          font-family: Microsoft YaHei;
          font-weight: 600;
          line-height: 24px;
          color: #52c41a; //清新
          opacity: 1;
        }
      }
      .sta-title-r {
        position: relative;
        bottom: 30px;
        right: 30px;
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
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 34px;
          color: #3e4159;
          opacity: 1;
          .sta-footer-l-name-u {
            height: 21px;
            font-size: 16px;
            font-family: Microsoft YaHei;
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
          width: 70px;
          height: 19px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 19px;
          color: #3e4159;
          opacity: 1;
        }
        .sta-footer-r-mod-d {
          padding-left: 10px;
          width: 28px;
          height: 19px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 19px;
          color: #999999;
          opacity: 1;
        }
      }
    }

    .datav-top-l {
      width: 800px;
      height: 594px;
      background: rgba(255, 255, 255, 0.39);
      box-shadow: 0px 3px 6px #e8e8e8;
      opacity: 1;
      border-radius: 10px;
    }
    .datav-top-r {
      width: 800px;
      height: 594px;
      background: rgba(0, 185, 215, 0.39);
    }
  }
  .icon-g {
    font-size: 22px !important;
    padding-left: 8px;
  }
  .icon-big {
    font-size: 27px !important;
    padding-left: 8px;
    color: #999999;
  }

  /deep/ .ant-select-selection-item,
  .ant-select-arrow {
    color: rgba(0, 185, 215, 1);
  }
</style>
