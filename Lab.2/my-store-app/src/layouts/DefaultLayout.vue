<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto p-4">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
