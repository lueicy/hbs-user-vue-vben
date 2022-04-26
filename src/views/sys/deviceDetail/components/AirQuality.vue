<template>
  <div class="flex flex-col air-container">
    <div class="flex flex-col air-con-overview">
      <div class="over-title">空气质量</div>
      <div class="flex air-index">
        <RadioGroup
          size="large"
          :default-value="true"
          v-model:value="choseEchart"
          button-style="solid"
        >
          <radio :value="true"> CO2 </radio>
          <radio :value="false"> PM2.5 </radio>
        </RadioGroup>
      </div>
      <div v-if="choseEchart" class="over-content">
        <CoChart :deviceId="deviceId" />
      </div>
      <div v-else class="over-content">
        <PmChart :deviceId="deviceId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';
  import CoChart from './CoChart.vue';
  import PmChart from './PmChart.vue';
  import { Radio } from 'ant-design-vue';

  interface stateType {
    choseEchart?: boolean;
    chartDate?: String;
    co2List?: any;
    pmInsideList?: any;
    pmOutsideList?: any;
  }
  export default defineComponent({
    components: {
      CoChart,
      PmChart,
      RadioGroup: Radio.Group,
      Radio: Radio.Button,
    },
    props: {
      deviceId: {
        type: String,
        defaule: '',
      },
    },
    setup() {
      const state: stateType = reactive({
        choseEchart: true, //是否开启选择
      });
      onMounted(() => {});
      return {
        ...toRefs(state),
      };
    },
  });
</script>

<style lang="less" scoped>
  .air-container {
    // width: 775px;
    width: 49%;
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
  /deep/ .ant-radio-button-wrapper-checked {
    background: rgba(9, 185, 220, 1) !important;
    border-color: rgba(9, 185, 220, 1) !important;
  }
  /deep/ .ant-radio-button-wrapper {
    min-width: 80px !important;
    text-align: center;
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
