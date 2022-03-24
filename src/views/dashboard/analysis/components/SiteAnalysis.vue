<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysisBar />
    </p>
    <p v-if="activeKey === 'tab2'">
      <VisitAnalysis />
    </p>
  </Card>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { Select, Input, Row, Button, Form } from 'ant-design-vue';

import { Card } from 'ant-design-vue';

import VisitAnalysis from './VisitAnalysis.vue';
import VisitAnalysisBar from './VisitAnalysisBar.vue';

export default defineComponent({
  components: { Card, VisitAnalysis, VisitAnalysisBar },
  setup() {
    const activeKey = ref('tab1');

    const tabListTitle = [
      {
        key: 'tab1',
        tab: '设备增量',
        // tab: '用户活跃',
      },
      {
        key: 'tab2',
        // tab: '设备增量',
        tab: '用户增量',
      },
    ];

    function onTabChange(key) {
      activeKey.value = key;
    }
    return { tabListTitle, activeKey, onTabChange };
  },
});
</script>
<style lang="less" scoped>
/deep/.ant-tabs-tab-active{
  color: #00B9D7 !important;
}
/deep/.ant-tabs-ink-bar{
  background-color:  #00B9D7 !important;
}
</style>
