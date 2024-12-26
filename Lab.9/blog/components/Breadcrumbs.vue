<template>
    <div>
      <NuxtLink to="/">Головна</NuxtLink> > <span>{{ currentPage }}</span>
    </div>
  </template>
  
  <script setup>
  const currentPage = 'Стаття 1'; // Це може бути динамічно залежно від маршруту
  </script>
  