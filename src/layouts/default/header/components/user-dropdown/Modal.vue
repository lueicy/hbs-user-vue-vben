<template>
  <BasicModal v-bind="$attrs" @register="register" :title="'修改密码'" @ok="confirm">
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="mobile" class="enter-x">
        <Input
          disabled
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <!-- 点击验证码 -->
        <CountdownInput
          size="large"
          :phone="formData.mobile"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <!-- <FormItem class="enter-x">
        <Button
          type="primary"
          size="large"
          block
          @click="handleReset"
          :loading="loading"
        >
          {{ t('common.resetText') }}
        </Button>
      </FormItem> -->
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Input } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';

  import { useI18n } from '/@/hooks/web/useI18n';
  // import { useLoginState, useFormRules } from './useLogin';
  import { useFormRules } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ResetPwd } from '/@/api/sys/menu';

  export default defineComponent({
    components: { BasicModal, CountdownInput, Form, FormItem: Form.Item, Input },
    setup() {
      const userStore = useUserStore();
      const { createMessage } = useMessage();
      const { error } = createMessage;

      const formData = reactive({
        account: '',
        mobile: userStore.getUserInfo.tel,
        sms: '',
      });
      const [register, { changeOkLoading, closeModal }] = useModalInner((data) => {
        // 方式2
        // modelRef.value = { field2: data.data, field1: data.info };
        userStore.setSmsCode(formData.mobile);
      });

      async function confirm() {
        if (formData.sms.length < 6 || formData.sms.length > 6)
          return error('验证码长度不能大于6位数或少于6位数');
        const data = await ResetPwd({
          tel: formData.mobile,
          sms: formData.sms,
        });
        console.log('data----', data);

        setTimeout(() => {
          changeOkLoading(false);
          closeModal();
          formData.sms = '';
        }, 2000);
      }
      const { t } = useI18n();
      // const { handleBackLogin } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);

      // const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

      async function handleReset() {
        const form = unref(formRef);
        if (!form) return;
        await form.resetFields();
      }

      return {
        confirm,
        register,
        t,
        formRef,
        formData,
        getFormRules,
        handleReset,
        loading,
        // handleBackLogin,
      };
    },
  });
</script>
