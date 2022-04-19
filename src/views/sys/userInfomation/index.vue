<template>
  <PageWrapper>
    <div class="flex content-center justify-between page_title">
      <span>用户信息</span>
      <span>
        <Button
          v-show="!editStatus"
          size="large"
          block
          class="enter-x"
          @click="visible = !visible"
          style="width: 130px"
        >
          编辑
        </Button>
        <Button
          v-show="editStatus"
          size="large"
          block
          class="enter-x"
          @click="cancelEdit"
          style="width: 130px"
        >
          取消编辑
        </Button>
      </span>
    </div>
    <div class="flex flex-col w-full content_box">
      <div>
        <span class="item_title">企业名称</span>
        <span>
          <Input
            class="input_show"
            v-model:value="userInfo.enterpriseName"
            :readonly="!editStatus"
          />
        </span>
      </div>
      <div>
        <span class="item_title">统一社会信用代码</span>
        <span>
          <Input class="input_show" v-model:value="userInfo.enterpriseCode" readonly />
        </span>
      </div>
      <div>
        <span class="item_title">手机号码</span>
        <span>
          <Input class="input_show" v-model:value="userInfo.tel" readonly />
        </span>
      </div>
      <div class="flex content-center">
        <div class="item_title" style="margin-top: 20px">所在地区</div>
        <div v-show="editStatus">
          <a-cascader
            :defaultValue="admLists"
            :options="cityOptions"
            change-on-select
            @change="handleChange"
            placeholder="请选择地区"
          />
        </div>
        <div v-show="!editStatus">
          <Input class="input_show" v-model:value="showAdm" readonly />
        </div>
      </div>

      <div class="flex content-center">
        <span class="item_title" style="margin-top: 20px">联系地址</span>
        <Textarea class="textarea_show" v-model:value="userInfo.address" :readonly="!editStatus" />
      </div>
      <div class="flex">
        <div class="item_title p_t">营业执照</div>
        <div class="flex flex-col justify-center">
          <div class="img-border"><img ref="business" :width="214" :height="130" /></div>
          <div class="mar-auto">
            <BasicUpload
              v-show="editStatus"
              :maxSize="5"
              :maxNumber="1"
              @change="businessChange"
              :api="uploadApi"
            />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="item_title p_t">法人身份证</div>
        <div class="flex flex-col justify-center">
          <div class="img-border"><img ref="ardFront" :width="214" :height="130" /></div>
          <div class="mar-auto">
            <BasicUpload
              v-show="editStatus"
              :maxSize="5"
              :maxNumber="1"
              @change="cardFrontChange"
              :api="uploadApi"
            />
            <span style="color: #999999">身份证正面</span>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <div class="img-border"><img ref="cardBack" :width="214" :height="130" /></div>
          <div class="mar-auto">
            <BasicUpload
              v-show="editStatus"
              :maxSize="5"
              :maxNumber="1"
              @change="cardBackChange"
              :api="uploadApi"
            />
            <span style="color: #999999">身份证反面</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center p-5" v-show="editStatus">
      <Button size="large" block class="enter-x" @click="cancelEdit" style="width: 130px">
        取消
      </Button>
      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleSave"
        :style="{ background: '#00b9dc', border: 0, width: '130px', marginLeft: '20px' }"
      >
        保存
      </Button>
    </div>
    <LoginModel v-model:visible="visible" @close="cancelEdit" @edit="openEdit" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted, nextTick, toRaw } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getInfoByUser, getImageUrl, updateEnterpriseUser } from '/@/api/sys/user';
  import { Input, Button, Cascader } from 'ant-design-vue';
  import { BasicUpload } from '/@/components/Upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadApi } from '/@/api/sys/upload';
  import cityList from '/@/assets/json/city.json';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  import LoginModel from './components/adminLoginModel.vue';
  interface stateType {
    userInfo: any;
    editStatus: boolean; //是否编辑
    showAdm: any;
  }

  export default defineComponent({
    components: {
      PageWrapper,
      LoginModel,
      Button,
      Input,
      Textarea: Input.TextArea,
      [Cascader.name]: Cascader,
      BasicUpload,
    },
    setup() {
      const state: stateType = reactive({
        userInfo: {},
        editStatus: false,
        showAdm: '',
      });
      const userStore = useUserStoreWithOut();
      const formData = reactive({
        address: '',
        admList: '',
        adm1: '',
        adm2: '',
        adm3: '',
        businessLicenseUrl: '',
        enterpriseCode: '',
        enterpriseName: '',
        legalIdCardBackUrl: '',
        legalIdCardFrontUrl: '',
        smsCode: '',
        tel: '',
      });
      const cardBack = ref();
      const business = ref();
      const ardFront = ref();
      const formRef = ref();
      const visible = ref<boolean>(false);
      const { t } = useI18n();
      const { createMessage, createErrorModal } = useMessage();
      let admLists: any = [];
      const cityOptions = cityList;
      async function dealImgUrl(event, type?) {
        if (!event) return;
        let res = await getImageUrl(event);
        if (res) {
          if (type == 'business') {
            return (business.value.src = 'data:image/png;base64,' + res);
          }
          if (type == 'cardBack') {
            return (cardBack.value.src = 'data:image/png;base64,' + res);
          }
          if (type == 'ardFront') {
            return (ardFront.value.src = 'data:image/png;base64,' + res);
          }
        }
      }

      async function getUserInfo() {
        let res = await getInfoByUser();
        if (res) {
          state.userInfo = res;
          nextTick(() => {
            admLists.push(res.adm1);
            admLists.push(res.adm2);
            admLists.push(res.adm3);
            state.showAdm = res.adm1 + '/' + res.adm2 + '/' + res.adm3;
            dealImgUrl(state.userInfo.businessLicenseUrl, 'business');
            dealImgUrl(state.userInfo.legalIdCardBackUrl, 'cardBack');
            dealImgUrl(state.userInfo.legalIdCardFrontUrl, 'ardFront');
          });
        }
      }
      async function handleSave() {
        let param = {
          address: state.userInfo.address,
          adm1: formData.adm1,
          adm2: formData.adm2,
          adm3: formData.adm3,
          businessLicenseUrl: formData.businessLicenseUrl,
          enterpriseCode: state.userInfo.enterpriseCode,
          enterpriseName: state.userInfo.enterpriseName,
          legalIdCardBackUrl: formData.legalIdCardBackUrl,
          legalIdCardFrontUrl: formData.legalIdCardFrontUrl,
          tel: state.userInfo.tel,
          userId: state.userInfo.userId,
        };
        console.log('param', param);
        try {
          let res = await updateEnterpriseUser(param);
          console.log('updateEnterpriseUserres', res);

          if (res && res.code == 200) {
            userStore.setAdminLogStatus(false);
            state.editStatus = false;
            getUserInfo();
            createMessage.success('编辑成功');
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
            // getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        }
      }

      function handleChange(value) {
        if (value.length == 0) {
          formData.adm1 = '';
          formData.adm2 = '';
          formData.adm3 = '';
          formData.admList = '';
          console.log('admList', formData.admList);
        } else {
          if (value && value.length === 2) {
            [formData.adm1, formData.adm2] = value;
            formData.adm3 = value[1];
          }
          if (value && value.length === 3) {
            formData.adm3 = value[2];
          }
          formData.admList = value.join('/');
        }
      }
      function businessChange(list: string[]) {
        let temp = toRaw(list)[0];
        if (!temp) return;
        formData.businessLicenseUrl = toRaw(list)[0];
        dealImgUrl(formData.businessLicenseUrl, 'business');
        createMessage.info('上传成功!');
      }
      function cardBackChange(list: string[]) {
        let temp = toRaw(list)[0];
        if (!temp) return;
        formData.legalIdCardBackUrl = toRaw(list)[0];
        dealImgUrl(formData.legalIdCardBackUrl, 'cardBack');
        createMessage.info('上传成功!');
      }
      function cardFrontChange(list: string[]) {
        let temp = toRaw(list)[0];
        if (!temp) return;
        formData.legalIdCardFrontUrl = toRaw(list)[0];
        dealImgUrl(formData.legalIdCardFrontUrl, 'ardFront');
        createMessage.info('上传成功!');
      }
      function openEdit() {
        state.editStatus = true;
        visible.value = false;
      }
      function cancelEdit() {
        userStore.setAdminLogStatus(false);
        state.editStatus = false;
        visible.value = false;
      }
      onMounted(() => {
        getUserInfo();
      });
      return {
        ...toRefs(state),
        getUserInfo,
        dealImgUrl,
        cardBack,
        business,
        ardFront,
        handleSave,
        formData,
        formRef,
        handleChange,
        businessChange,
        cardBackChange,
        cardFrontChange,
        cityOptions,
        admLists,
        uploadApi,
        cancelEdit,
        visible,
        openEdit,
      };
    },
  });
</script>
<style lang="less" scoped>
  .page_title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    opacity: 1;
    margin: 12px 0px;
  }
  .content_box {
    background: rgba(255, 255, 255, 0.39);
    opacity: 1;
    border-radius: 10px;
    padding: 0px 32px 32px 32px;
  }
  .item_title {
    min-width: 130px;
    display: inline-block;
    text-align: end;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 18px;
    color: #3e4159;
    opacity: 1;
  }
  .input_show {
    width: 382px;
    height: 35px;
    padding: 0px 10px;
    border: 1px solid #d9d9d9;
    margin: 20px;
  }
  .textarea_show {
    width: 382px;
    height: 70px;
    line-height: 35px;
    padding: 0px 10px;
    border: 1px solid #d9d9d9;
    margin: 20px;
  }
  .p_t {
    padding-top: 40px;
  }
  .img-border {
    margin: 20px;
    height: 130px;
    overflow: auto;
  }
  .mar-auto {
    margin: auto;
  }
  /deep/ .ant-cascader-picker {
    margin: 20px !important;
  }
  /deep/ .ant-cascader-input {
    min-width: 382px !important;
    min-height: 35px !important;
  }
</style>
