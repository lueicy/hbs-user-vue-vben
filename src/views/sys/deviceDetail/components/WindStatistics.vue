<template>
  <div class="flex flex-col wind-container">
    <div class="flex flex-col wind-con-overview">
      <div class="over-title">风量统计</div>
      <div class="over-date">
        <DatePicker v-model:value="dateValue" @change="dateOk" format="YYYY-MM" picker="month" />
      </div>
      <div class="flex justify-between flex-nowrap model-li">
        <template v-for="item in modelTypeList" :key="item.pattern">
          <div class="model-item" @click="clickModel(item.pattern)">
            <div class="flex justify-between hearder">
              <div class="hearder-text">{{ dealPattern(item.pattern, 'text') }}</div>
              <div class="model-icon">
                <icon-font :type="dealPattern(item.pattern, 'icon')" class="icon-g" />
              </div>
            </div>
            <div class="flex justify-between footer">
              <span>风量：</span>
              <span>{{ item.totalVolume }}m³</span>
            </div>
          </div>
        </template>
      </div>
      <div class="over-title">数据概况</div>
      <div class="flex over-content">
        <div class="step-side">
          <a-steps progress-dot :current="modelList.length" direction="vertical">
            <template v-for="(item,i) in modelList" :key="i">
              <a-step title="Finished" :description="''" style="display: inline-block">
                <!-- <template #icon>
                  <icon-font :type="dealPattern(item.pattern, 'icon')" class="icon-g" />
                </template> -->
              </a-step>
            </template>
          </a-steps>
        </div>

        <div class="data-con">
          <template v-for="(item, i) in modelList" :key="i">
            <div class="flex data-con">
              <div class="flex model-icon">
                <icon-font :type="dealPattern(item.pattern, 'icon')" class="icon-g" />
              </div>
              <div class="flex justify-between data-cov">
                <div class="flex flex-col justify-around date-item">
                  <div class="item-use">
                    <span class="use-title">使用时长：</span>
                    <span class="use-time">{{ countMinute(item.beginTime, item.finishTime) }}</span>
                  </div>
                  <div class="use-date"
                    >{{ fixTimeFormat(item.beginTime) }} - {{ fixTimeFormat(item.finishTime) }}</div
                  >
                </div>
                <div class="wind-item">
                  <span>风量： </span>
                  <span>{{ item.volume }} m³ </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, toRefs, reactive, onMounted, computed } from 'vue';
  import { Steps, DatePicker } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration.js';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { iconfontJS } from '/@/utils/iconfont';
  import { getWindInfo, getModelType } from '/@/api/sys/groupAndDevice';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  dayjs.extend(duration);

  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });
  interface stateType {
    modelList?: any;
    modelTypeList?: any;
    icon?: string;
  }

  export default defineComponent({
    components: {
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      IconFont,
      DatePicker: DatePicker.MonthPicker,
      // Icon,
    },
    props: {
      deviceId: {
        type: String,
        defaule: '',
      },
    },
    setup(props) {
      const state: stateType = reactive({
        modelTypeList: [],
        modelList: [],
      });
      const dateValue: any = ref<any>();

      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      const { error, success } = createMessage;

      // 模式 01:智能模式 02新风模式 03:净化模式 04:送风模式 05:排风模式 06:除味模式 07:节能模式
      const dealPattern = computed(() => {
        return function (event, type) {
          let patternText = '';
          let icon = '';
          switch (event) {
            case '01':
              patternText = '智能模式';
              icon = 'icon-auto';
              break;
            case '02':
              patternText = '新风模式';
              icon = 'icon-newwind';
              break;
            case '03':
              patternText = '净化模式';
              icon = 'icon-newwind';
              break;
            case '04':
              patternText = '送风模式';
              icon = 'icon-biowing';
              break;
            case '05':
              patternText = '排风模式';
              icon = 'icon-deodorize';
              break;
            case '06':
              patternText = '除味模式';
              icon = 'icon-deodorize';
              break;
            case '07':
              patternText = '节能模式';
              icon = 'icon-energy';
              break;
            default:
              patternText = '智能';
              icon = 'icon-auto';
          }
          return type == 'icon' ? icon : patternText;
        };
      });
      const fixTimeFormat = computed(() => {
        return function (time) {
          let ccc = dayjs(time).format('YYYY/MM/DD HH:mm:ss');
          return ccc;
        };
      });
      const countMinute = computed(() => {
        return function (beginTime, endTime) {
          let start = dayjs(beginTime);
          let end = dayjs(endTime);
          let minute = (dayjs.duration(end.diff(start)).as('seconds') / 60).toFixed(0); // 计算分钟
          let second = parseInt(dayjs.duration(end.diff(start)).as('seconds') % 60); // 计算秒
          return minute + '分' + second + '秒';
        };
      });
      async function getWindStatis(dateM?, patternM?) {
        let param = {
          date: dateM || dayjs().format('YYYY-MM'),
          deviceId: props.deviceId,
          pageIndex: 1,
          pageSize: 10000,
          pattern: patternM || '',
        };
        try {
          const res = await getWindInfo(param);
          if (res) {
            state.modelList = res.list;
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      async function getModelTypeList(dateM?) {
        let param = {
          date: dateM || dayjs().format('YYYY-MM'),
          deviceId: props.deviceId,
          pattern: '',
        };
        try {
          const res = await getModelType(param);
          if (res) {
            state.modelTypeList = res;
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
          });
        }
      }
      function dateOk() {
        getModelTypeList(dayjs(dateValue.value).format('YYYY-MM'));
        getWindStatis(dayjs(dateValue.value).format('YYYY-MM'));
      }
      function clickModel(event) {
        getWindStatis(dayjs(dateValue.value).format('YYYY-MM'), event);
      }

      onMounted(() => {
        getWindStatis();
        getModelTypeList();
      });
      return {
        ...toRefs(state),
        dealPattern,
        fixTimeFormat,
        countMinute,
        dateValue,
        dateOk,
        clickModel,
        getModelTypeList,
        getWindStatis,
      };
    },
  });
</script>

<style lang="less" scoped>
  .wind-container {
    height: 530px;
    // width: 775px;
    width: 49%;
    .wind-con-title {
      width: 72px;
      box-sizing: content-box;
      padding-bottom: 10px;
      height: 24px;
      font-size: 18px;
      font-weight: 600;
      line-height: 21px;
      color: #333333;
      border-bottom: 2px solid rgba(0, 185, 215, 1);
    }
    .wind-con-overview {
      padding: 16px 24px;
      background: rgba(245, 252, 254, 0.39);
      box-shadow: 0px 3px 6px #dbdbdb;
      min-height: 537px;
      border-radius: 8px;
      .over-title {
        width: 100%;
        height: 21px;
        box-sizing: content-box;
        padding-bottom: 16px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 21px;
        color: #333333;
        border-bottom: 2px solid rgba(233, 233, 233, 1);
        opacity: 1;
      }
      .over-date {
        text-align: end;
        margin: 10px 0px;
      }
      .over-content {
        height: 260px;
        margin: 24px 0px;
        overflow: auto;
        .step-side {
          width: 20px;
        }
        .data-con {
          min-width: 666px;
          .data-cov {
            min-height: 50px;
            border-bottom: 1px solid #e9e9e9;
            margin-bottom: 14px;
            min-width: 600px;
            margin-left: 20px;
          }
        }
      }
      .model-li {
        margin: 25px 0px;
        .model-item {
          width: 134px;
          height: 67px;
          padding: 0px 8px 8px 8px;
          background: rgba(255, 255, 255, 0.39);
          box-shadow: 0px 3px 6px rgba(219, 219, 219, 0.5);
          font-weight: 600;
          .hearder {
            color: #333333;
            text-align: center;
            line-height: 33px;
            border-bottom: 1px solid #e9e9e9;
          }
          .footer {
            padding-top: 8px;
          }
        }
        .model-item:hover {
          border: 1px solid #09b9d7;
        }
      }
    }
  }
  .date-item {
    .item-use {
      height: 19px;
      line-height: 19px;
      font-size: 14px;
      font-weight: 400;
      .use-title {
        color: rgba(62, 65, 89, 1);
      }
      .use-time {
        color: rgba(255, 193, 94, 1);
      }
    }
    .use-date {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      color: #999999;
    }
  }
  .model-icon {
    font-size: 30px;
    color: #09b9d7;
  }

  /deep/ .ant-steps-item-title {
    display: none;
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
