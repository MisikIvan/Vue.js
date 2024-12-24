<template>
  <nav class="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
    <div class="flex items-center space-x-6">
      <router-link to="/" class="text-2xl font-bold hover:text-gray-300 transition-colors">
        {{ $t('navbar.home') }}
      </router-link>
      <router-link to="/products" class="hover:text-gray-300 transition-colors">
        {{ $t('navbar.products') }}
      </router-link>
      <router-link to="/cart" class="hover:text-gray-300 transition-colors">
        {{ $t('navbar.cart') }}
        <span class="ml-1 bg-red-500 rounded-full text-xs px-2 py-1">
          {{ cartStore.items.reduce((sum, item) => sum + item.quantity, 0) }}
        </span>
      </router-link>
    </div>
    
    <div class="flex items-center space-x-6">
      <router-link to="/login" class="hover:text-gray-300 transition-colors">
        {{ $t('navbar.login') }}
      </router-link>
      <LanguageSwitcher />
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();

useI18n(); 
</script>

<style scoped>
nav a {
  margin-right: 1rem;
}

nav a:hover {
  color: #e2e8f0;
}

nav .cart-item-count {
  background-color: #ef4444;
  border-radius: 9999px;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  color: white;
}
</style>
