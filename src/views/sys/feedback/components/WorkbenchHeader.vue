<template>
  <div class="lg:flex">
    <Avatar
      :src="userinfo.avatar || headerImg"
      :size="72"
      class="!mx-auto !block"
    />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">{{timeHalo}}好，Daniel Wu！
        <!-- {{ userinfo.realName }} -->
      </h1>
      <!-- <span class="text-secondary"> 今日晴，20℃ - 32℃！ </span> -->
      <span class="text-secondary"> 欢迎回到您的家 </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 设备总数 </span>
        <span class="text-2xl">99</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 在线数量 </span>
        <span class="text-2xl">8</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 离线数量 </span>
        <span class="text-2xl">300</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, onMounted } from 'vue';

import { Avatar } from 'ant-design-vue';
import { useUserStore } from '/@/store/modules/user';

import headerImg from '/@/assets/images/header.jpg';
export default defineComponent({
  components: { Avatar },
  setup() {
    const userStore = useUserStore();
    const userinfo = computed(() => userStore.getUserInfo);
    const state = reactive({
      timeHalo: '',
    });
    function Politenes() {
      let time = new Date().getHours();
      if (time >= 5 && time < 9) {
        state.timeHalo = '早上';
      } else if (time >= 9 && time < 11) {
        state.timeHalo = '上午';
      } else if (time >= 11 && time < 13) {
        state.timeHalo = '中午';
      } else if (time >= 13 && time < 18) {
        state.timeHalo = '下午';
      } else if (time >= 18 || time < 5) {
        state.timeHalo = '晚上';
      }
    }
    onMounted(() => Politenes());
    return { ...toRefs(state), userinfo, headerImg };
  },
});
</script>
