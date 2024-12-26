<template>
    <v-container>
      <h2>Освіта</h2>
      <v-timeline>
        <v-timeline-item
          v-for="education in educationList"
          :key="education.title"
          :title="education.title"
          :subtitle="education.period"
          :color="education.color"
        >
          {{ education.description }}
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        educationList: [
        {
            title: 'Повна середня освіта',
            period: '2010-2021',
            description: 'Шосткинський ліцей',
            color: 'primary',
          },

          {
            title: 'Бакалавр',
            period: '2021-2025',
            description: 'Університет Житомирська Політехніка',
            color: 'primary',
          },
        ],
      };
    },
  };
  </script>
  