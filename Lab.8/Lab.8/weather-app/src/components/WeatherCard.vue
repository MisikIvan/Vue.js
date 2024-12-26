<template>
  <div class="weather-card">
    <h2>Погода в місті {{ city }}</h2>
    <p>Температура: {{ weather.temp }}°C</p>
    <p>Стан неба: {{ weather.weather[0].description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: 'Kyiv',
      weather: {},
    };
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      try {
        const response = await fetchWeather(this.city);
        this.weather = response;
      } catch (error) {
        console.error('Помилка при завантаженні погоди:', error);
      }
    },
  },
};
</script>
