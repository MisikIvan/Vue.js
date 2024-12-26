<template>
    <v-container>
      <h2>Мої проекти</h2>
      <v-row>
        <v-col
          v-for="project in projects"
          :key="project.title"
          cols="12"
          md="4"
        >
          <v-card>
            <v-img :src="project.image" height="200px" />
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
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
            title: 'Проект 1',
            image: 'https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.avif',
            description: 'Опис проекту',
          },
          {
            title: 'Проект 2',
            image: 'https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x.avif',
            description: 'Опис проекту',
          },
          {
            title: 'Проект 3',
            image: 'https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/4x.avif',
            description: 'Опис проекту',
          },
          {
            title: 'Проект 4',
            image: 'https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x.avif',
            description: 'Опис проекту',
          },
        ],
      };
    },
  };
  </script>
  