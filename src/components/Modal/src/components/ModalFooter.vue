<template>
  <div>
    <slot name="insertFooter"></slot>
    <a-button
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn"
      class="concelBtm"
    >
      {{ cancelText }}
    </a-button>
    <slot name="centerFooter"></slot>
    <a-button
      :type="okType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
      class="comfirmBtm"
    >
      {{ okText }}
    </a-button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { basicProps } from '../props';
export default defineComponent({
  name: 'BasicModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  setup(_, { emit }) {
    function handleOk(e: Event) {
      emit('ok', e);
    }

    function handleCancel(e: Event) {
      emit('cancel', e);
    }

    return { handleOk, handleCancel };
  },
});
</script>

<style lang="less" scoped>
.btmClass {
  // width: 80px;
  // height: 40px;
  border-radius: 4px;
  // font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.comfirmBtm {
  background-color: #00B9DC;
  .btmClass();
  border: 0;
  color: #ffffff;
}
.concelBtm {
  .btmClass();
  // border: 1px solid #838a9d;
  border: 1px solid #838a9d;
  color: #838a9d;
}
</style>