<template>
  <div class="page-container">
    <div class="flex justify-between">
      <div class="datav-top-l">
        <DeviceStatus :statusData="statusData" />
      </div>
      <div class="datav-top-r">
        <InformationAgg :baseInfo="baseInfo" :networkInfo="networkInfo" />
        <SharerInfo :deviceId="statusData.deviceId" />
      </div>
    </div>
    <HistoryInfo :deviceId="statusData.deviceId" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import DeviceStatus from './components/DeviceStatus.vue';
  import InformationAgg from './components/InformationAgg.vue';
  import SharerInfo from './components/SharerInfo.vue';
  import HistoryInfo from './components/HistoryInfo.vue';

  import { getSingleDevice, getNetworkInfo } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  interface stateType {
    statusData?: any;
    num?: Number;
    valueList?: any[];
    baseInfo?: any;
    networkInfo?: any;
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
        networkInfo: {},
        devicesList: [],
        checkedList: [],
        valueList: [],
        loading: false,
        busy: false,
      });
      const { t } = useI18n();
      const { createErrorModal } = useMessage();

      async function getSingleDetail() {
        if (!props.deviceData || !props.deviceData.deviceId) return;
        try {
          const res = await getSingleDevice(props.deviceData.deviceId);
          if (res) {
            const { deviceName, mac, model, clockStatus, pid, deviceErrorDataVO } = res;
            state.statusData.clockStatus = clockStatus;
            state.statusData.model = model;
            state.baseInfo.deviceId = state.statusData.deviceId;
            state.baseInfo.deviceName = deviceName;
            state.baseInfo.mac = mac;
            state.baseInfo.model = model;
            state.baseInfo.pid = pid;
            state.baseInfo.deviceErrorDataVO = deviceErrorDataVO;
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }

      async function getNetworkDetail() {
        if (!props.deviceData || !props.deviceData.deviceId) return;
        try {
          const res = await getNetworkInfo({ deviceId: props.deviceData.deviceId });
          if (res) {
            const { routerIp, rssi, ssid, wifiMac } = res;
            state.networkInfo.routerIp = routerIp;
            state.networkInfo.rssi = rssi;
            state.networkInfo.ssid = ssid;
            state.networkInfo.wifiMac = wifiMac;
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }

      onMounted(() => {
        getSingleDetail();
        getNetworkDetail();
      });
      return {
        ...toRefs(state),
        getSingleDetail,
        getNetworkDetail,
      };
    },
  });
</script>

<style lang="less" scoped>
  .page-container {
    min-height: 800px;
    .datav-top-l {
      // width: 800px;
      width: 49%;
      height: 594px;
      background: rgba(255, 255, 255, 0.39);
      box-shadow: 0px 3px 6px #e8e8e8;
      opacity: 1;
      border-radius: 10px;
    }
    .datav-top-r {
      // width: 800px;
      width: 49%;
      height: 594px;
      margin-left: 31px;
      // background: rgba(0, 185, 215, 0.39);
    }
  }
  /deep/ .ant-layout-footer {
    background-color: #f6f7fb !important;
  }
</style>
