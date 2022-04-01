<template>
  <div v-show="getShow" class="h-6/12"><HeardLogo :logoHeight="'350px'" /> </div>
  <div class="from-mar">
    <LoginFormTitle v-show="getShow" class="enter-x" />
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
      v-show="getShow"
      @keypress.enter="handleLogin"
    >
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <ARow class="enter-x">
        <ACol :span="12">
          <FormItem>
            <!-- No logic, you need to deal with it yourself -->
            <Checkbox v-model:checked="rememberMe" size="small">
              {{ t('sys.login.rememberMe') }}
            </Checkbox>
          </FormItem>
        </ACol>
        <ACol :span="12">
          <FormItem :style="{ 'text-align': 'right' }">
            <!-- No logic, you need to deal with it yourself -->
            <Button
              type="link"
              :style="{ color: '#03b9dc' }"
              size="small"
              @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
            >
              {{ t('sys.login.forgetPassword') }}
            </Button>
          </FormItem>
        </ACol>
      </ARow>

      <FormItem class="enter-x">
        <ARow class="flex justify-between enter-x">
          <ACol :span="8">
            <Button
              type="primary"
              size="large"
              block
              @click="setLoginState(LoginStateEnum.REGISTER)"
              :style="{ background: '#00b9dc', border: 0, width: '135px', height: '35px' }"
            >
              {{ t('sys.login.registerButton') }}
            </Button>
          </ACol>
          <ACol :span="8">
            <Button
              type="primary"
              size="large"
              block
              @click="handleLogin"
              :loading="loading"
              :style="{ background: '#00b9dc', border: 0, width: '135px', height: '35px' }"
            >
              {{ t('sys.login.loginButton') }}
            </Button>
          </ACol>
        </ARow>
      </FormItem>
      <!-- <ARow class="enter-x">
      <ACol :xs="24" :md="8">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 md:!my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow> -->

      <!-- <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div
      class="flex justify-evenly enter-x"
      :class="`${prefixCls}-sign-in-way`"
    >
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import HeardLogo from './HeardLogo.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  //import { onKeyStroke } from '@vueuse/core';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Checkbox,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      Divider,
      LoginFormTitle,
      HeardLogo,
      InputPassword: Input.Password,
      GithubFilled,
      WechatFilled,
      AlipayCircleFilled,
      GoogleCircleFilled,
      TwitterCircleFilled,
    },
    setup() {
      const { t } = useI18n();
      const { notification, createErrorModal } = useMessage();
      const { prefixCls } = useDesign('login');
      const userStore = useUserStore();

      const { setLoginState, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);
      const rememberMe = ref(false);

      const formData = reactive({
        // account: 'abc123',
        account: '',
        // password: 'ch7xanrl',
        password: '',
      });

      const { validForm } = useFormValid(formRef);

      //onKeyStroke('Enter', handleLogin);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        try {
          loading.value = true;
          const userInfo = await userStore.login(
            toRaw({
              // password: data.password,
              passwd: data.password,
              staffNo: data.account,
              mode: 'none', //不要默认的错误提示
            })
          );
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              // description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
              description: `${t('sys.login.loginSuccessDesc')}:呼小博`,
              duration: 3,
            });
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          loading.value = false;
        }
      }

      return {
        t,
        prefixCls,
        formRef,
        formData,
        getFormRules,
        rememberMe,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
      };
    },
  });
</script>
<style lang="less" scoped>
  .from-mar {
    margin-left: 130px;
    width: 400px;
  }
</style>
