<template>
  <div>我是设备详情页面{{ deviceData.name }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      deviceData: {
        type: Object,
        default: null,
      },
    },
  });
</script>

<style lang="less" scoped></style>
