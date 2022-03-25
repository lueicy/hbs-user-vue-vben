<template>
  <PageWrapper :class="prefixCls" title="">
    <template #headerContent>
      <WorkbenchHeader />
    </template>
    <DeviceManage class="rounded-t enter-y" />

    <Drawer @register="register5" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import DeviceManage from './components/DeviceManage.vue';
  import RippleDirective from '/@/directives/ripple';
  import { useDrawer } from '/@/components/Drawer';
  import Drawer from './components/Drawer.vue';

  export default defineComponent({
    components: {
      Drawer,
      WorkbenchHeader,
      DeviceManage,
      PageWrapper,
    },
    directives: {
      Ripple: RippleDirective,
    },

    setup() {
      const [register5] = useDrawer();

      return {
        register5,
      };
    },
  });
</script>
