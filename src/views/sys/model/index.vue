<template>
  <PageWrapper>
    <template #headerContent>
      <!-- <SearchBar /> -->
      <CustomerCell />
      <!-- <FormTable /> -->
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
  name: 'ModelTypePage',
  components: { LayoutFooter, PageWrapper, CustomerCell },
});
</script>

