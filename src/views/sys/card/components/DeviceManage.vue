<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <DeviceManageList />
    </p>
    <p v-if="activeKey === 'tab2'"> 222 </p>
    <p v-if="activeKey === 'tab3'"> 333 </p>
  </Card>
</template>
<script lang="ts">
  import { ref, onMounted } from 'vue';
  import { Card } from 'ant-design-vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  import DeviceManageList from './DeviceManageList.vue';
  const activeKey = ref('tab1');

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
      tab: '778899',
    },
  ];

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
      return { ...toRefs(state), tabListTitle, onTabChange };
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
</style>
