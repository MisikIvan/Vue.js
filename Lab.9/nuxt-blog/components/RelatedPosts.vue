<template>
    <div class="related-posts">
      <h3>Схожі статті</h3>
      <div class="posts">
        <PostCard v-for="post in relatedPosts" :key="post.slug" :post="post" />
      </div>
    </div>
  </template>
  
  <script setup>
  import PostCard from '~/components/PostCard.vue'
  defineProps({
    relatedPosts: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .related-posts {
    margin-top: 3rem;
  }
  
  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  </style>
  