<template>
  <BasicModal v-bind="$attrs" @register="register" title="定时模式" width="716px">
    <!-- 模式 -->
    <div class="flex justify-between model-li">
      <div class="li-title">模式</div>
      <div v-for="item in modelList" :key="item.pattern">
        <div
          class="flex flex-col text-center align-center"
          :class="item.pattern == doPattern ? 'model-selected' : ''"
          @click="selectPattern('model', item.pattern)"
        >
          <span><icon-font type="icon-greenpery" class="icon-g" /></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 风速 -->
    <div class="flex justify-start model-li">
      <div class="li-title mg-right">风速</div>
      <div v-for="item in windList" :key="item.pattern">
        <div
          class="flex flex-col text-center li-block"
          :class="item.pattern == doWind ? 'model-selected' : ''"
          @click="selectPattern('wind', item.pattern)"
        >
          <span><icon-font type="icon-greenpery" class="icon-g" /></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 执行日期 -->
    <div class="flex justify-start model-li">
      <div class="li-do-title">执行日期</div>
      <div>
        <Checkbox
          v-model:checked="checkAll"
          :indeterminate="indeterminate"
          @change="onCheckAllChange"
        >
          全选
        </Checkbox>
        <CheckboxGroup v-model:value="checkedList" :options="plainOptions" />
      </div>
    </div>
    <!-- 执行时间 -->
    <div class="flex justify-start model-li">
      <div class="li-do-title">执行日期</div>
      <div>
        <TimePicker v-model:value="dateValue" format="HH:mm" @change="dateOk" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRefs, watch, reactive, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { Checkbox, TimePicker } from 'ant-design-vue';
  import { iconfontJS } from '/@/utils/iconfont';
  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });

  import dayjs from 'dayjs'

  interface stateType {
    modelList?: any;
    doPattern?: any;
    windList?: any;
    doWind?: any;
    indeterminate: boolean;
    checkAll: boolean;
    checkedList: any;
    dateValue: any;
  }
  const plainOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  export default defineComponent({
    components: {
      BasicModal,
      IconFont,
      CheckboxGroup: Checkbox.Group,
      Checkbox,
      TimePicker: TimePicker,
    },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const state: stateType = reactive({
        modelList: [],
        doPattern: '01',
        windList: [],
        doWind: '01',
        indeterminate: true,
        checkAll: false,
        checkedList: [],
        dateValue: '',
      });
      const modelRef = ref({});
      const [register] = useModalInner();

      const onCheckAllChange = (e: any) => {
        Object.assign(state, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
        });
      };
      watch(
        () => state.checkedList,
        (val) => {
          state.indeterminate = !!val.length && val.length < plainOptions.length;
          state.checkAll = val.length === plainOptions.length;
        }
      );

      function selectPattern(type, event) {
        if (type == 'wind') {
          state.doWind = event;
        } else {
          state.doPattern = event;
        }
      }

      function dateOk(time) {
        console.log('dateValue', dayjs(time).format('HH:mm'));
      }

      onMounted(() => {
        state.modelList = [
          {
            name: '智能',
            pattern: '01',
          },
          {
            name: '新风',
            pattern: '02',
          },
          {
            name: '送风',
            pattern: '03',
          },
          {
            name: '节能',
            pattern: '04',
          },
          {
            name: '除味',
            pattern: '05',
          },
          {
            name: '关机',
            pattern: '06',
          },
        ];
        state.windList = [
          {
            name: '低速',
            pattern: '01',
          },
          {
            name: '中速',
            pattern: '02',
          },
          {
            name: '高速',
            pattern: '03',
          },
        ];
      });
      return {
        ...toRefs(state),
        selectPattern,
        register,
        model: modelRef,
        onCheckAllChange,
        plainOptions,
        dateOk,
      };
    },
  });
</script>
<style lang="less" scoped>
  .model-li {
    height: 80px;
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
    .li-title {
      font-size: 16px;
      color: #3e4159;
      line-height: 50px;
    }
    .li-do-title {
      font-size: 16px;
      color: #3e4159;
      min-width: 77px;
    }
    .mg-right {
      margin-right: 45px;
    }
    .li-block {
      margin-right: 45px;
    }
  }
  .model-selected {
    color: #09b9dc;
  }
  /deep/ .scrollbar .scroll-container {
    padding: 0px 14px !important;
  }
  /deep/ .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #00b9dc !important;
    border-color: #00b9dc !important;
  }
  /deep/ .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: #00b9dc !important;
  }
</style>
