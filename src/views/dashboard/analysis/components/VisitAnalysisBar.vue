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
import { basicProps } from './props';

import { GetDeviceAddNumList } from '/@/api/sys/menu';

export default defineComponent({
  components: {
    // Icon,
    Select,
    SelectOption: Select.Option,
  },
  props: basicProps,
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    const getChartRef = (resData) => {
      setOptions({
        tooltip: {
          // trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
          trigger: 'item',
          formatter: '{a}  : {c}台',
        },
        grid: { left: 0, right: '2%', top: '10%', bottom: 0, containLabel: true },
        xAxis: {
          type: 'category',
          data: resData.map((item) => item.date),
        },
        yAxis: {
          name: '    数量：台',
          type: 'value',
          max:
            Number(
              Math.max.apply(
                Math,
                resData.map((item) => item.num)
              )
            ) + 10,

          splitNumber: 4,
          axisLabel: {
            show: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000000',
              opacity: 0.05,
              width: 1, //这里是为了突出显示加上的
            },
          },
        },
        series: [
          {
            name: '设备数量:',
            data: resData.map((item) => item.num),
            type: 'bar',
            barMaxWidth: 80,
            color: ['#00b9dc'],
          },
        ],
      });
    };
    const handleChange = (value) => getYear(value);

    async function getYear(data: string) {
      let item = {
        start: '1599385862000',
        end: Math.round(new Date()), //获取时间戳
        statisticsType: data,
      };
      let resData = await GetDeviceAddNumList(item);
      // console.log('resData-----', resData);
      getChartRef(resData);
    }
    onMounted(() => getYear('d'));
    return { chartRef, handleChange };
  },
});
</script>
