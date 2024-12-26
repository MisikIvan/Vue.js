<template>
    <v-list>
      <v-list-item v-for="(forecast, index) in forecasts" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ forecast.date }}</v-list-item-title>
          <v-list-item-subtitle>{{ forecast.temp }}°C</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </template>
  
  <script>
  export default {
    props: {
      forecasts: Array,
    },
  };
  </script>
  