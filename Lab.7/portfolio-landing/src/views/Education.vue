<template>
    <v-container>
      <h2>Освіта</h2>
      <v-timeline>
        <v-timeline-item
          v-for="education in educations"
          :key="education.id"
          :title="education.institution"
          :subtitle="education.date"
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
        educations: [
          { id: 1, institution: 'Університет', date: '2021-2025', description: 'Спеціальність IT' },
        ],
      };
    },
  };
  </script>
  