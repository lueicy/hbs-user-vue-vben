<template>
  <PageWrapper :class="prefixCls" title="">
    <template v-if="isDetail" #headerContent>
      <WorkbenchHeader :statisticsData="statisticsRes" />
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
  import { reactive, toRefs, defineComponent, onBeforeUnmount, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import DeviceManage from './components/DeviceManage.vue';
  import RippleDirective from '/@/directives/ripple';
  import DeviceDetail from '../deviceDetail/index.vue';
  import bus from '/@/utils/bus';
  import { Icon } from '/@/components/Icon';
  import { getStatisticsData } from '/@/api/sys/menu';
  import { getDeviceDetail } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  interface stateType {
    isDetail: boolean; //是否开启选择
    statisticsRes: any;
    deviceData: any;
  }

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
      const state: stateType = reactive({
        isDetail: true, //是否开启选择
        statisticsRes: {},
        deviceData: {},
      });

      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { error, success } = createMessage;
      async function catchShow(event) {
        if (!event || !event.deviceId) return;
        try {
          const res = await getDeviceDetail(event.deviceId);
          if (res) {
            state.isDetail = event.deviceId ? false : true;
            state.deviceData = res;
            state.deviceData.deviceName = event.deviceName;
            state.deviceData.groupList = event.groupList.length ? event.groupList[0] : '';
            state.deviceData.online = event.online;
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      // 统计数据
      async function getStatistics() {
        state.statisticsRes = await getStatisticsData();
      }

      bus.on('showDetail222', catchShow);
      onMounted(() => {
        console.log('state.isDetail', state.isDetail);
        getStatistics();
      });

      onBeforeUnmount(() => {
        bus.off('showDetail222', catchShow);
      });

      return {
        catchShow,
        getStatistics,
        prefixCls: 'home-page',
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
