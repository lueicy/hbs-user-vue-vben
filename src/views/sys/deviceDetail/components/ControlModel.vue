<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="设备控制"
    @visible-change="handleVisibleChange"
  >
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
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRefs, nextTick, reactive, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { iconfontJS } from '/@/utils/iconfont';
  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });

  interface stateType {
    modelList?: any;
    doPattern?: any;
    windList?: any;
    doWind?: any;
  }
  export default defineComponent({
    components: { BasicModal, IconFont },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const state: stateType = reactive({
        modelList: [],
        doPattern: '01',
        windList: [],
        doWind: '01',
      });
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
      function selectPattern(type, event) {
        if (type == 'wind') {
          state.doWind = event;
        } else {
          state.doPattern = event;
        }
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
      return { ...toRefs(state), selectPattern, register, model: modelRef, handleVisibleChange };
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
</style>
