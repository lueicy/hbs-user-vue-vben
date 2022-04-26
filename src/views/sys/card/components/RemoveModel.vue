<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="移动设备"
    :maskClosable="false"
    :helpMessage="['提示1', '提示2']"
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
  import { defineComponent, onMounted, ref, watch, reactive, toRefs, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col, List, Radio } from 'ant-design-vue';
  import { GetlistUserGroupApi, removeDevice } from '/@/api/sys/groupAndDevice';
  import { useMessage } from '/@/hooks/web/useMessage';
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
      userData: { type: Object },
    },
    setup(props) {
      const state: stateType = reactive({
        indeterminate: true,
        groupList: [],
        selectList: [],
      });
      const loading = ref(true);
      const lines = ref(10);
      const [register, { closeModal, setModalProps }] = useModalInner();
      const { createMessage, createErrorModal } = useMessage();
      const { success } = createMessage;

      // watch(
      //   () => lines.value,
      //   () => {
      //     redoModalHeight();
      //   }
      // );

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
        try {
          const params = {
            deviceIdList: toRaw(props.userData),
            groupId: state.selectList,
          };
          const res = await removeDevice(params);
          if (res.code == 200) {
            createMessage.success('添加成功');
            closeModal();
          }
          console.log('提交', params, toRaw(props.userData));
        } catch (error: any) {
          createErrorModal({
            title: '错误提示',
            content: error.message,
          });
        }
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
