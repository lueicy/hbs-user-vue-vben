<template>
  <div class="flex flex-col air-container">
    <div class="flex flex-col air-con-overview">
      <div class="over-title">空气质量</div>
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
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  // import { Icon } from '/@/components/Icon';
  export default defineComponent({
    components: {
      // Icon,
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
      .over-date {
        text-align: end;
        margin: 10px 0px;
      }
      .over-content {
        margin-bottom: 24px;
      }
    }
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
