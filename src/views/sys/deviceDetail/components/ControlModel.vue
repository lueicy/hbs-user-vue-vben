<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="设备控制"
    @visible-change="handleVisibleChange"
  >
    <!-- 模式 -->
    <div class="flex justify-between">
      <div>模式</div>
      <div>模式块</div>
    </div>
    <!-- 风速 -->
    <div class="pt-3px pr-3px"> 风速 </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicModal },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});
      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        console.log('Data Received', data);
        modelRef.value = { field2: data.data, field1: data.info };
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return { register, model: modelRef, handleVisibleChange };
    },
  });
</script>
<style lang="less" scoped></style>
