<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
    :head-style="headStyle"
  >
    <!-- <p v-if="activeKey === 'tab1'"> -->
    <DeviceManageList ref="manageList" :groupId="activeKey" :groupName="titleName" />
    <!-- </p>
    <p v-if="activeKey === 'tab2'"> 222 </p>
    <p v-if="activeKey === 'tab3'"> 333 </p> -->
  </Card>
</template>
<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent, reactive, ref, onMounted, toRefs } from 'vue';
  import DeviceManageList from './DeviceManageList.vue';
  import { GetlistUserGroupApi } from '/@/api/sys/groupAndDevice';
  let activeKey = ref('total');
  const headStyle = {
    background: '#F6F7FB',
    padding: '0px',
    hight: '40px',
    borderRadius: '10px 10px 0px 0px',
  };
  interface stateType {
    activeKey: any;
    titleName: string;
    tabListTitle: any[];
  }

  export default defineComponent({
    components: {
      Card,
      DeviceManageList,
    },
    setup() {
      const state: stateType = reactive({
        activeKey,
        titleName: '',
        tabListTitle: [],
      });
      const manageList = ref();
      // 群组列表（tabs）
      async function getListData(index, size) {
        let resData = await GetlistUserGroupApi({ pageIndex: index, pageSize: size });
        resData.list.unshift({
          groupId: 'total',
          groupName: '所有设备',
        });
        let tmp = resData.list.map((res) => {
          return {
            key: res.groupId,
            tab: res.groupName,
          };
        });
        state.tabListTitle = tmp;
      }

      function onTabChange(key) {
        activeKey.value = key;
        state.tabListTitle.forEach((res) => {
          if (res.key == key) {
            state.titleName = res.tab;
          }
        });
        manageList.value.fetch(key);
        console.log('onTabChange', key);
      }
      onMounted(() => {
        getListData(1, 20);
      });
      return { ...toRefs(state), onTabChange, headStyle, getListData, manageList };
    },
  });
</script>
<style lang="less" scoped>
  .card-container {
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
  }
  /deep/.ant-tabs-nav .ant-tabs-tab-active {
    color: #00b9d7;
    background: #fff;
    font-weight: 600;
  }
  /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
    color: #00b9d7;
  }
  /deep/ .ant-tabs-ink-bar {
    visibility: hidden;
  }
  /deep/ .ant-tabs-tab {
    padding: 9px 20px;
    margin: 0px;
    border-radius: 8px 8px 0 0;
  }
  /deep/ .ant-card-bordered {
    border: none;
  }
</style>
