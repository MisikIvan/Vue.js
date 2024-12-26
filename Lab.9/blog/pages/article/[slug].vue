<template>
    <div>
      <h1>{{ article.title }}</h1>
      <p>{{ article.content }}</p>
      <div v-if="recommendedArticles.length">
        <h3>Рекомендовані статті</h3>
        <ul>
          <li v-for="recArticle in recommendedArticles" :key="recArticle.id">
            <NuxtLink :to="`/article/${recArticle.slug}`">{{ recArticle.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const article = ref({
    title: 'Стаття 1',
    content: 'Це контент статті 1.'
  });
  
  const recommendedArticles = ref([
    { id: 2, title: 'Рекомендована стаття 1', slug: 'article-2' }
  ]);
  </script>
  