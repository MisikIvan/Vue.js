<template>
  <div class="home bg-gray-50 py-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 my-8">{{ $t('home.title') }}</h1>
    <p class="text-center text-gray-500 mb-12">{{ $t('home.description') }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../stores/products';
import ProductCard from '../components/ProductCard.vue';


const productsStore = useProductsStore();
const products = productsStore.products;
</script>

<style scoped>
.home {
  background-color: #f7fafc;
  padding: 2rem;
}

h1 {
  color: #2d3748;
}

p {
  color: #718096;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid > * {
  transition: transform 0.3s ease-in-out;
}

.grid > *:hover {
  transform: scale(1.05);
}
</style>
