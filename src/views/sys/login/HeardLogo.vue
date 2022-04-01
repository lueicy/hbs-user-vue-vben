<template>
  <div class="logo-medium" :style="{ height: logoHeight }">
    <div class="flex items-center w-full my-auto">
      <img src="../../../assets/images/logo.png" />
      <div class="font-medium text-white">
        <span class="inline-block mt-4 text-3xl text-box"> 用户后台管理系统 </span>
      </div>
      <!-- <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
        {{ t('sys.login.signInDesc') }}
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HeardLogo',
    props: {
      logoHeight: {
        type: String,
        default: '',
      },
    },

    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped>
  .logo-medium {
    padding: 88px 0px 0px 50px;
  }
  .font-medium {
    margin-left: 69px;
  }
  .text-box {
    color: #00b9dc;
    font-weight: 600;
  }
</style>
