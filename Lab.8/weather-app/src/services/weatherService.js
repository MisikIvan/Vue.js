import axios from 'axios'

const API_KEY = import.meta.env.0da19d558cb34bd4c80b8d21fc1f7706
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getCurrentWeather = (city) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY
    }
  })
}

export const getForecast = (lat, lon) => {
  return axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      exclude: 'minutely,hourly,alerts',
      units: 'metric',
      appid: API_KEY
    }
  })
}
