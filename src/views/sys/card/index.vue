<template>
  <PageWrapper :class="prefixCls" title="">
    <template #headerContent>
      <WorkbenchHeader />
    </template>
    <DeviceManage class="!my-4 enter-y" />

    <Drawer @register="register5" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { cardList } from './data';
  import { PageWrapper } from '/@/components/Page';
  // import { Card, Row, Col, List, Checkbox, CheckboxGroup } from 'ant-design-vue';
  import { Card, Row, Col, List, Checkbox } from 'ant-design-vue';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import DeviceManage from './components/DeviceManage.vue';
  import RippleDirective from '/@/directives/ripple';
  // import deviceImg from '../../../assets';
  import { airQuity } from '/@/utils/other/data';
  import { useDrawer } from '/@/components/Drawer';
  import Drawer from './components/Drawer.vue';
  import deviceImg_650 from '/@/assets/images/device/device/650.png';
  import deviceImg_400 from '/@/assets/images/device/device/400.png';
  import deviceImg_250 from '/@/assets/images/device/device/250.png';
  import deviceImg_200 from '/@/assets/images/device/device/200.png';
  import deviceImg_150 from '/@/assets/images/device/device/150.png';
  const modeTyleList: any[] = [
    { name: 'EH-Z-7G650', url: deviceImg_650 },
    { name: 'EH-Z-7G400A', url: deviceImg_400 },
    { name: 'EH-Z-7B200F', url: deviceImg_200 },
    { name: 'XS-D250A', url: deviceImg_250 },
    { name: 'XS-D150A', url: deviceImg_150 },
    { name: 'EH-Z-7G650', url: deviceImg_650 },
    { name: 'EH-Z-7G400A', url: deviceImg_400 },
    { name: 'EH-Z-7B200F', url: deviceImg_200 },
    { name: 'XS-D250A', url: deviceImg_250 },
    { name: 'XS-D150A', url: deviceImg_150 },
    { name: 'EH-Z-7G650', url: deviceImg_650 },
    { name: 'EH-Z-7G400A', url: deviceImg_400 },
    { name: 'EH-Z-7B200F', url: deviceImg_200 },
    { name: 'XS-D250A', url: deviceImg_250 },
    { name: 'XS-D150A', url: deviceImg_150 },
    { name: 'EH-Z-7G650', url: deviceImg_650 },
    { name: 'EH-Z-7G400A', url: deviceImg_400 },
    { name: 'EH-Z-7B200F', url: deviceImg_200 },
    { name: 'XS-D250A', url: deviceImg_250 },
    { name: 'XS-D150A', url: deviceImg_150 },
    { name: 'EH-Z-7G650', url: deviceImg_650 },
    { name: 'EH-Z-7G400A', url: deviceImg_400 },
    { name: 'EH-Z-7B200F', url: deviceImg_200 },
    { name: 'XS-D250A', url: deviceImg_250 },
    { name: 'XS-D150A', url: deviceImg_150 },
  ];

  import { SlideXReverseTransition } from '/@/components/Transition'; //动画

  interface selectTitleType {
    name?: string;
    num?: Number;
    valueList?: any[];
  }

  const selectTitle: selectTitleType[] = [
    {
      name: '更多',
      num: 0,
    },
    {
      name: '全关',
      num: 1,
    },
    {
      name: '全开',
      num: 2,
    },
    {
      name: '取消',
      num: 3,
    },
    {
      name: '全选',
      num: 4,
    },
  ];

  export default defineComponent({
    components: {
      SlideXReverseTransition,
      Drawer,
      WorkbenchHeader,
      DeviceManage,
      // Icon,
      PageWrapper,
      // Checkbox,
      // CheckboxGroup,
      // "Checkbox.name": Checkbox,
      // [CheckboxGroup.name]: CheckboxGroup,
      // CheckboxGroup: Checkbox.Group,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    directives: {
      Ripple: RippleDirective,
    },

    setup() {
      const [register5, { openDrawer: openDrawer5, setDrawerProps }] = useDrawer();
      const state = reactive({
        indeterminate: true,
        actionSelect: false, //是否开启选择
        checkedList: [],
        // valueList: [],
      });
      const lisState = reactive<selectTitleType>({
        valueList: [],
      });

      function handleView(item) {
        if (state.actionSelect) return; //判断选择按钮是否开启
        openDrawer5(true, { record: item });
        setDrawerProps({ loading: true });
        setTimeout(() => {
          setDrawerProps({ loading: false });
        }, 1000);
      }
      // onMounted(() => handleView());
      const onCheckAllChangeList = (e: any) => {
        console.log('e===', e);
        Object.assign(state, {
          valueList: e,
          indeterminate: false,
        });
      };
      const getSelectList = () => cardList.map((item) => item.id);

      const getAllCheck = () => {
        console.log('执行。');
        Object.assign(lisState, {
          valueList: getSelectList(),
        });
      };
      const getAllCancel = () => {
        Object.assign(lisState, {
          valueList: [],
        });
      };
      const selectAll = (id) => {
        console.log('id---', id);
        switch (id) {
          case 4:
            getAllCheck();
            break;
          case 3:
            getAllCancel();
            break;

          default:
            break;
        }
      };
      const chegnSelect = () => (
        (state.actionSelect = !state.actionSelect), (lisState.valueList = [])
      );
      return {
        prefixCls: 'list-card',
        list: cardList,
        selectTitle,
        airQuity,
        handleView,
        ...toRefs(lisState),
        ...toRefs(state),
        register5,
        selectAll,
        getAllCheck,
        onCheckAllChangeList,
        chegnSelect,
        modeTyleList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .dib {
    display: inline-block;
  }
  @colorThem: #00b9d7;
  .btmClass {
    text-align: center;
    padding: 0 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    border-radius: 8px !important;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
  }
  .title_Contr {
    height: 28px;
    margin-right: 16px;

    &_name {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3e4159;
      line-height: 28px;
    }
    &_btm {
      .btmClass();
      line-height: 24px;
      border-radius: 6px;
      border: 2px solid @colorThem;
      color: @colorThem;
      margin-left: 12px;
    }
    .changeClass {
      background-color: @colorThem;
      color: #ffffff;
    }
  }
  .list-card {
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
      height: 308px;
      width: 250px;
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      /deep/.ant-card-body {
        padding: 11px 16px !important;
      }

      &-title {
        height: 20px;
        .status,
        .air,
        .autoTag,
        .windTag,
        .mainTag,
        .online {
          .btmClass();
        }

        .online {
          color: #00b9d7;
          padding-right: 0;
          .iconify {
            width: 18px;
            height: 18px;
            margin-bottom: 4px;
            margin-right: 2px;
          }
        }
        .autoTag,
        .windTag {
          padding: 0;
          color: #a6aab8;
          background: #f5f6f8;
          padding: 0 4px;
        }
        .mainTag {
          padding: 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #3e4159;
        }
      }

      &-detail {
        text-align: center;
        margin: 28px auto 12px;
        font-size: 14px;
        color: @text-color-secondary;
        width: 150px;
        height: 200px;
        .iconify-inline {
          margin-left: 8px;
        }
        .DeviceName {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #3e4159;
        }
        .DeviceMode {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a6aab8;
        }
      }
      // 遮罩层
      &-bgColor {
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      // 多选框---未选中
      /deep/.ant-checkbox {
        position: absolute;
        top: 11px;
        right: 18px;

        .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 4px;
          border-color: #ffffff;
        }
      }
      // 多选框---选中
      /deep/.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: @colorThem;
          border-color: @colorThem;
        }
      }
    }
  }
</style>
