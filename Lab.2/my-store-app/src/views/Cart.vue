<template>
  <div class="cart-container">
    <h2 class="cart-title">{{ t('cart.title') }}</h2>
    <div v-if="cartStore.items.length" class="cart-items">
      <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      <div class="cart-total">
        <p>{{ t('cart.total') }}: ${{ cartStore.totalAmount.toFixed(2) }}</p>
        <button @click="$router.push('/checkout')" class="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
          {{ $t('cart.checkout') }}
        </button>
      </div>
    </div>
    <div class="empty" v-else>
      <p>{{ t('cart.empty') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';
import { useI18n } from 'vue-i18n';
import CartItem from '../components/CartItem.vue';

const cartStore = useCartStore();
const { t } = useI18n();
</script>

<style scoped>
.cart-container {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background-color: #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}

.cart-items {
  border-top: 1px solid #d1d5db;
  padding-top: 15px;
}

.cart-total {
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
  color: #333;
}

.checkout-button {
  padding: 12px 24px;
  background-color: #38b2ac;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #2c7a7b;
}

.empty {
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>
