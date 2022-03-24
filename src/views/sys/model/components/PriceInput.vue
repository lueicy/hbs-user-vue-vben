<template>
  <span class="imputSellt">
    <a-select :value="currency" style="width: 32%" @change="handleCurrencyChange">
      <a-select-option value="用户名字">用户名字</a-select-option>
      <a-select-option value="dollar">Dollar</a-select-option>
    </a-select>
    <span class="Title">搜索</span>
    <a-input
      type="text"
      :value="number"
      @change="handleNumberChange"
      style="width: 44%"
      class="input-border"
    />
  </span>
</template>

<script lang="ts">
  import { watch, defineComponent, h } from 'vue';

  export default defineComponent({
    // props: ['value'],
    setup(props) {
      const value: any = props.value || {};
      const number: any = value.number || {};
      const currency: any = value.currency || {};

      watch(value, (val: any) => {
        number.value = val.number;
        currency.value = val.currency;
      });

      const handleNumberChange = (e) => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
          return;
        }
        triggerChange({ number });
      };

      const handleCurrencyChange = (currency) => {
        triggerChange({ currency });
      };
      const triggerChange = (changedValue) => {
        console.log('changedValue---', changedValue);
        // Should provide an event to pass value to Form.
        // this.$emit('change', Object.assign({}, this.$data, changedValue));
      };
      return {
        handleCurrencyChange,
        handleNumberChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  /deep/.ant-form-item-control-wrapper {
    background-color: pink;
  }
  .Title {
    margin: 0 16px 0 25px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #666666;
  }
  /deep/.ant-select-selection,
  .ant-input {
    border-radius: 16px !important;
    border: 1px solid #999999 !important;
  }
</style>
