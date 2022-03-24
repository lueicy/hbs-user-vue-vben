<template>
  <BasicDrawer
    v-bind="$attrs"
    :isDetail="true"
    :showDetailBack="false"
    @close='closeFunc'
    @register="register"
    width="30%"
    :bodyStyle="{
      background:'#F2F2F2'
    }"
  >
    <Card
      title="用户建议内容"
      :bodyStyle="{
          background:'#ffffff'
          ,boxShadow: '0px 5px 25px 0px #F5F5F5, 0px 1px 2px 0px rgba(210, 210, 210, 0.5)'
          ,padding:'0 24px 24px'
        }"
    >
      <template #extra>
        <span>
          {{suggestion.createTime}}
        </span>
      </template>
      <p>
        {{suggestion.suggestion}}
      </p>

    </Card>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { Card } from 'ant-design-vue';

export default defineComponent({
  components: { BasicDrawer, Card },
  setup() {
    // const CustomerCellAction = ref<HTMLElement>(null);
    const state = reactive({
      suggestion: {},
    });
    const [register] = useDrawerInner((data) => {
      // 方式1
      console.log('方式----11----', data.record.suggestion);
      state.suggestion = data.record;
    });
    const closeFunc = () => {
      console.log('哈哈');
      state.suggestion = {};
    };
    return { ...toRefs(state), closeFunc, register };
  },
});
</script>


<style lang="less" scoped>
.ant-card {
  border-radius: 16px;
  overflow: hidden;
}
</style>