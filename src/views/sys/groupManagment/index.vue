<template>
  <PageWrapper :class="prefixCls" title="">
    <template #headerContent>
      <WorkbenchHeader />
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import RippleDirective from '/@/directives/ripple';
  import { useDrawer } from '/@/components/Drawer';

  export default defineComponent({
    components: {
      WorkbenchHeader,
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
