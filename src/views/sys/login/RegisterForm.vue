<template>
  <template v-if="getShow">
    <div class="logo-medium">
      <div class="flex items-center w-full my-auto">
        <img src="../../../assets/images/logo.png" style="width: 199px" />
        <div class="font-medium">
          <span class="inline-block mt-4 text-3xl text-box"> 用户后台管理系统 </span>
        </div>
      </div>
    </div>
    <div class="xl:ml-16" style="width: 600px">
      <div class="flex justify-between form-heard">
        <div class="form-heard-l">账号申请</div>
        <div class="form-heard-r">
          <span style="color: #3e4159">已有账号，</span>
          <span style="color: #00b9d7" @click="handleBackLogin">马上登录 ></span>
        </div>
      </div>
      <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
        <FormItem :label="'类型'">
          <!-- No logic, you need to deal with it yourself -->
          <RadioGroup size="large" :default-value="1">
            <radio :value="1" :defaultChecked="true"> 企业（其他组织或单位） </radio>
            <radio :value="2" :disabled="true">
              个人
              <span style="color: #ff4d4f; font-size: 12px">*目前暂不支持个人用户申请</span>
            </radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          name="enterpriseName"
          class="enter-x"
          :style="{ 'text-align': 'left' }"
          :label="'账号名称'"
        >
          <Input size="large" v-model:value="formData.enterpriseName" placeholder="企业名称" />
        </FormItem>
        <FormItem
          name="enterpriseCode"
          class="enter-x"
          :style="{ 'text-align': 'left' }"
          :label="'统一社会信用代码'"
        >
          <Input
            size="large"
            v-model:value="formData.enterpriseCode"
            placeholder="统一社会信用代码"
          />
        </FormItem>
        <FormItem
          name="admList"
          class="enter-x"
          :style="{ 'text-align': 'left' }"
          :label="'所在地区'"
        >
          <!-- <Input size="large" v-model:value="formData.admList" placeholder="所在地区" /> -->
          <a-cascader
            :options="cityOptions"
            change-on-select
            @change="handleChange"
            placeholder="请选择地区"
          />
        </FormItem>

        <FormItem name="tel" class="enter-x" :style="{ 'text-align': 'left' }" :label="'手机号码'">
          <Input size="large" v-model:value="formData.tel" placeholder="请输入手机号码" />
        </FormItem>
        <FormItem name="smsCode" class="enter-x" :label="'验证码'">
          <CountdownInput
            size="large"
            v-model:value="formData.smsCode"
            :placeholder="t('sys.login.smsCode')"
          />
        </FormItem>
        <FormItem
          name="address"
          class="enter-x"
          :style="{ 'text-align': 'left' }"
          :label="'联系地址'"
        >
          <Input size="large" v-model:value="formData.address" placeholder="请输入联系地址" />
        </FormItem>
        <FormItem
          name="businessLicenseUrl"
          class="enter-x"
          :style="{ 'text-align': 'left' }"
          :label="'营业执照'"
        >
          <BasicUpload :maxSize="20" :maxNumber="10" @change="businessChange" :api="uploadApi" />
        </FormItem>
        <div class="flex justify-around">
          <FormItem
            name="legalIdCardFrontUrl"
            class="enter-x"
            :style="{ 'text-align': 'left' }"
            :label="'法人身份证正面'"
          >
            <BasicUpload :maxSize="20" :maxNumber="10" @change="cardFrontChange" :api="uploadApi" />
          </FormItem>
          <FormItem
            name="legalIdCardBackUrl"
            class="enter-x"
            :style="{ 'text-align': 'left' }"
            :label="'身份证反面'"
          >
            <BasicUpload :maxSize="20" :maxNumber="10" @change="cardBackChange" :api="uploadApi" />
          </FormItem>
        </div>
        <div class="flex justify-around p-5">
          <Button size="large" block class="enter-x" @click="handleBackLogin" style="width: 130px">
            {{ t('sys.login.backSignIn') }}
          </Button>
          <Button
            type="primary"
            class="enter-x"
            size="large"
            block
            @click="handleRegister"
            :loading="loading"
            :style="{ background: '#00b9dc', border: 0, width: '130px', height: '35px' }"
          >
            {{ t('sys.login.registerButton') }}
          </Button>
        </div>
      </Form>
    </div>
  </template>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, computed, toRaw, watch } from 'vue';

  import { Form, Input, Button, Cascader, Radio } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { BasicUpload } from '/@/components/Upload';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadApi } from '/@/api/sys/upload';
  import cityList from '/@/assets/json/city.json';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';

  export default defineComponent({
    name: 'RegisterPasswordForm',
    components: {
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      CountdownInput,
      [Cascader.name]: Cascader,
      RadioGroup: Radio.Group,
      Radio: Radio,
      BasicUpload,
    },
    setup() {
      const cityOptions = cityList;
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();

      const formRef = ref();
      const loading = ref(false);
      const userStore = useUserStore();
      let admLists: any = [];

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

      const { getFormRules } = useFormRules(formData);
      const { validForm } = useFormValid(formRef);

      const { createMessage, notification, createErrorModal } = useMessage();

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

      async function handleRegister() {
        const data = await validForm();
        console.log('data', data, formData);
        if (!data) return;
        try {
          loading.value = true;
          const res = await userStore.register(
            toRaw({
              address: data.address,
              admList: data.admList,
              adm1: formData.adm1,
              adm2: formData.adm2,
              adm3: formData.adm3,
              businessLicenseUrl: data.businessLicenseUrl,
              enterpriseCode: data.enterpriseCode,
              enterpriseName: data.enterpriseName,
              legalIdCardBackUrl: data.legalIdCardBackUrl,
              legalIdCardFrontUrl: data.legalIdCardFrontUrl,
              smsCode: data.smsCode,
              tel: data.tel,
              mode: 'none', //不要默认的错误提示
            })
          );

          if (res && res.code == 200) {
            console.log('提交成功', res);
            handleBackLogin();
            createMessage.success('提交成功，审核结果将通过短信发送至您的手机号，请多留意。');
            // notification.success({
            //   message: '提交成功，审核结果将通过短信发送至您的手机号，请多留意。',
            //   // description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
            //   description: `${t('sys.login.loginSuccessDesc')}:呼小博`,
            //   duration: 3,
            // });
          }
        } catch (error: any) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
            // getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          loading.value = false;
        }
      }

      function handleChange(value) {
        console.log('delateChange', !value, value.length);
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
            console.log('defaultChange', value, formData.adm1, formData.adm2, formData.adm3);
          }
          if (value && value.length === 3) {
            formData.adm3 = value[2];
          }
          formData.admList = value.join('/');
        }
        // emitData.value = keys;
        // emit('defaultChange', keys, args);
      }
      function businessChange(list: string[]) {
        let temp = toRaw(list)[0];
        if (!temp) return;
        formData.businessLicenseUrl = toRaw(list)[0];
        createMessage.info('营业执照上传成功!');
      }
      function cardBackChange(list: string[]) {
        let temp = toRaw(list)[0];
        if (!temp) return;
        formData.legalIdCardBackUrl = toRaw(list)[0];
        createMessage.info('营业执照上传成功!');
      }
      function cardFrontChange(list: string[]) {
        let temp = toRaw(list)[0];
        if (!temp) return;
        formData.legalIdCardFrontUrl = toRaw(list)[0];
        createMessage.info('营业执照上传成功!');
      }
      watch(
        () => formData.tel,
        (newValue, oldValue) => {
          console.log('tel', newValue);
          // 因为watch被观察的对象只能是getter/effect函数、ref、热active对象或者这些类型是数组
          // 所以需要将state.count变成getter函数
          userStore.setRegisterCode(newValue);
        }
      );

      return {
        t,
        formRef,
        formData,
        getFormRules,
        handleRegister,
        loading,
        handleBackLogin,
        handleChange,
        getShow,
        cityOptions,
        admLists,
        businessChange,
        cardBackChange,
        cardFrontChange,
        uploadApi,
      };
    },
  });
</script>
<style lang="less" scoped>
  .logo-medium {
    margin: 30px 110px;
  }
  .font-medium {
    margin-left: 110px;
    color: #00b9dc;
    font-weight: 600;
  }

  .form-heard {
    padding-left: 50px;
    margin-bottom: 32px;
    .form-heard-l {
      width: 88px;
      height: 29px;
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 19px;
      color: #3e4159;
      opacity: 1;
    }
    .form-heard-r {
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 19px;
    }
  }

  /deep/ .ant-form-item-label {
    width: 150px;
  }
  /deep/ .ant-form-item-control {
    width: 300px;
  }
</style>
