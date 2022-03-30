<template>
  <div class="flex flex-col his-container">
    <div class="his-con-title">历史记录</div>
    <div class="flex flex-col his-con-overview">
      <div class="over-title">历史概况</div>
      <div class="over-date">日期插件</div>
      <div class="over-content">
        <span>开机次数</span>
        <span>10次</span>
      </div>
      <div class="over-content">
        <span>使用时间</span>
        <span>30分钟</span>
      </div>
      <div class="over-content">
        <span>新的风量</span>
        <span>182733m</span>
      </div>
    </div>
    <div class="flex justify-between chart-overview">
      <WindStatistics />
      <AirQuality />
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import WindStatistics from './WindStatistics.vue';
  import AirQuality from './AirQuality.vue';
  // import { Icon } from '/@/components/Icon';
  export default defineComponent({
    components: {
      // Icon,
      WindStatistics,
      AirQuality,
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
      }
    }
  }
  .chart-overview {
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
