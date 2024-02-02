<template>
  <Radar :data="data" :options="options" />
</template>
  
<script lang="ts" setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const props = withDefaults(defineProps<{ dataRadar: number[] }>(), {
  dataRadar: () => [0, 0, 0, 0, 0, 0, 0]
})

const data = computed(() => {
  return {
    labels: [
      'Ball Skill',
      'Defence',
      'Mental',
      'Goalkeeper',
      'Physical',
      'Shooting',
      'Passing'
    ],
    datasets: [
      {
        label: 'FIFA',
        backgroundColor: '#1B1C21',
        borderColor: '#1B1C21',
        pointBackgroundColor: '#1B1C21',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1B1C21',
        data: [...props.dataRadar]
      }
    ]
  }
})
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
    },
  },
  scales: {r: {ticks: {
    display: false
  },
  backgroundColor: '#DEDFE4',
}
}
}

</script>