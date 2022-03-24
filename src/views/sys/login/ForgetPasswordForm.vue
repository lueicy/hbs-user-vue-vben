<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <!-- <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem> -->

      <FormItem
        name="tel"
        class="enter-x"
      >
        <Input
          size="large"
          v-model:value="formData.tel"
          :placeholder="t('sys.login.mobile')"
        />
      </FormItem>
      <FormItem
        name="sms"
        class="enter-x"
      >
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button
          :style="{background:'#00b9dc',border:0,borderRadius:'16px'}"
          type="primary"
          size="large"
          block
          @click="handleReset"
          :loading="loading"
        >
          {{ t('common.resetText') }}
        </Button>
        <Button
          :style="{borderRadius:'16px'}"
          size="large"
          block
          class="mt-4"
          @click="handleBackLogin"
        >
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, watch, ref, computed, unref } from 'vue';

import LoginFormTitle from './LoginFormTitle.vue';
import { Form, Input, Button } from 'ant-design-vue';
import { CountdownInput } from '/@/components/CountDownLogin';

import { useI18n } from '/@/hooks/web/useI18n';
import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';
import { useUserStore } from '/@/store/modules/user';
import { useMessage } from '/@/hooks/web/useMessage';
import { ResetPwd } from '/@/api/sys/menu';
import { SmsCode } from '/@/api/sys/model/menuModel';

export default defineComponent({
  name: 'ForgetPasswordForm',
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    CountdownInput,
    LoginFormTitle,
  },
  setup() {
    const { t } = useI18n();
    const { handleBackLogin, getLoginState } = useLoginState();
    const { getFormRules } = useFormRules();

    const formRef = ref();
    const loading = ref(false);
    const userStore = useUserStore();
    const { createMessage } = useMessage();
    const { error, success } = createMessage;

    const formData = reactive<SmsCode>({
      // account: '',
      tel: '',
      sms: '',
    });

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

    async function handleReset() {
      const form = unref(formRef);
      if (!form) return;
      if (formData.sms.length < 6 || formData.sms.length > 6)
        return error('验证码长度不能大于6位数或少于6位数');
      await ResetPwd(formData);
      await form.resetFields(); //清空表单输入框
      setTimeout(() => {
        success('重置密码成功,请注意查收手机短信');
        handleBackLogin();
      }, 500);
    }

    watch(
      () => formData.tel,
      (newValue, oldValue) => {
        // 因为watch被观察的对象只能是getter/effect函数、ref、热active对象或者这些类型是数组
        // 所以需要将state.count变成getter函数
        userStore.setSmsCodeLogin(newValue);
      }
    );

    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleReset,
      loading,
      handleBackLogin,
      getShow,
    };
  },
});
</script>
