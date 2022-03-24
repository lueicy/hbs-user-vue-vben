<template>
  <!-- content="这是用户资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据" -->
  <!-- :title="`设备` + userId + `详情`" -->
  <PageWrapper
    :title="`彦祖的设备详情`"
    contentBackground
    @back="goBack"
  >
    <div :class="`${prefixCls}__content`">
      <a-list>
        <a-row :gutter="16">
          <template
            v-for="item in list"
            :key="item.title"
          >
            <a-col :span="8">
              <a-list-item>
                <a-card
                  v-ripple
                  :hoverable="true"
                  :class="`${prefixCls}__card`"
                >
                  <div class="ul">
                    <div class="rightIcon"></div>
                    <div class="leftNav">
                      <div class="timeTitle">2021/09/09 9:00PM</div>
                      <div class="name">设备激活时间</div>
                    </div>
                  </div>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
      <!-- :class="`${prefixCls}__card  ${prefixCls}__cardInfoList`" -->
      <a-list>
        <a-row :gutter="16">
          <template
            v-for="item in infoList"
            :key="item.title"
          >
            <a-col :span="8">
              <a-list-item>
                <a-card
                  :hoverable="true"
                  :class="` ${prefixCls}__cardInfoList`"
                >
                  <div :class="`${prefixCls}__cardInfoList__card-title`">
                    <span class="title">
                      用户信息
                    </span>
                  </div>
                  <ul :class="`${prefixCls}__cardInfoList__card-detail`">
                    <li class="list">
                      <span class="list-cirle"></span>
                      <span class="list-name">被绑定用户：</span>
                      <span class="list-name">呼博士1200F</span>
                    </li>
                    <li class="list">
                      <span class="list-cirle"></span>
                      <span class="list-name">被绑定用户：</span>
                      <span class="list-name">呼博士1200F</span>
                    </li>
                  </ul>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
      <!-- size="small" -->
      <Description
        size="middle"
        title="设备基本状态"
        :bordered="false"
        :column="5"
        :data="refundData"
        :schema="refundSchema"
      />

      <a-card
        title="历史记录"
        :bordered="false"
        class="mt-5"
      >
        <a-timeline>
          <a-timeline-item>
            <span class="timeClass">
              2021/12/09
            </span>
            <br>
            <span class="Classcontainer">
              打技作果算连实矿张整来实特列温精京干义由极周达住也价容容般器声支公才十写不与展制道干写色很铁究如取说属把书东不。又酸按必论斗传离或油了着身条大海计往总基存知特亲斗及收按手业去作府物己题光有的九之对果不化便老即满铁组速达处头。
            </span>
          </a-timeline-item>
          <a-timeline-item>
            <span class="timeClass">
              2021/12/09
            </span>
            <br>
            <span class="Classcontainer">
              打技作果算连实矿张整来实特列温精京干义由极周达住也价容容般器声支公才十写不与展制道干写色很铁究如取说属把书东不。又酸按必论斗传离或油了着身条大海计往总基存知特亲斗及收按手业去作府物己题光有的九之对果不化便老即满铁组速达处头。
            </span>
          </a-timeline-item>
          <a-timeline-item>
            <span class="timeClass">
              2021/12/09
            </span>
            <br>
            <span class="Classcontainer">
              打技作果算连实矿张整来实特列温精京干义由极周达住也价容容般器声支公才十写不与展制道干写色很铁究如取说属把书东不。又酸按必论斗传离或油了着身条大海计往总基存知特亲斗及收按手业去作府物己题光有的九之对果不化便老即满铁组速达处头。
            </span>
          </a-timeline-item>
          <a-timeline-item>
            <span class="timeClass">
              2021/12/09
            </span>
            <br>
            <span class="Classcontainer">
              打技作果算连实矿张整来实特列温精京干义由极周达住也价容容般器声支公才十写不与展制道干写色很铁究如取说属把书东不。又酸按必论斗传离或油了着身条大海计往总基存知特亲斗及收按手业去作府物己题光有的九之对果不化便老即满铁组速达处头。
            </span>
          </a-timeline-item>
        </a-timeline>
      </a-card>
    </div>

  </PageWrapper>
</template>

<script lang='ts'>
import RippleDirective from '/@/directives/ripple';

import { Description } from '/@/components/Description/index';

import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PageWrapper } from '/@/components/Page';
import { useGo } from '/@/hooks/web/usePage';
import { useTabs } from '/@/hooks/web/useTabs';
import { Card, Row, Col, List, Timeline } from 'ant-design-vue';
import { cardList, cardListSecond, refundData, refundSchema } from './data';
// import Icon from '/@/components/Icon/index';

export default defineComponent({
  name: 'IndexHomePages',
  directives: {
    Ripple: RippleDirective,
  },
  components: {
    // Icon,
    PageWrapper,
    [Card.name]: Card,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [Timeline.name]: Timeline,
    [Timeline.Item.name]: Timeline.Item,

    [Row.name]: Row,
    [Col.name]: Col,
    Description,
  },
  setup() {
    const route = useRoute();
    const go = useGo();
    // 此处可以得到用户ID
    const userId = ref(route.params?.id);
    const currentKey = ref('detail');
    const { setTitle } = useTabs();
    // TODO
    // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

    // 设置Tab的标题（不会影响页面标题）
    setTitle('详情：用户' + userId.value);

    // 页面左侧点击返回链接时的操作
    function goBack() {
      // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
      go('/device/Newfan/Newfan-1');
      // go(-1);
    }
    return {
      userId,
      currentKey,
      goBack,
      prefixCls: 'list-card',
      list: cardList,
      infoList: cardListSecond,
      refundData,
      refundSchema,
    };
  },
});
</script>

<style lang="less" scoped>
.list-card {
  &__content {
    background: #f5f6f8;
  }
  &__link {
    margin-top: 10px;
    font-size: 14px;
    a {
      margin-right: 30px;
    }

    span {
      margin-left: 5px;
    }
  }

  &__card {
    width: 100%;
    margin-bottom: -8px;
    // background: pink;
    height: 157px;
    // background: #FFFFFF;
    border-radius: 16px;
    display: flex !important;
    /deep/.ant-card-body {
      padding: 31px 44px !important;
    }
    .ul {
      display: flex;
      .rightIcon {
        width: 94px;
        height: 94px;
        background: #4880ff;
        margin-right: 19px;
        border-radius: 16px;
      }
      .leftNav {
        .timeTitle {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #4880ff;
          line-height: 42px;
        }
        .name {
          font-size: 20px;
          line-height: 28px;
        }
      }
    }

    &-title {
      // margin-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
      color: @text-color;
      // background: pink;
      .icon {
        // margin-top: -5px;
        // margin-right: 10px;
        font-size: 38px !important;
      }
    }

    &-detail {
      padding-top: 10px;
      padding-left: 30px;
      font-size: 14px;
      color: @text-color-secondary;
    }
  }

  &__cardInfoList {
    border-radius: 16px;
    width: 100%;
    // margin-bottom: -8px;
    height: 303px;
    /deep/.ant-card-body {
      padding: 0 !important;
    }

    &__card-title {
      // background-color: pink !important;
      font-size: 20px;
      font-weight: 500;
      color: @text-color;
      height: 57px;
      line-height: 57px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3f4157;
      border-bottom: 1px solid #e9e9e9;
      margin-bottom: 16px;
      .title {
        margin-left: 33px;
      }
    }

    &__card-detail {
      .list {
        margin-bottom: 15px;
        &-cirle {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #4880ff;
          border-radius: 50%;
          margin-right: 5px;
        }
        &-name {
          // width: 157px;
          // height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #3f4157;
          line-height: 20px;
        }
      }
      padding-left: 33px;
    }
  }
}
/deep/.vben-collapse-container {
  // background-color: pink;
  border-radius: 16px;
  margin-bottom: 20px;
  padding: 0 10px;
  &__header {
    .vben-basic-title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3f4157;
    }
  }
}
.timeClass {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #faa824;
}
.Classcontainer {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3f4157;
}
/deep/.ant-card {
  border-radius: 16px;
  &-head-title {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #313131;
  }
}
/deep/.ant-descriptions-view {
  margin: 0 8px !important;
}
</style>
