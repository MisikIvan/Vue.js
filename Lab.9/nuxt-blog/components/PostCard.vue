<template>
    <div class="post-card">
      <nuxt-link :to="`/posts/${post.slug}`">
        <h2>{{ post.title }}</h2>
      </nuxt-link>
      <p>{{ post.description }}</p>
      <div class="post-meta">
        <span>{{ formatDate(post.date) }}</span>
        <span>Категорії: 
          <nuxt-link v-for="category in post.categories" :key="category" :to="`/category/${category}`">
            {{ category }}
          </nuxt-link>
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    post: {
      type: Object,
      required: true
    }
  })
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>
  
  <style scoped>
  .post-card {
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .post-card h2 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .post-card p {
    color: #666;
  }
  
  .post-meta {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: #999;
  }
  
  .post-meta a {
    margin-left: 0.5rem;
    color: #007BFF;
    text-decoration: none;
  }
  
  .post-meta a:hover {
    text-decoration: underline;
  }
  </style>
  