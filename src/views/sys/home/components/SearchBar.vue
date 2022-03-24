<template>
  <div class="SearBar-nav flex-1">
    <div class="SearBar-nav-Row">
      <Form
        layout="inline"
        labelAlign='left'
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <FormItem
          label="条件筛选"
          :label-col="formItemLayout01.labelCol"
          :wrapper-col="formItemLayout01.wrapperCol"
        >

          <!-- <Select default-value="1"> -->
          <Select placeholder="设备ID">
            <SelectOption value="1">
              Option 1
            </SelectOption>
            <SelectOption value="2">
              Option 2
            </SelectOption>
            <SelectOption value="3">
              Option 3
            </SelectOption>
          </Select>

        </FormItem>
        <FormItem
          label="搜索内容"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <Input placeholder="input placeholder" />

        </FormItem>
        <FormItem
          :label-col="formItemLayoutSeact.labelCol"
          :wrapper-col="formItemLayoutSeact.wrapperCol"
        >
          <Button
            class="subBtm"
            type="primary"
          >
            查询
          </Button>
        </FormItem>
        <FormItem>
          <Button
            class="restBtm"
            type="dashed"
          >
            重置
          </Button>
        </FormItem>
      </Form>
    </div>

    <Button
      class="AddBtm "
      type="dashed"
    > 添加 </Button>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, reactive, toRefs } from 'vue';

// import { Select, SelectOption, Input, Row, FormItem, Button, Form } from 'ant-design-vue';
import { Select,  Input, Row, Button, Form } from 'ant-design-vue';

export default defineComponent({
  components: {
    Select,
    // SelectOption,
    SelectOption:Select.Option,
    FormItem:Form.Item,
    Input,
    Row,
    Button,
    Form,
    // FormItem,
  },
  setup(props) {
    const state = reactive({
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      formItemLayout01: {
        labelCol: { span: 11 },
        wrapperCol: { span: 14 },
      },
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
      },
    });
    const value: any = props || {};
    const number: any = value.number || {};
    const currency: any = value.currency || {};

    const formItemLayoutSeact: Object = {
      labelCol: { span: 5 },
      wrapperCol: { span: 8 },
    };
    watch(value, (val: any) => {
      number.value = val.number;
      currency.value = val.currency;
    });

    const handleNumberChange = (e) => {
      const number = parseInt(e.target.value || 0, 10);
      if (isNaN(number)) {
        return;
      }
      // triggerChange({ number });
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
      ...toRefs(state),
      handleCurrencyChange,
      handleNumberChange,

      formItemLayoutSeact,
    };
  },
});
</script>

<style lang="less" scoped>
.borderRadius4() {
  border-radius: 4px;
}
.SearBar-nav {
  // margin: 0;
  height: 81px;
  width: 100%;
  background-color: #ffffff;
  // border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 82px 0 66px;
  margin-bottom: 20px;
  &-Row {
    flex-grow: 1;
    .ant-select {
      .borderRadius4();
    }
  }
  .AddBtm {
    .borderRadius4();
    border: 1px solid #ffc400;
    // color: #ffc400;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffc400;
  }
  .restBtm {
    .borderRadius4();
    border: 1px solid #00B9DC;
    // color: #00B9DC;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #00B9DC;
  }
  .subBtm {
    .borderRadius4();
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    background-color: #00B9DC;
    border: 0;
  }

  .Title {
    margin: 0 16px 0 25px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #666666;
  }
  // --------------下拉框-------------------------
  .Class_select {
    background: pink;
    display: inline-block;
    width: 100%;
  }
}
</style>
