<template>
    <div>
      <Header />
      <Breadcrumbs :links="breadcrumbs" />
      <h1>Категорія: {{ category }}</h1>
      <div class="posts">
        <PostCard v-for="post in posts" :key="post.slug" :post="post" />
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { useContent } from '@nuxt/content'
  import Header from '~/components/Header.vue'
  import Breadcrumbs from '~/components/Breadcrumbs.vue'
  import PostCard from '~/components/PostCard.vue'
  import Footer from '~/components/Footer.vue'
  import { ref } from 'vue'
  
  const route = useRoute()
  const category = route.params.category
  
  const { data: posts } = await useContent('posts')
    .where({ categories: { $contains: category } })
    .sortBy('date', 'desc')
    .fetch()
  
  const breadcrumbs = [
    { name: 'Головна', link: '/' },
    { name: category, link: `/category/${category}` }
  ]
  </script>
  
  <style scoped>
  .posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
  }
  </style>
  