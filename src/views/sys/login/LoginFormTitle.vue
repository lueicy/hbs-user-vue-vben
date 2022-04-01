<template>
  <h2
    class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left"
    style="color: #09b9dc"
  >
    {{ getFormTitle }}
  </h2>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { LoginStateEnum, useLoginState } from './useLogin';

  export default defineComponent({
    name: 'LoginFormTitle',
    setup() {
      const { t } = useI18n();

      const { getLoginState } = useLoginState();

      const getFormTitle = computed(() => {
        const titleObj = {
          [LoginStateEnum.RESET_PASSWORD]: '重置密码',
          [LoginStateEnum.LOGIN]: '欢迎登陆',
          [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
          [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
          [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
        };
        return titleObj[unref(getLoginState)];
      });

      return {
        getFormTitle,
      };
    },
  });
</script>
