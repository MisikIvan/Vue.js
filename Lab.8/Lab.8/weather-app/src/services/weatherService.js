import axios from 'axios';

const API_KEY = '0da19d558cb34bd4c80b8d21fc1f7706';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export async function fetchWeather(city) {
  const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
}

export async function fetchForecast(city) {
  const response = await axios.get(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
}
