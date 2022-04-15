<template>
  <BasicModal v-bind="$attrs" @register="register" title="定时模式" width="716px">
    <!-- 模式 -->
    <div class="flex justify-start model-li">
      <div class="li-title mg-right">模式</div>
      <div v-for="item in modelList" :key="item.pattern">
        <div
          class="flex flex-col text-center align-center mg-right"
          :class="item.pattern == doPattern ? 'model-selected' : ''"
          @click="selectPattern('model', item.pattern)"
        >
          <span class="iconf-class"><icon-font type="icon-greenpery" class="icon-g" /></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- 00-关机，01-开机 -->
      <div class="flex flex-col align-center mg-right" @click="trunBtn">
        <span class="iconf-class">
          <icon-font :type="open == '01' ? 'icon-open' : 'icon-turnoff'" class="icon-g" />
        </span>
        <span>{{ open == '01' ? '开机' : '关机' }}</span>
      </div>
    </div>
    <!-- 风速 -->
    <div class="flex justify-start model-li">
      <div class="li-title mg-right">风速</div>
      <div v-for="item in windList" :key="item.speed">
        <div
          class="flex flex-col text-center li-block"
          :class="item.speed == doWind ? 'model-selected' : ''"
          @click="selectPattern('wind', item.speed)"
        >
          <span class="iconf-class"><icon-font type="icon-greenpery" class="icon-g" /></span>
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
      <div class="li-do-title">执行时间</div>
      <div>
        <TimePicker v-model:value="dateValue" format="HH:mm" @change="dateOk" />
      </div>
    </div>
    <!-- 模式名称 -->
    <div class="flex justify-start model-li">
      <div class="li-do-title">模式名称</div>
      <div>
        <a-input placeholder="默认工作日" v-model:value="modelName" />
      </div>
      <div class="add-class">
        <a-button type="primary" @click="handleAdd"> 添加 </a-button>
      </div>
    </div>
    <!-- 定时模式 -->
    <div class="flex flex-col justify-start">
      <div class="ding-title">定时模式</div>
      <div class="flex justify-between ding-item" v-for="item in sceneList" :key="item.id">
        <div class="ding-item-l">
          <div class="flex justify-start item-l-top">
            <div class="top-mag" style="min-width: 120px">
              <span class="ting-iconf"><icon-font type="icon-biaoqian" class="icon-g" /></span>
              <span>{{ item.name }}</span>
            </div>
            <div class="top-mag" v-show="item.pattern">
              <span class="ting-iconf"><icon-font type="icon-greenpery" class="icon-g" /></span>
              <span>{{ dealPattern(item.pattern) }}</span>
            </div>
            <!-- 01-低速 02-中速 03-高速 -->
            <div class="top-mag" v-show="item.wind">
              <span class="ting-iconf">
                <icon-font
                  :type="
                    item.wind == '01'
                      ? 'icon-wind'
                      : item.wind == '02'
                      ? 'icon-wind1'
                      : 'icon-wind2'
                  "
                  class="icon-g"
                />
              </span>
              <span>{{ item.wind == '01' ? '低速' : item.wind == '02' ? '中速' : '高速' }}</span>
            </div>
            <div class="top-mag">
              <span class="ting-iconf"><icon-font type="icon-shizhong" class="icon-g" /></span>
              <span>{{ item.triggerTime }}</span>
            </div>
            <div class="top-mag">
              <span class="ting-iconf"><icon-font type="icon-greenpery" class="icon-g" /></span>
              <span>{{ item.open == '00' ? '关机' : '开机' }}</span>
            </div>
          </div>
          <div class="flex item-l-bot">
            <div v-for="dItem in dealDay2(item.weekDay)" :key="dItem">
              <span class="weekday-class">{{ dItem }}</span>
            </div>
          </div>
        </div>
        <div class="ding-item-r">
          <div style="width: 30px; hight: 30px; color: #a9a9af; font-size: 25px">
            <Popconfirm
              title="你确定要删除吗？"
              @confirm="confirmDelete(item.id)"
              okText="确定"
              cancelText="取消"
            >
              <span><icon-font type="icon-shanchu" class="icon-g" /></span>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRefs, watch, reactive, onMounted, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { Checkbox, TimePicker, Popconfirm } from 'ant-design-vue';
  import {
    getBySubtype,
    addSceneClock,
    getListScene,
    deleteScene,
  } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { omit } from 'lodash-es';
  import { isFunction } from '/@/utils/is';
  import { iconfontJS } from '/@/utils/iconfont';
  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });

  import dayjs from 'dayjs';

  interface stateType {
    modelList?: any;
    doPattern?: any;
    windList?: any;
    doWind?: any;
    indeterminate: boolean;
    checkAll: boolean;
    checkedList: any;
    dateValue: any;
    open?: any;
    modelName: string;
    sceneList?: any; // 定时模式列表
  }
  const plainOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  export default defineComponent({
    components: {
      BasicModal,
      IconFont,
      CheckboxGroup: Checkbox.Group,
      Checkbox,
      TimePicker: TimePicker,
      Popconfirm,
    },
    props: {
      deviceData: { type: Object, default: () => {} },
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
        open: '',
        modelName: '',
        sceneList: [],
      });
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { success } = createMessage;
      const modelRef = ref({});
      const [register, { closeModal }] = useModalInner();

      const onCheckAllChange = (e: any) => {
        Object.assign(state, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
        });
      };
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
        console.log('modeList', modeList);
        console.log('winList', winList);
        return {
          modeList: modeList,
          newWindList: winList,
        };
      };
      const chagneJSONParse = (item: string): string => {
        return JSON.parse(item);
      };
      const dealPattern = computed(() => {
        return function (event) {
          let patternText = '';
          switch (event) {
            case '01':
              patternText = '智能';
              break;
            case '02':
              patternText = '新风';
              break;
            case '03':
              patternText = '净化';
              break;
            case '04':
              patternText = '送风';
              break;
            case '05':
              patternText = '排风';
              break;
            case '06':
              patternText = '除味';
              break;
            case '07':
              patternText = '节能';
              break;
            case '08':
              patternText = '除湿';
              break;
            default:
              patternText = '智能';
          }
          return patternText;
        };
      });
      const dealDay = (arr: any): any => {
        let res = arr.map((e) => {
          let del = '';
          switch (e) {
            case '星期一':
              del = '1';
              break;
            case '星期二':
              del = '2';
              break;
            case '星期三':
              del = '3';
              break;
            case '星期四':
              del = '4';
              break;
            case '星期五':
              del = '5';
              break;
            case '星期六':
              del = '6';
              break;
            case '星期日':
              del = '7';
              break;
          }
          return del;
        });
        return res.join(',');
      };
      const dealDay2 = computed(() => {
        return function (event) {
          let arr1 = event.split(',');
          let arr2 = arr1.map((item) => {
            let dayText = '';
            switch (item) {
              case '1':
                dayText = '周一';
                break;
              case '2':
                dayText = '周二';
                break;
              case '3':
                dayText = '周三';
                break;
              case '4':
                dayText = '周四';
                break;
              case '5':
                dayText = '周五';
                break;
              case '6':
                dayText = '周六';
                break;
              case '7':
                dayText = '周日';
                break;
              default:
                dayText = '';
            }
            return dayText;
          });
          return arr2;
        };
      });

      watch(
        () => state.checkedList,
        (val) => {
          state.indeterminate = !!val.length && val.length < plainOptions.length;
          state.checkAll = val.length === plainOptions.length;
        }
      );
      const getPopConfirmAttrs = computed(() => {
        return (attrs) => {
          const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon']);
          if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
            originAttrs['onConfirm'] = attrs.confirm;
          if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
            originAttrs['onCancel'] = attrs.cancel;
          return originAttrs;
        };
      });

      function selectPattern(type, event) {
        if (type == 'wind') {
          state.doWind = event;
        } else {
          state.doPattern = event;
        }
      }

      function dateOk(time) {
        let temT = dayjs(time).format('HH:mm').split(':').join('');
        console.log(temT);
      }

      async function confirmDelete(id) {
        try {
          const res = await deleteScene(id);
          if (res) {
            console.log('confirmDelete', res);
            success('删除成功');
            getSceneList();
            // closeModal();
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      function trunBtn() {
        if (state.open == '01') {
          state.open = '00';
        } else {
          state.open = '01';
        }
      }
      async function getdeviceModel() {
        if (!props.deviceData) return;
        state.open = props.deviceData.open;
        let res = await getBySubtype(props.deviceData.model);
        let { modeList, newWindList } = filtersMODE(res.customData);
        state.modelList = modeList;
        state.windList = newWindList;
      }
      async function handleAdd() {
        let weekDay = dealDay(state.checkedList);
        let params = {
          name: state.modelName,
          open: state.open,
          ownerId: props.deviceData.deviceId,
          ownerType: '01',
          triggerTime: dayjs(state.dateValue).format('HH:mm').split(':').join(''),
          weekDay: weekDay,
          pattern: state.doPattern,
          wind: state.doWind,
          status: '01',
        };
        try {
          const res = await addSceneClock(params);
          if (res) {
            success('添加成功');
            closeModal();
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      async function getSceneList() {
        if (!props.deviceData) return;
        let res = await getListScene(props.deviceData.deviceId);
        state.sceneList = res;
      }

      onMounted(() => {
        getdeviceModel();
        getSceneList();
      });
      return {
        ...toRefs(state),
        selectPattern,
        register,
        model: modelRef,
        onCheckAllChange,
        plainOptions,
        dateOk,
        getdeviceModel,
        getSceneList,
        filtersMODE,
        getPopConfirmAttrs,
        confirmDelete,
        trunBtn,
        handleAdd,
        closeModal,
        dealPattern,
        dealDay2,
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
  .iconf-class {
    font-size: 30px;
    height: 40px;
  }
  // 定时模式
  .ding-title {
    width: 72px;
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #3e4159;
    opacity: 1;
    margin: 20px 0px 20px 10px;
    border-bottom: 2px solid #09b9dc;
  }
  .ding-item {
    width: 670px;
    height: 69px;
    padding: 10px;
    background: #f5fcfe;
    margin-bottom: 10px;
    .top-mag {
      margin-right: 40px;
    }
  }
  .ting-iconf {
    font-size: 20px;
    margin-right: 8px;
  }
  .add-class {
    margin-left: 340px;
    padding-top: 25px;
  }
  .weekday-class {
    width: 24px;
    height: 16px;
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
    color: #a9a9af;
    opacity: 0.7;
    margin-left: 30px;
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
