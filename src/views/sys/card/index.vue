<template>
  <PageWrapper :class="prefixCls" title="">
    <template v-if="isDetail" #headerContent>
      <WorkbenchHeader />
      <DeviceManage class="rounded-t enter-y" />
    </template>
    <template v-if="!isDetail">
      <a-button @click="isDetail = !isDetail" class="back-btn">
        <Icon icon="ant-design:arrow-left-outlined" style="font-size: 21px" />
        返回
      </a-button>
      <DeviceDetail :deviceData="deviceData" />
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { reactive, toRefs, defineComponent, onBeforeUnmount } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import DeviceManage from './components/DeviceManage.vue';
  import RippleDirective from '/@/directives/ripple';
  // import { useDrawer } from '/@/components/Drawer';
  import DeviceDetail from '../deviceDetail/index.vue';
  import bus from '/@/utils/bus';
  import { Icon } from '/@/components/Icon';

  export default defineComponent({
    components: {
      DeviceDetail,
      WorkbenchHeader,
      DeviceManage,
      PageWrapper,
      Icon,
    },
    directives: {
      Ripple: RippleDirective,
    },

    setup() {
      const state = reactive({
        isDetail: true, //是否开启选择
        deviceData: {},
      });
      const catchShow = (event) => {
        state.isDetail = event.id ? false : true;
        state.deviceData = event;
        console.log('showDetail 我拿到数据了', event);
      };

      bus.on('showDetail222', catchShow);
      onBeforeUnmount(() => {
        bus.off('showDetail222', catchShow);
      });

      return {
        catchShow,
        ...toRefs(state),
      };
    },
  });
</script>
<style lang="less" scoped>
  .back-btn {
    border: none;
    font-size: 18px;
    font-weight: 550;
    box-shadow: none;
    background: none;
    margin: 8px 0px;
    padding-left: 0px;
  }
</style>
