<template>
    <div class="hero">
      <v-container>
        <v-row class="text-center">
          <v-col>
            <h1>Привіт, я Іван!</h1>
            <p>Ласкаво просимо до мого портфоліо</p>
            <v-btn color="primary" @click="scrollToNext">Дізнатись більше</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToNext() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      },
    },
  };
  </script>
  
  <style scoped>
  .hero {
    background-image: url('https://cdn.7tv.app/emote/01GQFT1WF80002Q9KS8SKQMHHY/4x.avif');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  </style>
  