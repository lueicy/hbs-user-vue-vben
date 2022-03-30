<template>
  <div class="page-container">
    <div class="flex">
      <div class="datav-top-l">
        <DeviceStatus />
      </div>
      <div class="datav-top-r">
        <InformationAgg />
        <SharerInfo />
      </div>
    </div>
    <HistoryInfo />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceStatus from './components/DeviceStatus.vue';
  import InformationAgg from './components/InformationAgg.vue';
  import SharerInfo from './components/SharerInfo.vue';
  import HistoryInfo from './components/HistoryInfo.vue';
  export default defineComponent({
    components: {
      DeviceStatus,
      InformationAgg,
      SharerInfo,
      HistoryInfo,
    },
    props: {
      deviceData: {
        type: Object,
        default: null,
      },
    },
  });
</script>

<style lang="less" scoped>
  .page-container {
    min-height: 800px;
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
      margin-left: 31px;
      // background: rgba(0, 185, 215, 0.39);
    }
  }
</style>
