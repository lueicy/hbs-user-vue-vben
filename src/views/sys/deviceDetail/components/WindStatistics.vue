<template>
  <div class="flex flex-col wind-container">
    <div class="flex flex-col wind-con-overview">
      <div class="over-title">风量统计</div>
      <div class="over-date">日期插件</div>
      <div class="flex justify-between model-li">
        <template v-for="(item, i) in modelList" :key="i">
          <div class="model-item">{{ item.name + i }}</div>
        </template>
      </div>
      <div class="over-title">数据概况</div>
      <div class="flex over-content">
        <div class="step-side">
          <a-steps progress-dot :current="modelList.length" direction="vertical">
            <template v-for="(item, i) in modelList" :key="i">
              <a-step title="" :description="''" style="display: inline-block" />
            </template>
          </a-steps>
        </div>

        <div>
          <template v-for="(item, i) in modelList" :key="i">
            <div class="model-item">{{ item.name + i }}</div>
          </template>
        </div>
      </div>
      <!-- <div class="over-content">
        <span>使用时间</span>
        <span>30分钟</span>
      </div>
      <div class="over-content">
        <span>新的风量</span>
        <span>182733m</span>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Steps } from 'ant-design-vue';
  // import { Icon } from '/@/components/Icon';
  interface modelType {
    name?: string;
    value?: Number;
    icon?: string;
  }

  export default defineComponent({
    components: {
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      // Icon,
    },
    setup() {
      let modelList: modelType[] = [
        {
          name: '智能模式',
          value: 84563,
          icon: 'ant-design:plus-outlined',
        },
        {
          name: '新风模式',
          value: 84563,
          icon: 'ant-design:plus-outlined',
        },
        {
          name: '送风模式',
          value: 84563,
          icon: 'ant-design:plus-outlined',
        },
        {
          name: '节能模式',
          value: 84563,
          icon: 'ant-design:plus-outlined',
        },
        {
          name: '除味模式',
          value: 84563,
          icon: 'ant-design:plus-outlined',
        },
      ];
      return {
        modelList,
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
      }
      .model-li {
        margin: 25px 0px;
        .model-item {
          width: 134px;
          height: 67px;
          background: rgba(255, 255, 255, 0.39);
          box-shadow: 0px 3px 6px rgba(219, 219, 219, 0.5);
          opacity: 1;
        }
        .model-item:hover {
          border: 1px solid #09b9d7;
        }
      }
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
