<template>
  <div>
    <BarChart
      ref="BarRef"
      :data="testData"
      :options="myOptions"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  ChartData,
} from 'chart.js'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)
import { BarChart } from 'vue-chart-3'

export default defineComponent({
  components: { BarChart },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    srcData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const BarRef = ref<typeof BarChart>()

    const myOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Bar Chart',
        },
      },
    })

    const testData = computed<ChartData<'doughnut'>>(() => ({
      labels: props.labels,
      // category: 'aaa',
      datasets: [
        {
          label: '# something',
          data: (props.srcData as number[]),
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    }))

    return { testData, BarRef, myOptions }
  },
})
</script>
