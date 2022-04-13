<template>
  <div class="flex flex-col his-container">
    <div class="his-con-title">历史记录</div>
    <div class="flex flex-col his-con-overview">
      <div class="over-title">历史概况</div>
      <div class="over-date">
        <DatePicker v-model:value="dateValue" @ok="dateOk" format="YYYY-MM-DD HH:mm:ss" show-time />
      </div>
      <div class="over-content">
        <span>开机次数：</span>
        <span class="data-text">{{ historyInfo.openCount }}次</span>
      </div>
      <div class="over-content">
        <span>使用时间：</span>
        <span class="data-text">{{ dealFixTime(historyInfo.workTime) }}分钟</span>
      </div>
      <div class="over-content">
        <span>新的风量：</span>
        <span class="data-text"> {{ historyInfo.airVolume }}</span>
      </div>
    </div>
    <div class="flex justify-between chart-overview">
      <WindStatistics :deviceId="deviceId" />
      <AirQuality :deviceId="deviceId" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, onMounted, computed } from 'vue';
  import WindStatistics from './WindStatistics.vue';
  import AirQuality from './AirQuality.vue';
  import { DatePicker } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { getHistoryInfo } from '/@/api/sys/groupAndDevice';
  type RangeValue = [string, string];

  interface stateType {
    historyInfo?: any;
  }

  export default defineComponent({
    components: {
      WindStatistics,
      AirQuality,
      DatePicker: DatePicker.RangePicker,
    },
    props: {
      deviceId: {
        type: String,
        defaule: '',
      },
    },
    setup(props) {
      const state: stateType = reactive({
        historyInfo: {},
      });
      const dateValue: any = ref<RangeValue>();
      const startTime: any = dayjs().date(1).format('YYYY-MM-DD') + ' 00:00:00';
      const endTime: any = dayjs().format('YYYY-MM-DD HH:mm:ss');

      // 使用时间分钟
      const dealFixTime = computed(() => {
        return function (event) {
          let resNum = 0;
          if (event > 1 && event < 60) resNum = 1;
          if (event > 60) resNum = parseInt(event / 60);
          return resNum;
        };
      });

      function dateOk() {
        getHistory(
          props.deviceId,
          dayjs(dateValue.value[0]).format('YYYY-MM-DD HH:mm:ss'),
          dayjs(dateValue.value[1]).format('YYYY-MM-DD HH:mm:ss')
        );
      }
      async function getHistory(deviceId, startTime, endTime) {
        const res = await getHistoryInfo({
          deviceId: deviceId,
          start: startTime,
          end: endTime,
        });
        if (res) {
          state.historyInfo = res;
        }
        console.log('获取历史记录', res);
      }

      onMounted(() => {
        getHistory(props.deviceId, startTime, endTime);
      });

      return {
        ...toRefs(state),
        dateValue,
        dateOk,
        getHistory,
        dealFixTime,
      };
    },
  });
</script>

<style lang="less" scoped>
  .his-container {
    margin-top: 20px;
    padding: 14px 32px;
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 6px #dbdbdb;
    opacity: 1;
    border-radius: 10px;
    .his-con-title {
      width: 72px;
      box-sizing: content-box;
      padding-bottom: 10px;
      height: 24px;
      font-size: 18px;
      font-weight: 600;
      line-height: 21px;
      color: #333333;
      border-bottom: 2px solid rgba(0, 185, 215, 1);
    }
    .his-con-overview {
      padding: 16px 24px;
      background: rgba(245, 252, 254, 0.39);
      box-shadow: 0px 3px 6px #dbdbdb;
      margin: 20px 0px;
      .over-title {
        width: 100%;
        height: 21px;
        box-sizing: content-box;
        padding-bottom: 16px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 21px;
        color: #333333;
        border-bottom: 2px solid rgba(233, 233, 233, 1);
        opacity: 1;
      }
      .over-date {
        text-align: end;
        margin: 10px 0px;
      }
      .over-content {
        margin-bottom: 24px;

        .data-text {
          color: #999999;
        }
      }
    }
  }
  // .chart-overview {
  // }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
