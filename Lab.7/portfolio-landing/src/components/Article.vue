<template>
    <v-container>
      <h2>{{ article.title }}</h2>
      <p>{{ article.content }}</p>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        article: {},
      };
    },
    mounted() {
      const articles = [
        { id: 1, title: 'Стаття 1', content: 'Детальний текст статті 1.' },
        { id: 2, title: 'Стаття 2', content: 'Детальний текст статті 2.' },
      ];
      const articleId = this.$route.params.id;
      this.article = articles.find((a) => a.id == articleId);
    },
  };
  </script>
  