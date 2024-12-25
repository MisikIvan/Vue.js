<template>
  <div :class="['app', theme]">
    <Header />
    <SearchBar @search="handleSearch" />
    <WeatherCard :weather="currentWeather" />
    <ForecastList :forecast="forecastData" />
    <ForecastChart :chartData="chartData" />
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Header from './components/Header.vue'
import SearchBar from './components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue'
import ForecastList from './components/ForecastList.vue'
import ForecastChart from './components/ForecastChart.vue'
import { getCurrentWeather, getForecast } from './services/weatherService'

export default {
  components: {
    Header,
    SearchBar,
    WeatherCard,
    ForecastList,
    ForecastChart
  },
  setup() {
    const currentWeather = ref(null)
    const forecastData = ref(null)
    const chartData = ref(null)
    const error = ref(null)
    const theme = ref(localStorage.getItem('theme') || 'light')

    const handleSearch = async (city) => {
      try {
        error.value = null
        const weatherResponse = await getCurrentWeather(city)
        currentWeather.value = weatherResponse.data

        const { coord } = weatherResponse.data
        const forecastResponse = await getForecast(coord.lat, coord.lon)
        forecastData.value = forecastResponse.data.daily.slice(1, 5) // наступні 4 дні

        // Підготовка даних для графіка
        chartData.value = {
          labels: forecastResponse.data.daily.slice(1, 5).map(day => {
            const date = new Date(day.dt * 1000)
            return date.toLocaleDateString([], { weekday: 'short' })
          }),
          temperatures: forecastResponse.data.daily.slice(1, 5).map(day => day.temp.day),
          feels_like: forecastResponse.data.daily.slice(1, 5).map(day => day.feels_like.day),
          rain: forecastResponse.data.daily.slice(1, 5).map(day => day.rain || 0)
        }
      } catch (err) {
        console.error(err)
        error.value = 'Місто не знайдено або сталася помилка при завантаженні даних.'
      }
    }

    return { currentWeather, forecastData, chartData, handleSearch, error, theme }
  }
}
</script>

<style>
:root {
  --header-bg: #f5f5f5;
  --header-text: #333;
  --card-bg: #fff;
  --card-text: #333;
  --error-text: red;
}

body.dark {
  --header-bg: #333;
  --header-text: #f5f5f5;
  --card-bg: #444;
  --card-text: #f5f5f5;
}

.app {
  font-family: Arial, sans-serif;
  padding: 1rem;
  background-color: var(--header-bg);
  min-height: 100vh;
}

.error {
  color: var(--error-text);
  text-align: center;
  margin-top: 1rem;
}

/* В App.vue або окремий CSS файл */

@media (max-width: 768px) {
  .weather-card, .forecast-list, .forecast-chart {
    padding: 0.5rem;
  }

  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar input, .search-bar button {
    width: 100%;
    margin: 0.25rem 0;
  }
}

@media (min-width: 769px) {
  .search-bar input {
    width: 300px;
  }
}


</style>
