<template>
  <div class="flex justify-between over-content">
    <span>单位：μg/m³</span>
    <RadioGroup
      size="large"
      :default-value="'d'"
      v-model:value="chartDate"
      button-style="solid"
      @change="changeStatus"
    >
      <radio :value="'d'"> 24小时 </radio>
      <radio :value="'m'"> 30天 </radio>
    </RadioGroup>
  </div>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted, reactive, toRefs } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { getDeviceStatus } from '/@/api/sys/groupAndDevice';
  import { Radio } from 'ant-design-vue';
  import dayjs from 'dayjs';

  interface stateType {
    insideValues?: any;
    insideDates?: any;
    outsideValues?: any;
    outsideDates?: any;
    chartDate: string;
  }

  export default defineComponent({
    components: {
      RadioGroup: Radio.Group,
      Radio: Radio.Button,
    },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '312px',
      },
      deviceId: {
        type: String,
      },
    },
    setup(props) {
      const state: stateType = reactive({
        insideValues: [],
        insideDates: [],
        outsideValues: [],
        outsideDates: [],
        chartDate: 'd',
      });

      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

      function changeStatus() {
        getEchartData();
      }
      async function getEchartData() {
        let param = {
          deviceId: props.deviceId,
          t: state.chartDate,
          item: 'pm25_in',
        };
        let param2 = {
          deviceId: props.deviceId,
          t: state.chartDate,
          item: 'pm25_out',
        };
        let insideRes = await getDeviceStatus(param);
        let outsideRes = await getDeviceStatus(param2);
        if (insideRes) {
          state.insideDates = insideRes.map((item) => {
            return dayjs(item.date).format('MM-DD HH:mm');
          });
          state.insideValues = insideRes.map((item) => {
            return Number(item.value);
          });
        }
        if (outsideRes) {
          state.outsideValues = outsideRes.map((item) => {
            return Number(item.value);
          });
        }
        chartInit();
      }
      function chartInit() {
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
            data: state.insideDates,
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
              data: state.outsideValues,
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
              data: state.insideValues,
            },
          ],
        });
      }
      onMounted(() => {
        getEchartData();
      });
      return { ...toRefs(state), chartRef, changeStatus, getEchartData, chartInit };
    },
  });
</script>
