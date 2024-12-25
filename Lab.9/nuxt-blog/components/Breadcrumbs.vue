<template>
    <nav aria-label="breadcrumb" class="breadcrumbs">
      <ol>
        <li v-for="(link, index) in links" :key="index">
          <nuxt-link :to="link.link">{{ link.name }}</nuxt-link>
          <span v-if="index < links.length -1"> / </span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  defineProps({
    links: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .breadcrumbs {
    padding: 1rem 2rem;
    background-color: #f5f5f5;
  }
  
  .breadcrumbs ol {
    list-style: none;
    display: flex;
  }
  
  .breadcrumbs li {
    font-size: 0.9rem;
  }
  </style>
  