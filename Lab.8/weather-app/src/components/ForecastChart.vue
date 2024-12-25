<template>
    <div class="forecast-chart" v-if="chartData">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted, watch, ref } from 'vue'
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js'
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: false
      }
    },
    setup(props) {
      const chartCanvas = ref(null)
      let chartInstance = null
  
      const renderChart = () => {
        if (chartInstance) {
          chartInstance.destroy()
        }
  
        const ctx = chartCanvas.value.getContext('2d')
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: props.chartData.labels,
            datasets: [
              {
                label: 'Температура',
                data: props.chartData.temperatures,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false
              },
              {
                label: 'Відчувається як',
                data: props.chartData.feels_like,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false
              },
              {
                label: 'Опади',
                data: props.chartData.rain,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Прогноз температур та опадів'
              }
            }
          }
        })
      }
  
      onMounted(() => {
        if (props.chartData) {
          renderChart()
        }
      })
  
      watch(() => props.chartData, () => {
        if (props.chartData) {
          renderChart()
        }
      })
  
      return { chartCanvas }
    }
  }
  </script>
  
  <style scoped>
  .forecast-chart {
    background-color: var(--card-bg);
    color: var(--card-text);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
  }
  </style>
  