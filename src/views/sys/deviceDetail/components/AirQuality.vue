<template>
  <div class="flex flex-col air-container">
    <div class="flex flex-col air-con-overview">
      <div class="over-title">空气质量</div>
      <div class="flex air-index">
        <template v-for="(item, i) in airTitle" :key="i">
          <a-button @click="choseEchart = !choseEchart" class="air-item">{{ item.name }}</a-button>
        </template>
      </div>
      <div class="flex justify-between over-content">
        <span>单位：μg/m³</span>
        <span style="border: 1px solid rgba(9, 185, 215, 1)">
          <a-button type="default" class="time-btn">24小时</a-button>
          <a-button type="primary" class="time-btn">30天</a-button>
        </span>
      </div>
      <div v-if="choseEchart" class="over-content">
        <CoChart />
      </div>
      <div v-else class="over-content">
        <PmChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import CoChart from './CoChart.vue';
  import PmChart from './PmChart.vue';
  // import { Icon } from '/@/components/Icon';
  interface airType {
    name?: string;
    id?: Number;
    icon?: string;
  }
  export default defineComponent({
    components: {
      // Icon,
      CoChart,
      PmChart,
    },
    setup() {
      const state = reactive({
        choseEchart: true, //是否开启选择
      });
      let airTitle: airType[] = [
        {
          name: 'CO2',
          id: 84563,
          icon: 'ant-design:plus-outlined',
        },
        {
          name: 'PM2.5',
          id: 84563,
          icon: 'ant-design:plus-outlined',
        },
      ];
      function selectAir(event) {
        console.log('选择空气指标', event);
      }
      return {
        selectAir,
        airTitle,
        ...toRefs(state),
      };
    },
  });
</script>

<style lang="less" scoped>
  .air-container {
    width: 775px;
    .air-con-overview {
      padding: 16px 24px;
      background: rgba(245, 252, 254, 0.39);
      box-shadow: 0px 3px 6px #dbdbdb;
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
      .air-index {
        margin: 25px 0px;
        .air-item {
          padding: 0px;
          margin-right: 30px;
          width: 92px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          font-size: 14px;
          color: #333333;
          // border: 1px solid rgba(112, 112, 112, 1);
        }
        .air-title:hover {
          border: 1px solid rgba(9, 185, 215, 1) !important;
        }
      }
      .over-content {
        margin-bottom: 24px;
        .time-btn {
          padding: 0px;
          width: 51px;
          border-radius: 2px;
          box-sizing: content-box;
        }
        .time-btn:active {
          background: rgba(9, 185, 215, 0.39);
          color: #fff;
          border: 1px solid rgba(9, 185, 215, 1);
        }
      }
    }
  }
  /deep/ .ant-btn-primary {
    background: rgba(9, 185, 220, 1);
    border-color: rgba(9, 185, 220, 1);
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
