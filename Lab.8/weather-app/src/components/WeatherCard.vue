<template>
    <div class="weather-card" v-if="weather">
      <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
      <p>{{ weather.weather[0].description }}</p>
      <p>Температура: {{ weather.main.temp }}°C</p>
      <p>Відчувається як: {{ weather.main.feels_like }}°C</p>
      <p>Вологість: {{ weather.main.humidity }}%</p>
      <p>Швидкість вітру: {{ weather.wind.speed }} м/с</p>
      <p>Схід сонця: {{ formatTime(weather.sys.sunrise) }}</p>
      <p>Заход сонця: {{ formatTime(weather.sys.sunset) }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      weather: {
        type: Object,
        required: false
      }
    },
    methods: {
      formatTime(timestamp) {
        const date = new Date(timestamp * 1000)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }
  }
  </script>
  
  <style scoped>
  .weather-card {
    background-color: var(--card-bg);
    color: var(--card-text);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 1rem 0;
  }
  </style>
  