<template>
    <v-container>
      <h2 class="text-center">Мої проекти</h2>
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="project in projects" :key="project.id">
          <v-card>
            <v-img :src="project.image" height="200px"></v-img>
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
            <v-card-actions>
              <v-btn color="primary" :href="project.link" target="_blank">Детальніше</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projects: [
          {
            id: 1,
            title: 'Проект 1',
            description: 'Опис першого проекту.',
            image: '/project1.jpg',
            link: 'https://example.com/project1',
          },
          {
            id: 2,
            title: 'Проект 2',
            description: 'Опис другого проекту.',
            image: '/project2.jpg',
            link: 'https://example.com/project2',
          },
        ],
      };
    },
  };
  </script>
  