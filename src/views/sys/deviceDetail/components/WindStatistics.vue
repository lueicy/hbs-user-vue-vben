<template>
  <div class="flex flex-col wind-container">
    <div class="flex flex-col wind-con-overview">
      <div class="over-title">风量统计</div>
      <div class="over-date">
        <DatePicker v-model:value="dateValue" @change="dateOk" format="YYYY-MM" picker="month" />
      </div>
      <div class="flex justify-between flex-nowrap model-li">
        <template v-for="item in modelList" :key="item.pattern">
          <div class="model-item">
            <div class="flex justify-between hearder">
              <div class="hearder-text">{{ dealPattern(item.pattern, 'text') }}</div>
              <div class="model-icon">
                <icon-font :type="dealPattern(item.pattern, 'icon')" class="icon-g" />
              </div>
            </div>
            <div class="flex justify-between footer">
              <span>风量：</span>
              <span>{{ item.volume }}m³</span>
            </div>
          </div>
        </template>
        <!-- <div class="model-item">
          <div class="flex justify-between hearder">
            <div class="hearder-text">新风模式</div>
            <div class="model-icon"><icon-font type="icon-newwind" class="icon-g" /></div>
          </div>
          <div class="flex justify-between footer">
            <span>风量：</span>
            <span>87631m³</span>
          </div>
        </div>
        <div class="model-item">
          <div class="flex justify-between hearder">
            <div class="hearder-text">送风模式</div>
            <div class="model-icon"><icon-font type="icon-blowing" class="icon-g" /></div>
          </div>
          <div class="flex justify-between footer">
            <span>风量：</span>
            <span>87631m³</span>
          </div>
        </div>
        <div class="model-item">
          <div class="flex justify-between hearder">
            <div class="hearder-text">节能模式</div>
            <div class="model-icon"><icon-font type="icon-energy" class="icon-g" /></div>
          </div>
          <div class="flex justify-between footer">
            <span>风量：</span>
            <span>87631m³</span>
          </div>
        </div>
        <div class="model-item">
          <div class="flex justify-between hearder">
            <div class="hearder-text">除味模式</div>
            <div class="model-icon"><icon-font type="icon-deodorize" class="icon-g" /></div>
          </div>
          <div class="flex justify-between footer">
            <span>风量：</span>
            <span>87631m³</span>
          </div>
        </div>
        <div class="model-item">
          <div class="flex justify-between hearder">
            <div class="hearder-text">除味模式</div>
            <div class="model-icon"><icon-font type="icon-deodorize" class="icon-g" /></div>
          </div>
          <div class="flex justify-between footer">
            <span>风量：</span>
            <span>87631m³</span>
          </div>
        </div>
        <div class="model-item">
          <div class="flex justify-between hearder">
            <div class="hearder-text">除味模式</div>
            <div class="model-icon"><icon-font type="icon-deodorize" class="icon-g" /></div>
          </div>
          <div class="flex justify-between footer">
            <span>风量：</span>
            <span>87631m³</span>
          </div>
        </div> -->
      </div>
      <div class="over-title">数据概况</div>
      <div class="flex over-content">
        <div class="step-side">
          <a-steps progress-dot :current="modelList.length" direction="vertical">
            <template v-for="item in modelList" :key="item.pattern">
              <a-step title="" :description="''" style="display: inline-block" />
            </template>
          </a-steps>
        </div>

        <div class="data-con">
          <template v-for="item in modelList" :key="item.pattern">
            <div class="flex justify-between data-cov">
              <div class="flex flex-col justify-around date-item">
                <div class="item-use">
                  <span class="use-title">使用时长：</span>
                  <span class="use-time">396分钟57秒</span>
                </div>
                <div class="use-date">2022-02-23</div>
              </div>
              <div class="wind-item">风量： {{ item.volume }} m³ </div>
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
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { iconfontJS } from '/@/utils/iconfont';
  import { getWindInfo } from '/@/api/sys/groupAndDevice';

  const IconFont = createFromIconfontCN({
    scriptUrl: iconfontJS(),
  });
  interface stateType {
    modelList?: any;
    value?: Number;
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
    setup() {
      const state: stateType = reactive({
        modelList: [],
      });
      const dateValue: any = ref<any>();

      // 模式 01:智能模式 02新风模式 03:净化模式 04:送风模式 05:排风模式 06:除味模式 07:节能模式
      const dealPattern = computed(() => {
        return function (event, type) {
          let patternText = '';
          let icon = '';
          switch (event) {
            case '01':
              patternText = '智能模式';
              icon = 'icon-energy';
              break;
            case '02':
              patternText = '新风模式';
              icon = 'icon-newwind';
              break;
            case '03':
              patternText = '净化模式';
              icon = 'icon-blowing';
              break;
            case '04':
              patternText = '送风模式';
              icon = 'icon-energy';
              break;
            case '05':
              patternText = '排风模式';
              icon = 'icon-deodorize';
              break;
            case '06':
              patternText = '除味模式';
              icon = 'icon-energy';
              break;
            case '07':
              patternText = '节能模式';
              icon = 'icon-energy';
              break;
            default:
              patternText = '智能';
              icon = 'icon-energy';
          }
          return type == 'icon' ? icon : patternText;
        };
      });

      function dateOk() {
        console.log('dateValue', dayjs(dateValue.value).format('YYYY-MM'));
        // getHistory(
        //   props.deviceId,
        //   dayjs(dateValue.value).format('YYYY-MM'),
        //   dayjs(dateValue.value[1]).format('YYYY-MM-DD HH:mm:ss')
        // );
      }
      async function getWindStatis() {
        // const res = await getWindInfo()
        state.modelList = [
          {
            pattern: '01',
            volume: 84563,
          },
          {
            pattern: '02',
            volume: 84563,
          },
          {
            pattern: '03',
            volume: 84563,
          },
          {
            pattern: '04',
            volume: 84563,
          },
          {
            pattern: '05',
            volume: 84563,
          },
        ];
      }
      onMounted(() => {
        getWindStatis();
      });
      return {
        ...toRefs(state),
        dealPattern,
        dateValue,
        dateOk,
      };
    },
  });
</script>

<style lang="less" scoped>
  .wind-container {
    height: 530px;
    width: 775px;
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
          width: 50px;
        }
        .data-con {
          min-width: 666px;
          .data-cov {
            min-height: 50px;
            border-bottom: 1px solid #e9e9e9;
            margin-bottom: 15px;
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
          .model-icon {
            font-size: 30px;
            color: #09b9d7;
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

  /deep/ .ant-steps-item-title {
    display: none;
  }
  .icon-add {
    font-size: 22px !important;
    padding-left: 8px;
    color: rgba(9, 185, 220, 1);
  }
</style>
