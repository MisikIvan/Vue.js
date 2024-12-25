<template>
    <header class="header">
      <div class="container">
        <nuxt-link to="/" class="logo">Nuxt Blog</nuxt-link>
        <nav>
          <nuxt-link to="/">Головна</nuxt-link>
          <nuxt-link to="/about">Про нас</nuxt-link>
          <nuxt-link to="/contact">Контакти</nuxt-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .header {
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    color: #fff;
    text-decoration: none;
  }
  
  nav a {
    margin-left: 1rem;
    color: #fff;
    text-decoration: none;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  