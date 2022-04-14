<template>
  <div class="flex justify-between over-content">
    <span>单位：ppm</span>
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
  import { defineComponent, PropType, ref, Ref, onMounted, toRefs, reactive } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { getDeviceStatus } from '/@/api/sys/groupAndDevice';
  import dayjs from 'dayjs';

  interface stateType {
    dateList?: any;
    valueList?: any;
    chartDate?: any;
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
        dateList: [],
        valueList: [],
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
          item: 'co2',
        };
        let res = await getDeviceStatus(param);
        if (res) {
          state.dateList = res.map((item) => {
            return dayjs(item.date).format('MM-DD HH:mm');
          });
          state.valueList = res.map((item) => {
            return Number(item.value);
          });
          chartInit();
        }
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
            data: ['室内'],
            textStyle: {
              color: '#ccc',
            },
          },
          xAxis: {
            data: state.dateList,
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
              data: state.valueList,
            },
          ],
        });
      }
      onMounted(() => {
        getEchartData();
      });
      return { ...toRefs(state), chartRef, getEchartData, changeStatus, chartInit };
    },
  });
</script>
