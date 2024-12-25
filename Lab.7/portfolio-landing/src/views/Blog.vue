<template>
    <v-container>
      <h2>Блог</h2>
      <v-row>
        <v-col cols="12" md="6" v-for="article in articles" :key="article.id">
          <v-card>
            <v-card-title>{{ article.title }}</v-card-title>
            <v-card-text>{{ article.excerpt }}</v-card-text>
            <v-card-actions>
              <v-btn :to="`/blog/${article.id}`" color="primary">Читати далі</v-btn>
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
        articles: [
          { id: 1, title: 'Стаття 1', excerpt: 'Короткий опис статті 1.' },
          { id: 2, title: 'Стаття 2', excerpt: 'Короткий опис статті 2.' },
        ],
      };
    },
  };
  </script>
  