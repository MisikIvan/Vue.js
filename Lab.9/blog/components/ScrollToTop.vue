<template>
  <button @click="scrollToTop" class="scroll-to-top">↑</button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}
</style>
