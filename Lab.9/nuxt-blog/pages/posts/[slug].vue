<template>
    <div>
      <Header />
      <Breadcrumbs :links="breadcrumbs" />
      <article class="post">
        <h1>{{ post.title }}</h1>
        <p class="meta">Опубліковано: {{ formatDate(post.date) }}</p>
        <nuxt-content :document="post" />
        <SocialShare :shareUrl="shareUrl" :shareTitle="post.title" />
        <RelatedPosts :relatedPosts="relatedPosts" />
      </article>
      <ScrollToTop />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { useContent, useRoute } from '@nuxt/content'
  import Header from '~/components/Header.vue'
  import Breadcrumbs from '~/components/Breadcrumbs.vue'
  import SocialShare from '~/components/SocialShare.vue'
  import RelatedPosts from '~/components/RelatedPosts.vue'
  import ScrollToTop from '~/components/ScrollToTop.vue'
  import Footer from '~/components/Footer.vue'
  import { ref } from 'vue'
  
  const route = useRoute()
  const slug = route.params.slug
  
  const { data: post } = await useContent('posts', slug).fetch()
  
  // Отримання схожих статей за категоріями
  const relatedPosts = ref([])
  if (post.categories) {
    const { data } = await useContent('posts')
      .where({ categories: { $in: post.categories } })
      .where({ slug: { $ne: slug } })
      .limit(3)
      .fetch()
    relatedPosts.value = data
  }
  
  const shareUrl = `https://your-domain.com/posts/${slug}`
  
  const breadcrumbs = [
    { name: 'Головна', link: '/' },
    { name: post.title, link: `/posts/${slug}` }
  ]
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>
  
  <style scoped>
  .post {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  .post h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .meta {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .post img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
  }
  
  .post pre {
    background-color: #f5f5f5;
    padding: 1rem;
    overflow-x: auto;
  }
  </style>
  