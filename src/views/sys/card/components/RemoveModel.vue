<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="移动设备"
    :helpMessage="['提示1', '提示2']"
    @visible-change="handleShow"
  >
    <!-- <template #insertFooter>
      <a-button type="primary" danger @click="setLines" :disabled="loading">点我更新内容</a-button>
    </template> -->
    <template v-if="loading">
      <div class="empty-tips">加载中，稍等3秒……</div>
    </template>
    <template v-if="!loading">
      <a-list>
        <RadioGroup v-model:value="groupList" @change="onCheckAllChangeList">
          <a-row>
            <template v-for="(item, i) in groupTmpList" :key="item.id">
              <a-col class="group-item">
                <a-list-item class="w-full">{{ item.name }} + {{ i }} </a-list-item>
                <Radio :value="item.id" />
              </a-col>
            </template>
          </a-row>
        </RadioGroup>
      </a-list>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col, List, Radio } from 'ant-design-vue';
  const groupTmpList: any[] = [
    { id: 1, name: 'EH-Z-7G650', aqi: '1', pmValue: 30, coValue: 20 },
    { id: 2, name: 'EH-Z-7G400A', aqi: '2', pmValue: 40, coValue: 50 },
    { id: 3, name: 'EH-Z-7B200F', aqi: '4', pmValue: 0, coValue: 0 },
    { id: 4, name: 'XS-D250A', aqi: '3', pmValue: 50, coValue: 60 },
    { id: 5, name: 'XS-D150A', aqi: '4', pmValue: 0, coValue: 0 },
    { id: 6, name: 'EH-Z-7G650', aqi: '1', pmValue: 30, coValue: 20 },
    { id: 7, name: 'EH-Z-7G400A', aqi: '2', pmValue: 40, coValue: 50 },
    { id: 8, name: 'EH-Z-7B200F', aqi: '3', pmValue: 50, coValue: 60 },
    { id: 9, name: 'XS-D250A', aqi: '1', pmValue: 30, coValue: 20 },
    { id: 10, name: 'XS-D150A', aqi: '4', pmValue: 0, coValue: 0 },
    { id: 11, name: 'EH-Z-7G650', aqi: '1', pmValue: 30, coValue: 20 },
    { id: 12, name: 'EH-Z-7G400A', aqi: '2', pmValue: 40, coValue: 50 },
    { id: 13, name: 'EH-Z-7B200F', aqi: '3', pmValue: 50, coValue: 60 },
    { id: 14, name: 'XS-D250A', aqi: '1', pmValue: 30, coValue: 20 },
  ];

  // interface selectGroupType {
  //   groupList?: any[];
  // }
  export default defineComponent({
    components: {
      BasicModal,
      RadioGroup: Radio.Group,
      Radio: Radio,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const state = reactive({
        indeterminate: true,
        groupList: [],
      });
      const loading = ref(true);
      const lines = ref(10);
      const [register, { setModalProps, redoModalHeight }] = useModalInner();

      watch(
        () => lines.value,
        () => {
          redoModalHeight();
        }
      );
      const onCheckAllChangeList = (e: any) => {
        console.log('e===', e);
        Object.assign(state, {
          valueList: e,
          indeterminate: false,
        });
      };
      function handleShow(visible: boolean) {
        if (visible) {
          loading.value = true;
          setModalProps({ loading: true, confirmLoading: true });
          setTimeout(() => {
            lines.value = Math.round(Math.random() * 30 + 5);
            loading.value = false;
            setModalProps({ loading: false, confirmLoading: false });
          }, 1000);
        }
      }

      function setLines() {
        lines.value = Math.round(Math.random() * 20 + 10);
      }
      return {
        register,
        loading,
        handleShow,
        lines,
        setLines,
        groupTmpList,
        ...toRefs(state),
        onCheckAllChangeList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .group-item {
    display: flex;
    flex-direction: initial;
    justify-content: space-between;
    align-items: center;
    min-width: 450px;
    border-bottom: 1px solid #f0f0f0;
    li {
      border: none;
    }
  }
  /deep/ .ant-radio-checked .ant-radio-inner {
    border-color: #00b9d7;
  }
  /deep/ .ant-radio-inner::after {
    background-color: #00b9d7;
  }
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
