<template>
  <PageWrapper>
    <template #headerContent>
      <CustomerCell />
    </template>
    <LayoutFooter />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import CustomerCell from './components/CustomerCell.vue';
  import LayoutFooter from '/@/components/layoutFooter/LayoutFooter.vue';

  export default defineComponent({
    name: 'DevicePage',
    components: { LayoutFooter, PageWrapper, CustomerCell },
  });
</script>
