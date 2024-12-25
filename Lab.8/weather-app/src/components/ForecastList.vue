<template>
    <div class="forecast-list" v-if="forecast">
      <h3>Прогноз на найближчі 4 дні</h3>
      <ul>
        <li v-for="day in forecast" :key="day.dt">
          <p>{{ formatDate(day.dt) }}</p>
          <p>{{ day.weather[0].description }}</p>
          <p>Макс: {{ day.temp.max }}°C / Мін: {{ day.temp.min }}°C</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      forecast: {
        type: Array,
        required: false
      }
    },
    methods: {
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
      }
    }
  }
  </script>
  
  <style scoped>
  .forecast-list {
    background-color: var(--card-bg);
    color: var(--card-text);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
  }
  
  li:last-child {
    border-bottom: none;
  }
  </style>
  