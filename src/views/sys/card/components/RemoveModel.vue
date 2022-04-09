<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="移动设备"
    :helpMessage="['提示1', '提示2']"
    @visible-change="handleShow"
    @ok="handleOk"
  >
    <template v-if="loading">
      <div class="empty-tips">加载中，稍等……</div>
    </template>
    <template v-if="!loading">
      <a-list>
        <RadioGroup v-model:value="selectList" @change="onCheckAllChangeList">
          <a-row>
            <template v-for="item in groupList" :key="item.groupId">
              <a-col class="group-item">
                <a-list-item class="w-full">{{ item.groupName }}</a-list-item>
                <Radio :value="item.groupId" />
              </a-col>
            </template>
          </a-row>
        </RadioGroup>
      </a-list>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, watch, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col, List, Radio } from 'ant-design-vue';
  import { GetlistUserGroupApi } from '/@/api/sys/groupAndDevice';
  interface stateType {
    indeterminate: boolean;
    groupList: any[];
    selectList: any[];
  }

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
    props: {
      removeList: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const state: stateType = reactive({
        indeterminate: true,
        groupList: [],
        selectList: [],
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

      // 群组列表（tabs）
      async function getListData(index, size) {
        let resData = await GetlistUserGroupApi({ pageIndex: index, pageSize: size });
        if (resData) loading.value = false;
        state.groupList = resData.list;
      }
      const onCheckAllChangeList = (e: any) => {
        console.log('e===', e);
        Object.assign(state, {
          valueList: e,
          indeterminate: false,
        });
        console.log('state===', state.selectList);
      };
      async function handleOk() {
        // const res = await AddlistUserGroupApi(values);
        // if (res.code == 200) {
        //   createMessage.success('添加成功');
        //   handleClose();
        // } else {
        //   createErrorModal({
        //     title: '提交失败',
        //     content: res.msg + res.data[0],
        //     // getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
        //   });
        // }
        console.log('提交', props.removeList, state.selectList);
      }

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

      onMounted(() => {
        getListData(1, 10000);
      });
      return {
        register,
        loading,
        handleShow,
        lines,
        setLines,
        ...toRefs(state),
        onCheckAllChangeList,
        getListData,
        handleOk,
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
