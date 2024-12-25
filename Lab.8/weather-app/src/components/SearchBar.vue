<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="city"
        @keyup.enter="search"
        placeholder="Введіть назву міста"
      />
      <button @click="search">Пошук</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    emits: ['search'],
    setup(props, { emit }) {
      const city = ref('')
  
      const search = () => {
        if (city.value.trim()) {
          emit('search', city.value.trim())
        }
      }
  
      return { city, search }
    }
  }
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }
  
  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  