<template>
  <div class="md:flex">
    <template
      v-for="(item, index) in growCardList"
      :key="item.title"
    >
      <!-- :title="item.title" -->
      <Card
        size="small"
        :loading="$attrs.loading"
        class="md:w-1/4 w-full md:!mt-0 !mt-4"
        :class="[index + 1 < 4 && 'md:!mr-4']"
        :canExpan="false"
        :style="{background:colorList[index],borderRadius:'10px'}"
      >
        <!-- <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template> -->
        <template #title>
          <span :style="{color:'#ffffff'}">
            {{item.title}}
          </span>
        </template>

        <div class="py-4 px-4 flex justify-between">
          <Icon
            :icon="item.icon"
            :size="40"
            :style="{color:'#fff'}"
          />
          <CountTo
            prefix=""
            :suffix="uniList[index]"
            :startVal="1"
            :endVal="totalList[index]"
            class="text-2xl"
            :style="{color:'#fff'}"
          />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts">
import { onMounted, defineComponent, reactive, toRefs } from 'vue';

import { CountTo } from '/@/components/CountTo/index';
import { Icon } from '/@/components/Icon';
import { Card } from 'ant-design-vue';
import { getStatisticsData } from '/@/api/sys/menu';

import { growCardList } from '../data';
interface arrType {
  colorList: string[];
  totalList: string[];
  uniList: string[];
}
export default defineComponent({
  components: { CountTo, Card, Icon },
  setup() {
    const state = reactive<arrType>({
      colorList: ['#00b9d7', '#4880ff', '#ff5f59', '#ffc400'],
      uniList: ['台','人','台','台'],
      totalList: [],
    });
    const getDataList = async () => {
      const data: any = await getStatisticsData();
      state.totalList.push(
        data.deviceNum,
        data.userNum,
        data.exceptionDeviceNum,
        data.onlineDeviceNum
      );
    };
    onMounted(() => {
      getDataList();
    });
    return { growCardList, ...toRefs(state) };
  },
});
</script>
