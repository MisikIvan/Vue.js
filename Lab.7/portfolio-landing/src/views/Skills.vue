<template>
    <v-container>
      <h2>Мої навички</h2>
      <v-row>
        <v-col cols="12" md="6" v-for="skill in skills" :key="skill.name">
          <h3>{{ skill.name }}</h3>
          <v-progress-linear :value="skill.level" color="primary"></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        skills: [
          { name: 'JavaScript', level: 90 },
          { name: 'Vue.js', level: 40 },
          { name: 'CSS', level: 80 },
        ],
      };
    },
  };
  </script>
  