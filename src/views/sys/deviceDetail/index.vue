<template>
  <div class="page-container">
    <div class="flex">
      <div class="datav-top-l">
        <DeviceStatus :statusData="statusData" />
      </div>
      <div class="datav-top-r">
        <InformationAgg :baseInfo="baseInfo" />
        <SharerInfo />
      </div>
    </div>
    <HistoryInfo />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import DeviceStatus from './components/DeviceStatus.vue';
  import InformationAgg from './components/InformationAgg.vue';
  import SharerInfo from './components/SharerInfo.vue';
  import HistoryInfo from './components/HistoryInfo.vue';

  import { getSingleDevice } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
import { AnyNsRecord } from 'dns';

  interface stateType {
    statusData?: any;
    num?: Number;
    valueList?: any[];
    baseInfo?: any;
  }
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
    setup(props) {
      const state: stateType = reactive({
        statusData: props.deviceData,
        actionSelect: false, //是否开启选择
        baseInfo: {},
        devicesList: [],
        checkedList: [],
        valueList: [],
        loading: false,
        busy: false,
      });
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();

      async function getSingleDetail() {
        if (!props.deviceData || !props.deviceData.deviceId) return;
        try {
          const res = await getSingleDevice(props.deviceData.deviceId);
          if (res) {
            state.statusData.clockStatus = res.clockStatus;
            const { deviceName, mac, model, pid, deviceErrorDataVO } = res;
            state.baseInfo.deviceName = deviceName;
            state.baseInfo.mac = mac;
            state.baseInfo.model = model;
            state.baseInfo.pid = pid;
            state.baseInfo.deviceErrorDataVO = deviceErrorDataVO;
            console.log('定时模式', state.statusData.clockStatus);
            console.log('基本信息', state.baseInfo);
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }

      onMounted(() => {
        getSingleDetail();
        console.log('详情页里面', props.deviceData);
      });
      return {
        ...toRefs(state),
        getSingleDetail,
      };
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
