<!-- pages/index.vue -->

<template>
    <div>
      <Header />
      <Breadcrumbs :links="breadcrumbs" />
      <section class="posts-section">
        <div class="posts-container">
          <PostCard v-for="post in paginatedPosts" :key="post.slug" :post="post" />
        </div>
      </section>
      <Pagination :total="totalPages" :current="currentPage" @change="changePage" />
      <ScrollToTop />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { useContent } from '@nuxt/content'
  import { ref, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  import Header from '~/components/Header.vue'
  import Breadcrumbs from '~/components/Breadcrumbs.vue'
  import PostCard from '~/components/PostCard.vue'
  import Pagination from '~/components/Pagination.vue'
  import ScrollToTop from '~/components/ScrollToTop.vue'
  import Footer from '~/components/Footer.vue'
  
  const POSTS_PER_PAGE = 5
  
  const route = useRoute()
  const router = useRouter()
  
  // Отримання поточної сторінки з параметрів маршруту
  const currentPage = ref(parseInt(route.query.page) || 1)
  
  // Спостереження за зміною параметрів маршруту
  watch(
    () => route.query.page,
    (newPage) => {
      currentPage.value = parseInt(newPage) || 1
    }
  )
  
  // Отримання всіх постів
  const { data: posts } = await useContent('posts')
    .sortBy('date', 'desc')
    .fetch()
  
  const totalPages = computed(() => Math.ceil(posts.length / POSTS_PER_PAGE))
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * POSTS_PER_PAGE
    return posts.slice(start, start + POSTS_PER_PAGE)
  })
  
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      router.push({ query: { page } })
    }
  }
  
  const breadcrumbs = [
    { name: 'Головна', link: '/' }
  ]
  </script>
  
  <style scoped>
  .posts-section {
    padding: 2rem 0;
  }
  
  .posts-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  </style>
  