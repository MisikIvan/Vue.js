<template>
  <div class="product-card bg-white shadow-lg rounded-xl p-6 flex flex-col items-center space-y-4 border-4 border-yellow-400">
    <div class="product-image-container mb-4">
      <img :src="product.image" :alt="product.name" class="product-image" />
    </div>

    <div class="product-info text-center">
      <h2 class="product-name text-2xl font-bold text-purple-800">{{ product.name }}</h2>
      <p class="product-description text-sm text-gray-600">{{ product.description }}</p>
      <p class="product-price text-xl text-green-600 font-semibold mt-3">${{ product.price.toFixed(2) }}</p>
    </div>

    <div class="product-actions space-x-4">
      <button @click="addToCart" class="add-to-cart-btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300">
        {{ $t('product.add_to_cart') }}
      </button>
      <router-link :to="`/products/${product.id}`" class="view-details text-lg text-indigo-700 hover:text-indigo-900 hover:underline">
        {{ $t('product.details') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

function addToCart() {
  cartStore.addItem(props.product);
}
</script>

<style scoped>
.product-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
}

.product-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-name {
  color: #6a4c93;
}

.product-price {
  color: #2e8b57;
}

.add-to-cart-btn {
  transition: background-color 0.3s ease-in-out;
}

.product-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.view-details {
  text-decoration: none;
  color: #5c6bc0;
  transition: color 0.3s ease;
}

.view-details:hover {
  color: #3f4b8b;
}

.product-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
