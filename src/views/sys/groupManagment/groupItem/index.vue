<template>
  <div :class="prefixCls" title="">
    <template v-if="isDetail">
      <div style="margin: 0px 32px 32px 32px">
        <a-button @click="goback" class="back-btn">
          <Icon icon="ant-design:arrow-left-outlined" style="font-size: 21px" />
          返回
        </a-button>
        <div class="page-conent">
          <DeviceManageList
            ref="manageList"
            :groupId="groupId"
            :groupName="groupName"
            :showSetting="false"
          />
        </div>
      </div>
    </template>

    <template v-if="!isDetail">
      <div style="margin: 0px 32px">
        <a-button @click="isDetail = !isDetail" class="back-btn">
          <Icon icon="ant-design:arrow-left-outlined" style="font-size: 21px" />
          返回
        </a-button>
      </div>

      <DeviceDetail :deviceData="deviceData" />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, toRefs, onBeforeUnmount } from 'vue';
  import DeviceManageList from '/@/views/sys/card/components/DeviceManageList.vue';
  import DeviceDetail from '/@/views/sys/deviceDetail/index.vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute, useRouter } from 'vue-router';
  import bus from '/@/utils/bus';
  import { Icon } from '/@/components/Icon';
  import { getDeviceDetail } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  interface stateType {
    isDetail: boolean;
    groupId?: any;
    groupName: any;
    deviceData: any;
  }
  export default defineComponent({
    components: {
      DeviceManageList,
      PageWrapper,
      DeviceDetail,
      Icon,
    },
    setup() {
      const route = useRoute();
      const { back } = useRouter();
      const state: stateType = reactive({
        isDetail: true, //是否开启选择
        groupId: route.params.id,
        groupName: route.params.groupName,
        deviceData: {},
      });

      function goback() {
        back();
      }
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
      bus.on('showDetail222', catchShow);
      onMounted(() => {
        if (route.params.id) {
          state.groupId = route.params.id;
        }
        console.log('id', route.params);
      });

      onBeforeUnmount(() => {
        bus.off('showDetail222', catchShow);
      });
      return {
        catchShow,
        ...toRefs(state),
        goback,
        prefixCls: 'group-item-page',
      };
    },
  });
</script>

<style lang="less" scoped>
  .page-container {
    padding: 32px;
  }
  .back-btn {
    border: none;
    font-size: 18px;
    font-weight: 550;
    box-shadow: none;
    background: none;
    margin: 8px 0px;
    padding-left: 0px;
  }
  .page-conent {
    background: #f6f7fb;
    padding: 16px 20px;
    min-height: 800px;
  }
</style>
