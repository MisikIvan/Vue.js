<template>
    <div class="pagination">
      <button :disabled="current === 1" @click="changePage(current - 1)">Попередня</button>
      <span>Сторінка {{ current }} з {{ total }}</span>
      <button :disabled="current === total" @click="changePage(current + 1)">Наступна</button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['change'])
  
  const changePage = (page) => {
    emit('change', page)
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007BFF;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  span {
    font-size: 1rem;
    color: #333;
  }
  </style>
  