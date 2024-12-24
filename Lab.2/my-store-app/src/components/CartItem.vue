<template>
  <div class="cart-item flex items-center py-2 border-b border-gray-300">
    <img :src="item.image" :alt="item.name" class="w-12 h-12 mr-4" />
    
    <div class="flex-1">
      <h3 class="text-lg font-medium">{{ item.name }}</h3>
      <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }} each</p>
      <p class="text-sm text-gray-600">Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>

    <div class="flex items-center">
      <button @click="decreaseQuantity(item)" class="px-3 py-1 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200">-</button>
      <span class="mx-3 text-lg font-bold">{{ item.quantity }}</span>
      <button @click="increaseQuantity(item)" class="px-3 py-1 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200">+</button>
      <button @click="removeItem(item.id)" class="ml-4 text-red-500 text-sm hover:underline">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const increaseQuantity = (item) => cartStore.addItem(item);
const decreaseQuantity = (item) => {
  item.quantity > 1 ? item.quantity -= 1 : cartStore.removeItem(item.id);
};
const removeItem = (productId) => cartStore.removeItem(productId);
</script>

<style scoped>
</style>
