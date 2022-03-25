<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
    :head-style="headStyle"
  >
    <!-- <p v-if="activeKey === 'tab1'"> -->
    <DeviceManageList :groupId="activeKey" />
    <!-- </p>
    <p v-if="activeKey === 'tab2'"> 222 </p>
    <p v-if="activeKey === 'tab3'"> 333 </p> -->
  </Card>
</template>
<script lang="ts">
  import { ref, onMounted } from 'vue';
  import { Card } from 'ant-design-vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  import DeviceManageList from './DeviceManageList.vue';
  let activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '流量趋势',
    },
    {
      key: 'tab2',
      tab: '访问量',
    },
    {
      key: 'tab3',
      tab: '778899999999999999',
    },
  ];
  const headStyle = {
    background: '#F6F7FB',
    padding: '0px',
    hight: '40px',
    borderRadius: '10px 10px 0px 0px',
  };

  export default defineComponent({
    components: {
      Card,
      DeviceManageList,
    },
    setup() {
      const state = reactive({
        activeKey,
      });

      function onTabChange(key) {
        activeKey.value = key;
        console.log('onTabChange', activeKey.value);
      }
      onMounted(() => {
        console.log('activeKey', activeKey.value);
      });
      return { ...toRefs(state), tabListTitle, onTabChange, headStyle };
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
  /deep/ .ant-tabs-ink-bar {
    visibility: hidden;
  }
  /deep/ .ant-tabs-tab {
    padding: 9px 20px;
    margin: 0px;
    border-radius: 10px 10px 0 0;
  }
</style>
