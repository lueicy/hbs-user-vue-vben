<template>
  <Card
    title="设备型号统计"
    :loading="loading"
  >
    <div
      ref="chartRef"
      :style="{ width, height }"
    ></div>
  </Card>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';

import { Card } from 'ant-design-vue';
import { useECharts } from '/@/hooks/web/useECharts';
import { GetDeviceTypeStatisticsData_List } from '/@/api/sys/menu';

interface GetDataType {
  name: any;
  value: any | string;
}
type GetDataTypeList = GetDataType[];

export default defineComponent({
  components: { Card },
  props: {
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    async function getData() {
      const resData: any[] = await GetDeviceTypeStatisticsData_List();
      getCharts(
        resData
          .map((o) => {
            return { value: o.num, name: o.subType };
          })
          .sort(function (a, b) {
            return a.value - b.value;
          })
      );
    }
    const getCharts = (data: GetDataTypeList) => {
      setOptions({
        tooltip: {
          trigger: 'item',
          axisPointer: {
            lineStyle: {
              width: 5,
              color: '#019680',
            },
          },
          formatter: '{b0}: {c0}台',
        },
        series: [
          {
            // name: '访问来源',
            name: '设备型号统计',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            // color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
            color: ['#00b9d7', '#4880ff', '#ffc400', '#ff5f59'],
            data,
            roseType: 'radius',
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 400;
            },
          },
        ],
      });
    };
    watch(
      () => props.loading,
      () => {
        if (props.loading) {
          return;
        }
        getData();
      },
      { immediate: true }
    );
    return { chartRef };
  },
});
</script>
