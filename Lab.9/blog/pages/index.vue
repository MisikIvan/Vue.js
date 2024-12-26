<template>
  <div class="home">
    <!-- Заголовок сторінки -->
    <h1>Ласкаво просимо до мого блогу</h1>

    <!-- Пошук та фільтрація -->
    <div class="search">
      <input v-model="searchQuery" type="text" placeholder="Пошук статей..." />
      <button @click="searchArticles">Пошук</button>
    </div>

    <!-- Список статей -->
    <ul class="articles-list">
      <li v-for="article in filteredArticles" :key="article.id">
        <NuxtLink :to="`/article/${article.slug}`" class="article-link">
          <h2>{{ article.title }}</h2>
          <p>{{ article.shortDescription }}</p>
          <small>Дата публікації: {{ article.date }}</small>
        </NuxtLink>
      </li>
    </ul>

    <!-- Пагінація -->
    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)">
        Попередня
      </button>
      <span>Сторінка {{ currentPage }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)">
        Наступна
      </button>
    </div>

    <!-- Рекомендовані статті -->
    <div v-if="recommendedArticles.length" class="recommended-articles">
      <h3>Рекомендовані статті</h3>
      <ul>
        <li v-for="article in recommendedArticles" :key="article.id">
          <NuxtLink :to="`/article/${article.slug}`">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Повернення на початок сторінки -->
    <ScrollToTop />
  </div>
</template>

<script setup>
// Імпортуємо необхідні компоненти
import { ref, computed } from 'vue';
import ScrollToTop from '~/components/ScrollToTop.vue'; // Компонент для повернення на початок
import { useRouter } from 'vue-router';

// Дані статей
const articles = ref([
  { id: 1, title: 'Стаття 1', slug: 'article-1', shortDescription: 'Опис статті 1', date: '2024-12-26' },
  { id: 2, title: 'Стаття 2', slug: 'article-2', shortDescription: 'Опис статті 2', date: '2024-12-25' },
  { id: 3, title: 'Стаття 3', slug: 'article-3', shortDescription: 'Опис статті 3', date: '2024-12-24' }
]);

// Стан сторінки
const currentPage = ref(1);
const articlesPerPage = 2;
const searchQuery = ref('');
const recommendedArticles = ref([
  { id: 1, slug: 'article-1', title: 'Рекомендована стаття 1' },
  { id: 2, slug: 'article-2', title: 'Рекомендована стаття 2' }
]);

// Обчислювані властивості
const totalPages = computed(() => {
  return Math.ceil(articles.value.length / articlesPerPage);
});

const filteredArticles = computed(() => {
  let filtered = articles.value;
  if (searchQuery.value) {
    filtered = filtered.filter(article => article.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  const startIndex = (currentPage.value - 1) * articlesPerPage;
  return filtered.slice(startIndex, startIndex + articlesPerPage);
});

// Методи
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const searchArticles = () => {
  // Логіка пошуку
  currentPage.value = 1; // Скидаємо на першу сторінку після пошуку
};

// SEO-мета-дані
definePageMeta({
  title: 'Мій блог',
  meta: [
    { name: 'description', content: 'Це мій особистий блог на Nuxt 3' },
    { name: 'keywords', content: 'блог, Nuxt 3, статті' },
    { property: 'og:title', content: 'Мій блог' },
    { property: 'og:description', content: 'Це мій особистий блог на Nuxt 3' },
    { property: 'og:image', content: 'URL_до_зображення' },
    { property: 'og:url', content: 'https://example.com' }
  ]
});
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

.search {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.articles-list {
  list-style-type: none;
  padding: 0;
}

.article-link {
  text-decoration: none;
  color: #333;
}

.article-link h2 {
  margin: 0;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.recommended-articles {
  margin-top: 40px;
}

.recommended-articles ul {
  list-style-type: none;
  padding: 0;
}

.recommended-articles li {
  margin: 10px 0;
}

button:disabled {
  background-color: #ccc;
}

button {
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  margin: 5px;
}
</style>
