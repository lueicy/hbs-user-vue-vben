<template>
  <div :style="{
    textAlign:'right' 
  }">

    <Select
      :style="{width:'80px' }"
      default-value="按日"
      size="small"
      @change="handleChange"
    >
      <SelectOption value="y">
        按年
      </SelectOption>
      <SelectOption value="m">
        按月
      </SelectOption>
      <SelectOption value="d">
        按日
      </SelectOption>
      <!-- <template #suffixIcon>
        <Icon icon="ion:calendar" />
      </template> -->
    </Select>

  </div>
  <div
    ref="chartRef"
    :style="{ height, width }"
  ></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';

import { useECharts } from '/@/hooks/web/useECharts';
import { Select } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { basicProps } from './props';
import { GetUserAddNumList } from '/@/api/sys/menu';

export default defineComponent({
  props: basicProps,
  components: {
    Icon,
    Select,
    SelectOption: Select.Option,
  },
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

    const GetchartRef = (resData) => {
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
          // trigger: 'item',
          formatter: '{a}  : {c}人',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: resData.map((item) => item.date),
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            name: '    数量：人',
            type: 'value',
            // max: 80000,
            max:
              Number(
                Math.max.apply(
                  Math,
                  resData.map((item) => item.num)
                )
              ) + 10,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: { left: 0, right: '2%', top: '10%', bottom: 0, containLabel: true },
        series: [
          {
            name: '活跃人数:',
            smooth: true,
            data: resData.map((item) => item.num),
            type: 'line',
            areaStyle: {
              color: '#00B9D7', // 100% 处的颜色
              opacity:0.05
            },
            itemStyle: {
              color: '#00B9DC',
            },
          },
        ],
      });
    };

    const handleChange = (value: string) => getYear(value);

    async function getYear(data: string) {
      let item = {
        start: '1599385862000',
        end: Math.round(new Date()), //获取时间戳
        statisticsType: data,
      };
      let resData = await GetUserAddNumList(item);
      // console.log('resData-----', resData);
      GetchartRef(resData);
    }
    onMounted(() => getYear('d'));
    return { chartRef, handleChange };
  },
});
</script>
