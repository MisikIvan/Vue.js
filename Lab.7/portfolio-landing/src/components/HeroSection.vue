<template>
    <v-container class="hero">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12">
          <h1 class="display-1">Привіт! Я Місік Іван</h1>
          <p class="subtitle-1">Ласкаво просимо до мого портфоліо</p>
          <v-btn large color="primary" @click="$emit('scrollTo', 'about')">Дізнатися більше</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style scoped>
  .hero {
    background-image: url('/hero-bg.jpg');
    background-size: cover;
    color: white;
    padding: 100px 0;
  }
  </style>
  