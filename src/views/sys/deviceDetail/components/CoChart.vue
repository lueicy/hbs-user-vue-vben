<template>
  <div>CO2</div>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '312px',
      },
    },
    setup() {
      const getLineData = (() => {
        const category: any[] = [];
        let dottedBase = +new Date();
        const lineData: any[] = [];
        const barData: any[] = [];

        for (let i = 0; i < 20; i++) {
          const date = new Date((dottedBase += 1000 * 3600 * 24));
          category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'));
          const b = Math.random() * 200;
          const d = Math.random() * 200;
          barData.push(b);
          lineData.push(d + b);
        }
        // console.log('category', category);
        return { barData, category, lineData };
      })();

      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
      const { category } = getLineData;
      onMounted(() => {
        setOptions({
          // backgroundColor: '#0f375f',
          color: ['#37A2FF', '#000000'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                show: true,
                backgroundColor: '#333',
              },
            },
          },
          legend: {
            data: ['室外', '室内'],
            textStyle: {
              color: '#ccc',
            },
          },
          xAxis: {
            data: category,
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
          yAxis: {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
          series: [
            {
              name: '室外',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(132, 220, 237, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(131, 226, 244, 1)',
                  },
                ]),
              },
              // emphasis: {
              //   focus: 'series',
              // },
              data: [
                140, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 120, 282, 111, 234, 220,
                340, 310, 152, 231,
              ],
              markLine: {
                silent: false,
                lineStyle: {
                  color: '#CB5E40',
                  type: [5, 10],
                },
                data: [
                  {
                    yAxis: 200,
                  },
                ],
                label: {
                  formatter: '污浊',
                },
                emphasis: {
                  disabled: true,
                },
              },
            },
            {
              name: '室内',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(139, 175, 255, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(184, 197, 237, 1)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: [
                120, 282, 111, 234, 220, 340, 310, 140, 232, 101, 264, 90, 340, 250, 120, 282, 111,
                234, 220, 340, 310,
              ],
            },
          ],
        });
      });
      return { chartRef, getLineData };
    },
  });
</script>
