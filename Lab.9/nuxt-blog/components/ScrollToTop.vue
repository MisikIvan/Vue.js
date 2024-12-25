<template>
    <button v-show="visible" class="scroll-to-top" @click="scrollToTop">
      ↑ Вгору
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const visible = ref(false)
  
  const toggleVisibility = () => {
    visible.value = window.scrollY > 300
  }
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', toggleVisibility)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', toggleVisibility)
  })
  </script>
  
  <style scoped>
  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 0.75rem 1rem;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  
  .scroll-to-top:hover {
    opacity: 1;
  }
  </style>
  