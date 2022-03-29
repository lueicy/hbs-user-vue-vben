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
            厦门呼博士的名称
            <Icon icon="ant-design:edit-filled" style="font-size: 22px; padding-left: 8px" />
          </span>
          <span class="l-space">一年级二班</span>
        </div>
        <div
          class="flex flex-col items-center justify-center sta-title-m"
          :style="{
            backgroundImage: 'url(' + imageUrl + ')',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width: '313px',
            height: '284px',
          }"
        >
          <span class="mb-6 aqi-title">AQI</span>
          <span class="air-status" :style="{ color: dealAqires('style', aqi) }">{{
            dealAqires('text', aqi)
          }}</span>
        </div>
        <div class="flex items-center sta-title-r">
          <span
            :style="{ color: 3 % 3 == 0 ? '' : '#A6AAB8' }"
            class="dib iconify"
            :data-icon="3 % 3 == 0 ? 'ic:baseline-wifi' : 'mdi:wifi-cancel'"
          ></span>

          <span :style="{ color: 3 % 3 == 0 ? '' : '#A6AAB8' }">
            {{ 3 % 3 == 0 ? '在线' : '离线' }}
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
                <span>10</span>
                <span class="sta-footer-l-name-u">ug/m³</span>
              </div>
            </div>
            <div class="flex">
              <a-progress
                :percent="30"
                :show-info="false"
                :strokeColor="dealAqires('style', aqi)"
              />
              <Icon icon="ant-design:edit-filled" style="font-size: 22px; padding-left: 8px" />优
            </div>
          </div>
          <div style="width: 300px">
            <div class="flex justify-between">
              <span class="sta-footer-l-name">PM2.5</span>
              <div class="sta-footer-l-name">
                <span>1000</span>
                <span class="sta-footer-l-name-u">ppm</span>
              </div>
            </div>
            <div class="flex">
              <a-progress
                :percent="30"
                :show-info="false"
                :strokeColor="dealAqires('style', aqi)"
              />
              <Icon icon="ant-design:edit-filled" style="font-size: 22px; padding-left: 8px" />优
            </div>
          </div>
        </div>
        <div class="flex flex-col sta-footer-r">
          <span>模式1：开启</span>
          <span>模式2：开启</span>
          <span>模式3：开启</span>
          <span>模式4：开启</span>
          <span>模式5：开启</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed } from 'vue';
  import { Select, Progress } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import deviceImg_green from '/@/assets/images/device/device/detail_green.png';
  export default defineComponent({
    components: {
      [Select.name]: Select,
      ASelectOption: Select.Option,
      Icon,
      [Progress.name]: Progress,
    },
    props: {
      deviceData: {
        type: Object,
        default: null,
      },
    },
    setup() {
      const state = reactive({
        selectValue: '更多',
        imageUrl: deviceImg_green,
        aqi: '1', // 空气质量
      });
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
      function handleChange(value) {
        state.selectValue = value;
        switch (value) {
          case '1':
            console.log(`设备控制 ${state.selectValue}`);
            break;
          case '2':
            console.log(`定时模式 ${state.selectValue}`);
            break;
          case '3':
            console.log(`移除设备 ${state.selectValue}`);
            break;
          default:
            state.selectValue = '更多';
        }
      }
      return {
        handleChange,
        ...toRefs(state),
        dealAqires,
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

  /deep/ .ant-select-selection-item,
  .ant-select-arrow {
    color: rgba(0, 185, 215, 1);
  }
</style>
