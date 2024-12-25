<template>
    <header class="header">
      <h1>Weather App</h1>
      <ToggleTheme />
    </header>
  </template>
  
  <script>
  import ToggleTheme from './ToggleTheme.vue'
  
  export default {
    components: { ToggleTheme }
  }
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--header-bg);
    color: var(--header-text);
  }
  </style>
  