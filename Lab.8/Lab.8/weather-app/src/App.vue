<template>
  <v-app>
    <v-container>
      <!-- Header -->
      <Header />

      <!-- Search Bar -->
      <SearchBar @search="getWeatherData" />

      <!-- Weather Card (поточна погода) -->
      <WeatherCard v-if="weather" :weather="weather" />

      <!-- Прогноз погоди -->
      <ForecastList v-if="forecast" :forecast="forecast" />

      <!-- Графік прогнозу -->
      <ForecastChart v-if="chartData" :data="chartData" />

      <!-- Toggle Theme -->
      <ToggleTheme />

    </v-container>
  </v-app>
</template>

<script>
// Імпортуємо компоненти
import Header from './components/Header.vue';
import SearchBar from './components/SearchBar.vue';
import WeatherCard from './components/WeatherCard.vue';
import ForecastList from './components/ForecastList.vue';
import ForecastChart from './components/ForecastChart.vue';
import ToggleTheme from './components/ToggleTheme.vue';

import { fetchWeather, fetchForecast } from './services/weatherService';

export default {
  components: {
    Header,
    SearchBar,
    WeatherCard,
    ForecastList,
    ForecastChart,
    ToggleTheme,
  },
  data() {
    return {
      weather: null, // Поточна погода
      forecast: null, // Прогноз погоди на кілька днів
      chartData: null, // Дані для графіка
      city: '', // Назва міста
    };
  },
  methods: {
    // Отримання даних про погоду
    async getWeatherData(city) {
      this.city = city;
      try {
        // Отримуємо поточну погоду
        const weatherData = await fetchWeather(this.city);
        this.weather = weatherData;

        // Отримуємо прогноз погоди
        const forecastData = await fetchForecast(this.city);
        this.forecast = forecastData;

        // Обробка даних для графіка (температура, відчутна температура та опади)
        this.chartData = {
          temperature: forecastData.list.map(item => item.main.temp),
          feels_like: forecastData.list.map(item => item.main.feels_like),
          precipitation: forecastData.list.map(item => item.rain ? item.rain['3h'] : 0),
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Стили для адаптивності та темної/світлої теми */
body {
  background-color: #f5f5f5;
  color: #333;
}

.v-app {
  background-color: #ffffff;
}

.v-container {
  padding: 2rem;
}
</style>
