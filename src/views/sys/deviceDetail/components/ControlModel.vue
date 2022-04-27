<template>
  <BasicModal v-bind="$attrs" @register="register" title="设备控制" width="716px" @ok="handleOK">
    <!-- 模式 -->
    <div class="flex justify-start model-li">
      <div class="li-title mg-right">模式</div>
      <div v-for="item in modelList" :key="item.pattern">
        <div
          class="flex flex-col text-center align-center mg-right"
          :class="item.pattern == doPattern ? 'model-selected' : ''"
          @click="selectPattern(item.pattern)"
        >
          <span class="iconf-class"
            ><icon-font :type="dealPattern(item.pattern, 'icon')" class="icon-g"
          /></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- 00-关机，01-开机 -->
      <div class="flex flex-col align-center mg-right" @click="trunBtn">
        <span class="iconf-class">
          <icon-font :type="open == '00' ? 'icon-open' : 'icon-turnoff'" class="icon-g" />
        </span>
        <span>关机</span>
      </div>
    </div>
    <!-- 风速 -->
    <div class="flex justify-start model-li">
      <div class="li-title mg-right">风速</div>
      <div v-for="item in windList" :key="item.speed">
        <div
          class="flex flex-col text-center li-block"
          :class="item.speed == doWind ? 'model-selected' : ''"
          @click="selectWind(item.speed)"
        >
          <span class="iconf-class"
            ><icon-font
              :type="
                item.speed == '01' ? 'icon-wind' : item.speed == '02' ? 'icon-wind1' : 'icon-wind2'
              "
              class="icon-g"
          /></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRefs, reactive, onMounted, computed, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getBySubtype, sendCommand } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
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
    open?: any;
    openLock: boolean;
  }
  export default defineComponent({
    components: { BasicModal, IconFont },
    props: {
      deviceData: { type: Object, default: () => {} },
    },
    setup(props) {
      const state: stateType = reactive({
        modelList: [],
        doPattern: '',
        windList: [],
        doWind: '',
        open: '',
        openLock: false, // 开关指令有变化就下发开关机指令，没变化就不下发
      });
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { error, success } = createMessage;
      const modelRef = ref({});
      const [register, { closeModal }] = useModalInner();
      const dealPattern = computed(() => {
        return function (event, type) {
          let patternText = '';
          let icon = '';
          switch (event) {
            case '01':
              patternText = '智能';
              icon = 'icon-auto';
              break;
            case '02':
              patternText = '新风';
              icon = 'icon-newwind';
              break;
            case '03':
              patternText = '净化';
              icon = 'icon-newwind';
              break;
            case '04':
              patternText = '送风';
              icon = 'icon-biowing';
              break;
            case '05':
              patternText = '排风';
              icon = 'icon-deodorize';
              break;
            case '06':
              patternText = '除味';
              icon = 'icon-deodorize';
              break;
            case '07':
              patternText = '节能';
              icon = 'icon-energy';
              break;
            default:
              patternText = '智能';
              icon = 'icon-auto';
          }
          return type == 'icon' ? icon : patternText;
        };
      });
      const filtersMODE = (item: string): any => {
        let data: any = chagneJSONParse(item);
        let modeList: object[] = data.modeArray.map((e) => {
            return {
              name: e.name,
              pattern: e.mode,
            };
          }),
          winList: object[] = data.windArray.map((item) => {
            return {
              name: item.name,
              speed: item.speed,
            };
          });
        return {
          modeList: modeList,
          newWindList: winList,
        };
      };
      const chagneJSONParse = (item: string): string => {
        return JSON.parse(item);
      };
      function trunBtn() {
        console.log('state.open', state.open);
        if (state.open == '01') {
          state.open = '00';
          state.doWind = '';
          state.doPattern = '';
        } else {
          state.open = '01';
        }
      }
      // XS-D250A-XHK、XS-D350A、XS-D150A、XS-D500A 智能（弱-01）
      // EH-Z-7G650、EH-Z-7G400A、EH-Z-7G750  智能,节能（弱-01）
      // EH-Z-B200F-HET、EH-Z-7B100A 智能(低-02)
      function selectPattern(event) {
        if (state.open == '00') return;
        state.doPattern = event;
        if (state.doPattern == '01') {
          // 智能
          if (
            props.deviceData.model == 'EH-Z-B200F-HET' ||
            props.deviceData.model == 'EH-Z-7B100A'
          ) {
            state.doWind = '02';
          } else {
            state.doWind = '01';
          }
        }
        if (state.doPattern == '07') {
          // 节能
          if (
            props.deviceData.model == 'EH-Z-7G650' ||
            props.deviceData.model == 'EH-Z-7G400A' ||
            props.deviceData.model == 'EH-Z-7G750'
          ) {
            state.doWind = '01';
          }
        }
      }
      function selectWind(event) {
        if (state.open == '00') return;

        if (state.doPattern == '01' || state.doPattern == '07') {
          if (state.doPattern == '07' && event !== '01') return;
          if (state.doPattern == '01') {
            if (
              props.deviceData.model == 'EH-Z-B200F-HET' ||
              props.deviceData.model == 'EH-Z-7B100A'
            ) {
              state.doWind = '02';
            } else {
              state.doWind = '01';
            }
          }
        } else {
          state.doWind = event;
        }
      }
      async function getdeviceModel() {
        if (!props.deviceData) return;
        state.open = props.deviceData.open;
        state.doWind = props.deviceData.wind;
        state.doPattern = props.deviceData.pattern;
        let res = await getBySubtype(props.deviceData.model);
        let { modeList, newWindList } = filtersMODE(res.customData);
        state.modelList = modeList;
        state.windList = newWindList;
      }
      async function handleOK() {
        // if (state.doPattern == '01' || state.doPattern == '07') {
        //   state.doWind = '01';
        // }
        // 开关机指令
        let param1 = {
          command: '01' + state.open,
        };
        // 风速+模式指令
        let param2 = {
          command: '02' + state.doPattern + state.doWind,
        };
        if (state.open == '00') {
          try {
            const res1 = await sendCommand(props.deviceData.deviceId, param1);
            if (res1) {
              success('操作成功');
              closeModal();
            }
          } catch (error: any) {
            createErrorModal({
              title: t('sys.api.errorTip'),
              content: error.message || t('sys.api.networkExceptionMsg'),
            });
          }
        } else {
          try {
            const open = await sendCommand(props.deviceData.deviceId, param1);
            const res2 = await sendCommand(props.deviceData.deviceId, param2);
            console.log('open', open);
            if (res2) {
              success('操作成功');
              closeModal();
            }
          } catch (error: any) {
            createErrorModal({
              title: t('sys.api.errorTip'),
              content: error.message || t('sys.api.networkExceptionMsg'),
            });
          }
        }
      }

      onMounted(() => {
        getdeviceModel();
      });
      return {
        ...toRefs(state),
        selectPattern,
        selectWind,
        register,
        model: modelRef,
        trunBtn,
        getdeviceModel,
        closeModal,
        handleOK,
        dealPattern,
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
    .mg-right {
      margin-right: 45px;
    }
    .li-block {
      margin-right: 45px;
    }
  }
  .iconf-class {
    font-size: 30px;
    height: 40px;
  }
  .model-selected {
    color: #09b9dc;
  }
  /deep/ .scrollbar .scroll-container {
    padding: 0px 14px !important;
  }
</style>
