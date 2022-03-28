<template>
  <div class="justify-between max-w-full lg:flex">
    <div class="flex-col mt-2 md:flex md:w-8/10">
      <div class="w-auto md:flex">
        <template v-for="item in cardLists" :key="item.title">
          <div
            class="flex flex-col h-40 px-4 py-4 mx-2"
            :style="{
              backgroundImage: 'url(' + item.bgImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              width: '305px',
            }"
          >
            <div class="py-5 text-lg text-white">
              {{ item.title }}
            </div>
            <div class="py-5 text-xl text-white"> {{ item.value }} 台 </div>
          </div>
        </template>
      </div>
      <div class="px-2 py-4">
        <a-input-search placeholder="搜索设备PID" style="width: 400px" />
        <a-button class="ml-3 s-btn">查询</a-button>
      </div>
    </div>
    <div class="px-4 md:flex md:w-2/10">
      <div
        class="flex-col items-center justify-between px-4 py-5 md:flex"
        :style="{
          backgroundImage: 'url(' + '/src/assets/images/homePage/datecard.png' + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          width: '250px',
          height: '230px',
        }"
      >
        <div class="date-year"> {{ dateYear }} </div>
        <div class="date-day"> {{ dateDay }} </div>
        <div class="text-center date-week"> {{ dateWeek }} </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs, onMounted } from 'vue';

  import { useUserStore } from '/@/store/modules/user';

  import headerImg from '/@/assets/images/header.jpg';
  import { growCardList } from './data';
  import moment from 'moment';
  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const userinfo = computed(() => userStore.getUserInfo);
      const state = reactive({
        timeHalo: '',
        dateYear: '',
        dateDay: '',
        dateWeek: '',
      });

      function dealWeekDay(event: any) {
        switch (event) {
          case 0:
            state.dateWeek = '星期一';
            break;
          case 1:
            state.dateWeek = '星期二';
            break;
          case 2:
            state.dateWeek = '星期三';
            break;
          case 3:
            state.dateWeek = '星期四';
            break;
          case 4:
            state.dateWeek = '星期五';
            break;
          case 5:
            state.dateWeek = '星期六';
            break;
          case 6:
            state.dateWeek = '星期天';
            break;
        }
      }

      function Politenes() {
        let time = new Date();
        state.dateYear = moment(time).format('YYYY') + '年' + moment(time).format('MM') + '月';
        state.dateDay = moment(time).format('DD');
        dealWeekDay(moment(time).weekday());
        console.log('time', state.dateWeek);
      }

      onMounted(() => Politenes());
      return { ...toRefs(state), userinfo, headerImg, cardLists: growCardList };
    },
  });
</script>

<style lang="less" scoped>
  .date-year {
    margin: 0 auto;
    height: 31px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #09b9dc;
    opacity: 1;
  }
  .date-day {
    width: 96px;
    height: 109px;
    font-size: 90px;
    font-weight: 500;
    line-height: 109px;
    color: #f9ae1e;
    opacity: 1;
  }
  .date-week {
    width: 163px;
    height: 30px;
    background: #666666;
    opacity: 1;
    border-radius: 15px;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    color: #ffffff;
  }
  .s-btn {
    width: 60px;
    height: 35px;
    background: #00b9d7;
    opacity: 1;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #ffffff;
  }
</style>
