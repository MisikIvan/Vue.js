<template>
    <button @click="toggleTheme">
      {{ isDark ? 'Светла тема' : 'Темна тема' }}
    </button>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    setup() {
      const isDark = ref(false)
  
      const toggleTheme = () => {
        isDark.value = !isDark.value
        document.body.classList.toggle('dark', isDark.value)
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      }
  
      onMounted(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
          isDark.value = true
          document.body.classList.add('dark')
        }
      })
  
      return { isDark, toggleTheme }
    }
  }
  </script>
  