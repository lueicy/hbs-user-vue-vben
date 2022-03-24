<template>
  <div :style="{ borderBottom: '1px solid #E9E9E9' }">
    <a-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
    >
      Check all
    </a-checkbox>
  </div>
  <br />
  <a-checkbox-group
    v-model:value="checkedList"
    :options="plainOptions"
  />

  <hr>
  <a-checkbox-group
    v-model:value="valueList"
    @change="onCheckAllChangeList"
  >

    <a-row>
      <a-col
        v-for="(item,i) in abcd"
        :key="i"
        :span="8"
      >
        <a-checkbox :value="item">{{item}}</a-checkbox>
      </a-col>

    </a-row>
  </a-checkbox-group>
  <a-button @click="getData">点击</a-button>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from 'vue';
import { Card, Row, Col, List, Checkbox,  } from 'ant-design-vue';
const plainOptions = ['Apple', 'Pear', 'Orange'];
const abcd = ['a', 'b', 'c', 'd', 'e'];
export default defineComponent({
  components: {
    [Checkbox.name]: Checkbox,
    // [CheckboxGroup.name]: CheckboxGroup,
    CheckboxGroup: Checkbox.Group,

    [Card.name]: Card,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  setup() {
    const state = reactive({
      indeterminate: true,
      checkAll: false,
      checkedList: ['Apple', 'Orange'],
      valueList: [],
    });

    const onCheckAllChange = (e: any) => {
      Object.assign(state, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
      });
    };
    watch(
      () => state.checkedList,
      (val) => {
        console.log('val---', val);
        state.indeterminate = !!val.length && val.length < plainOptions.length;
        state.checkAll = val.length === plainOptions.length;
      }
    );
    watch(
      () => state.valueList,
      (val) => {
        console.log('val-valueList--', val);
        state.indeterminate = !!val.length && val.length < abcd.length;
        state.checkAll = val.length === abcd.length;
      }
    );
    const onCheckAllChangeList = (e: any) => {
      console.log('e===', e);
      Object.assign(state, {
        valueList: e,
        indeterminate: false,
      });
    };
    const value = ref([]);
    const getData = () => {
      // state.indeterminate = true;
      Object.assign(state, {
        valueList: abcd,
      });
      console.log('ref---', state.valueList);
    };
    return {
      ...toRefs(state),
      plainOptions,
      onCheckAllChangeList,
      onCheckAllChange,
      getData,
      value,
      abcd,
    };
  },
});
</script>

