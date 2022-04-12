<template>
  <div class="flex info-container">
    <div class="info-basic">
      <div class="info-title">基本信息</div>
      <div class="info-content">
        <span class="dot-1"></span>
        <span class="info-con-n">设备型号： </span>
        <span class="info-con-d">{{ baseInfo.model }}</span>
      </div>
      <div class="info-content">
        <span class="dot-2"></span>
        <span class="info-con-n"> 设备PID： </span>
        <span class="info-con-d">{{ baseInfo.pid }}</span>
      </div>
      <!-- <div class="info-content">
        <span class="dot-3"></span>
        <span class="info-con-n"> 设备激活时间： </span>
        <span class="info-con-d">EH-Z-7G650</span>
      </div> -->
      <div class="info-content">
        <span class="dot-4"></span>
        <span class="info-con-n"> 设备MAC地址： </span>
        <span class="info-con-d">{{ baseInfo.mac }} </span>
      </div>
      <div class="info-content">
        <span class="dot-5"></span>
        <span class="info-con-n"> 设备运行状态： </span>
        <span class="info-con-d">{{ dealError(baseInfo.deviceErrorDataVO) }}</span>
      </div>
    </div>
    <div class="info-basic">
      <div class="info-title">网络信息</div>
      <div class="info-content" v-for="(item, i) in netWorkList" :key="i">
        <span :class="`dot-${i + 1}`"></span>
        <span class="info-con-n"> {{ item.name }} </span>
        <span class="info-con-d">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, toRaw } from 'vue';
  interface InfoType {
    name?: string;
    value?: string;
  }

  export default defineComponent({
    props: {
      baseInfo: {
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      let infoList: InfoType[] = [
        {
          name: '设备型号：',
          value: 'EH-Z-7G650',
        },
        {
          name: '设备PID：',
          value: 'EH-Z-7G650',
        },
        {
          name: '设备激活时间：',
          value: 'EH-Z-7G650',
        },
        {
          name: '设备MAC地址：',
          value: 'EH-Z-7G650',
        },
        {
          name: '设备运行状态：',
          value: 'EH-Z-7G650',
        },
      ];
      let netWorkList: InfoType[] = [
        {
          name: '路由器名称：',
          value: '呼博士123',
        },
        {
          name: 'WIFI信号强度：',
          value: '39',
        },
        {
          name: 'WIFI的MAC地址：',
          value: 'EH-Z-7G650',
        },
        {
          name: '路由器IP：',
          value: 'test',
        },
      ];
      // function dealInfoList(): void {
      //   infoList = <InfoType>[
      //     {
      //       name: '设备型号',
      //       value: 'EH-Z-7G650',
      //     },
      //   ];
      // }
      const dealError = computed(() => {
        return function (event) {
          let lock = false;
          let errorReason = '设备良好，请继续保持';
          if (!toRaw(event)) return errorReason;
          for (const [key, value] of Object.entries(toRaw(event))) {
            if (lock) return;
            if (key !== 'deviceId' && value == '01') {
              switch (key) {
                case 'co2Error':
                  errorReason = 'CO2传感器故障';
                  break;
                case 'exhaustError':
                  errorReason = '排风电机故障';
                  break;
                case 'mainDoorError':
                  errorReason = '主机柜门未关闭故障';
                  break;
                case 'motorError':
                  errorReason = '新风电机故障';
                  break;
                case 'pm25Error':
                  errorReason = 'PM2.5传感器故障';
                  break;
                case 'powerDisplayError':
                  errorReason = '电源板与显示板之间通讯故障';
                  break;
                case 'stepError':
                  errorReason = '步进电机故障';
                  break;
                case 'temperatureError':
                  errorReason = '室外温度传感器故障';
                  break;
                default:
                  errorReason = '设备良好，请继续保持';
              }
              lock = true;
              console.log('errorReason', errorReason);
              return errorReason;
            } else {
              lock = true;
              return errorReason;
            }
          }
        };
      });
      return {
        infoList,
        netWorkList,
        dealError,
        // dealInfoList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .info-container {
    min-height: 310px;
    .info-basic {
      min-width: 390px;
      margin-right: 20px;
      padding: 10px 18px;
      height: 310px;
      background: rgba(255, 255, 255, 0.39);
      box-shadow: 0px 3px 6px #dbdbdb;
      opacity: 1;
      border-radius: 10px;
      .info-title {
        width: 72px;
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
      .info-content {
        padding: 15px 0px;

        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;

        .info-con-n {
          height: 19px;
          line-height: 19px;
          padding-left: 10px;
          color: #333333;
          opacity: 1;
        }
        .info-con-d {
          height: 19px;
          line-height: 19px;
          color: #999999;
          opacity: 1;
        }
      }
      .dot-1::before {
        content: ' ';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: linear-gradient(210deg, #a0dbf2 0%, #26ade1 100%);
        border-radius: 50%;
        opacity: 1;
      }
      .dot-2::before {
        content: ' ';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: linear-gradient(30deg, #9091ff 0%, #c9c9ff 100%);
        border-radius: 50%;
        opacity: 1;
      }
      .dot-3::before {
        content: ' ';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: linear-gradient(210deg, #ffe6bd 0%, #ffc15e 100%);
        border-radius: 50%;
        opacity: 1;
      }
      .dot-4::before {
        content: ' ';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: linear-gradient(220deg, #ffaeae 0%, #ff5353 100%);
        border-radius: 50%;
        opacity: 1;
      }
      .dot-5::before {
        content: ' ';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: linear-gradient(220deg, #fffdfd 0%, #8de076 100%);
        border-radius: 50%;
        opacity: 1;
      }
    }
  }
</style>
